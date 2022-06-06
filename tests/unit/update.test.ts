import { APIGatewayProxyEvent } from 'aws-lambda';
import * as uuid from 'uuid';

import { main } from '../../src/functions/reservation/update/handler';

jest.mock('uuid');
jest.mock('aws-sdk', () => {
  return {
    DynamoDB: {
      DocumentClient:jest.fn(() => {
        return {
          update: jest.fn(() => {
            return {
              promise: jest.fn(() => true),
            };
          }),
        };
      }),
    },
  };
});

describe('Unit test for update handler', function () {
  it('Adds reservation to database', async () => {
    const reservation = {
      clientId: '123',
      roomId: '123',
      startDate: '2023-01-01',
      endDate: '2023-01-02',
    };

    const pathParameters = {
      reservationId: '123',
    };

    const event: APIGatewayProxyEvent = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservation),
      pathParameters,
    } as any;

    const result = await main(event);
    const body = JSON.parse(result.body);

    expect(result.statusCode).toEqual(200);
    expect(body.reservationId).toEqual(pathParameters.reservationId);
  });
});
