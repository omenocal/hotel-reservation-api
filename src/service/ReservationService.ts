import { DocumentClient } from "aws-sdk/clients/dynamodb";
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
}