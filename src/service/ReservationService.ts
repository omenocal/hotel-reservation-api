import { DocumentClient, Key } from "aws-sdk/clients/dynamodb";
import Reservation from "../model/Reservation";

export default class ReservationService {
  private tableName: string = process.env.RESERVATION_TABLE;

  constructor(private docClient: DocumentClient) { }

  async createReservation(reservation: Reservation): Promise<String> {
    const putParams: DocumentClient.PutItemInput = {
      TableName: this.tableName,
      Item: reservation,
    };

    console.log('putParams', putParams);

    await this.docClient.put(putParams).promise();

    return reservation.reservationId;
  }

  async getReservation(reservationId: Key): Promise<Reservation> {
    const getParams: DocumentClient.GetItemInput = {
      TableName: this.tableName,
      Key:{
        reservationId,
      },
    };

    console.log('getParams', getParams);

    const result = await this.docClient.get(getParams).promise();

    return result.Item as Reservation;
  }

  async getAllReservations(
    lastEvaluatedKey?: Key,
    previousResults?: Reservation[],
  ): Promise<Reservation[]> {
    const scanParams: DocumentClient.ScanInput = {
      TableName: this.tableName,
    };

    if (lastEvaluatedKey) {
      scanParams.ExclusiveStartKey = lastEvaluatedKey;
    }

    console.log('scanParams', scanParams);

    const data = await this.docClient.scan(scanParams).promise();

    const dataOutput = { ...data };
    delete dataOutput.Items;

    console.log('dataOutput', dataOutput);

    previousResults = previousResults || [];

    const currentResults = data.Items as Reservation[] || [];
    const totalResults = previousResults.concat(currentResults);

    if (data.LastEvaluatedKey) {
      return this.getAllReservations(data.LastEvaluatedKey, totalResults);
    }

    return totalResults;
  }

  async updateReservation(reservation: Reservation): Promise<String> {
    const itemKey: any = reservation.reservationId;
    const validAttributes = [
      "roomId",
      "startDate",
      "endDate",
    ];

    const updateParams: DocumentClient.UpdateItemInput = {
      TableName: this.tableName,
      Key: {
        reservationId: itemKey,
      },
      ExpressionAttributeNames: {},
      ExpressionAttributeValues: {},
    };

    const updateExpressionArray = [];

    validAttributes.forEach((x) => {
      if (reservation[x]) {
        updateExpressionArray.push(`#${x} = :${x}`);

        updateParams.ExpressionAttributeNames[`#${x}`] = x;
        updateParams.ExpressionAttributeValues[`:${x}`] = reservation[x];
      }
    });

    updateParams.UpdateExpression = `set ${updateExpressionArray.join(', ')}`;

    console.log('updateParams', updateParams);

    await this.docClient.update(updateParams).promise();

    return reservation.reservationId;
  }

  async deleteReservation(reservationId: Key): Promise<String> {
    const deleteParams: DocumentClient.DeleteItemInput = {
      TableName: this.tableName,
      Key: {
        reservationId,
      },
    };

    console.log('deleteParams', deleteParams);

    await this.docClient.delete(deleteParams).promise();

    return 'OK';
  }
}
