import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import reservationService from '../../../service';

const deleteReservation = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    const params:any = event.pathParameters;

    const reservationId = params.reservationId;

    const result = await reservationService.deleteReservation(reservationId);

    console.log('result', result);

    return formatJSONResponse({ result });
  } catch (e) {
    console.log('e', e);

    const data = {
      status: 500,
      message: e,
    };

    return formatJSONResponse(data);
  }
};

export const main = middyfy(deleteReservation);