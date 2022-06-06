import { APIGatewayProxyEvent } from 'aws-lambda';
import * as uuid from 'uuid';

import { main } from '../../src/functions/reservation/create/handler';

jest.mock('uuid');
jest.mock('aws-sdk', () => {
  return {
    DynamoDB: {
      DocumentClient:jest.fn(() => {
        return {
          put: jest.fn(() => {
            return {
              promise: jest.fn(() => true),
            };
          }),
        };
      }),
    },
  };
});

describe('Unit test for create handler', function () {
  it('Adds reservation to database', async () => {
    const testId = 'testId';
    const uuidSpy = jest.spyOn(uuid, 'v4').mockReturnValue(testId);

    const reservation = {
      clientId: '123',
      roomId: '123',
      startDate: '2023-01-01',
      endDate: '2023-01-02',
    };

    const event: APIGatewayProxyEvent = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservation),
    } as any;

    const result = await main(event);
    const body = JSON.parse(result.body);

    expect(result.statusCode).toEqual(2000);
    expect(body.reservationId).toEqual('testId');
    expect(uuidSpy).toHaveBeenCalledTimes(1);
  });
});
