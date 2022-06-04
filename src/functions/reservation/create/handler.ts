import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { v4 } from "uuid";

import Reservation from "../../../model/reservation";
import reservationService from '../../../service'

const createReservation = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    const id = v4();
    const body:any = event.body;

    const item: Reservation = {
      reservationId: id,
      roomId: body.roomId,
      clientId: body.clientId,
      startDate: body.startDate,
      endDate: body.endDate,
      createdAt: new Date().toISOString(),
    };

    const result = await reservationService.createReservation(item);

    console.log('result', result);

    return formatJSONResponse({ id });
  } catch (e) {
    const data = {
      status: 500,
      message: e
    };

    return formatJSONResponse(data);
  }
};

export const main = middyfy(createReservation);