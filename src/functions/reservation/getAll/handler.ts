import { APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import reservationService from '../../../service';

const getAllReservations = async (): Promise<APIGatewayProxyResult> => {
  try {
    const data = await reservationService.getAllReservations();

    console.log('data', data);

    return formatJSONResponse({ data });
  } catch (e) {
    console.log('e', e);

    const data = {
      status: 500,
      message: e,
    };

    return formatJSONResponse(data);
  }
};

export const main = middyfy(getAllReservations);
