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
    const pathParams:any = event.pathParameters;

    const item: Reservation = {
      reservationId: pathParams.reservationId,
      roomId: body.roomId,
      clientId: body.clientId,
      startDate: body.startDate,
      endDate: body.endDate,
      createdAt: body.createdAt,
    };

    const reservationId = await reservationService.updateReservation(item);

    console.log('reservationId', reservationId);

    return formatJSONResponse({ reservationId });
  } catch (e) {
    const data = {
      status: 500,
      message: e,
    };

    return formatJSONResponse(data);
  }
};

export const main = middyfy(updateReservation);
