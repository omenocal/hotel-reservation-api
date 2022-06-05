import { DocumentClient, Key, UpdateItemInput } from "aws-sdk/clients/dynamodb";
import Reservation from "../model/Reservation";

export default class ReservationService {
  private tableName: string = "ReservationTable";

  constructor(private docClient: DocumentClient) { }

  async createReservation(reservation: Reservation): Promise<Reservation> {
    const putParams = {
      TableName: this.tableName,
      Item: reservation,
    };

    console.log('putParams', putParams);

    await this.docClient.put(putParams).promise();

    return reservation;
  }

  async getReservation(reservationId: Key): Promise<Reservation> {
    const getParams = {
      TableName: this.tableName,
      Key:{
        reservationId,
      },
    };

    console.log('getParams', getParams);

    const result = await this.docClient.get(getParams).promise();

    return result.Item as Reservation;
  }

  async updateReservation(reservation: Reservation): Promise<String> {
    const itemKey: any = reservation.reservationId;
    const validAttributes = [
      "roomId",
      "startDate",
      "endDate",
    ];

    const updateParams: UpdateItemInput = {
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
        updateExpressionArray.push(`set #${x} = :${x}`);

        updateParams.ExpressionAttributeNames[`#${x}`] = x;
        updateParams.ExpressionAttributeValues[`:${x}`] = reservation[x];
      }
    });

    updateParams.UpdateExpression = updateExpressionArray.join(', ');

    console.log('updateParams', updateParams);

    await this.docClient.update(updateParams).promise();

    return reservation.reservationId;
  }

  async deleteReservation(reservationId: Key): Promise<String> {
    const deleteParams = {
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
