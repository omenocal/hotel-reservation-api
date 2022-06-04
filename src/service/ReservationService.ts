import { DocumentClient, Key } from "aws-sdk/clients/dynamodb";
import Reservation from "../model/Reservation";

export default class ReservationService {
  private Tablename: string = "ReservationTable";

  constructor(private docClient: DocumentClient) { }

  async createReservation(reservation: Reservation): Promise<Reservation> {
    const putParams = {
      TableName: this.Tablename,
      Item: reservation,
    };

    console.log('putParams', putParams);

    await this.docClient.put(putParams).promise();

    return reservation;
  }

  async getReservation(reservationId: Key): Promise<Reservation> {
    const getParams = {
      TableName: this.Tablename,
      Key: reservationId,
    };

    console.log('getParams', getParams);

    const result = await this.docClient.get(getParams).promise();

    return result.Item as Reservation;
  }
}