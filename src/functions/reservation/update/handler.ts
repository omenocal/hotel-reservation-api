import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import Reservation from "../../../model/reservation";
import reservationService from '../../../service';

const updateReservation = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    const body:any = event.body;

    const item: Reservation = {
      reservationId: body.reservationId,
      roomId: body.roomId,
      clientId: body.clientId,
      startDate: body.startDate,
      endDate: body.endDate,
      createdAt: body.createdAt,
    };

    const result = await reservationService.updateReservation(item);

    console.log('result', result);

    return formatJSONResponse({ result });
  } catch (e) {
    const data = {
      status: 500,
      message: e,
    };

    return formatJSONResponse(data);
  }
};

export const main = middyfy(updateReservation);