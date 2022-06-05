import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import reservationService from '../../../service';

const getReservation = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    const params:any = event.pathParameters;

    const reservationId = params.reservationId;

    const data = await reservationService.getReservation(reservationId);

    console.log('data', data);

    return formatJSONResponse({ data });
  } catch (e) {
    console.log('e', e);

    const data = {
      status: 500,
      message: e
    };

    return formatJSONResponse(data);
  }
};

export const main = middyfy(getReservation);