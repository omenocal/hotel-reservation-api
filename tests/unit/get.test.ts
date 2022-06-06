import { APIGatewayProxyEvent } from 'aws-lambda';

import { main } from '../../src/functions/reservation/get/handler';

jest.mock('uuid');
jest.mock('aws-sdk', () => {
  return {
    DynamoDB: {
      DocumentClient:jest.fn(() => {
        return {
          get: jest.fn(() => {
            return {
              promise: jest.fn(() => {
                return {
                  Item: {
                    reservationId: '123',
                    clientId: '123',
                    roomId: '123',
                    startDate: '2023-01-01',
                    endDate: '2023-01-02',
                  },
                };
              })
            };
          })
        };
      })
    }
  };
});

describe('Unit test for get handler', function () {
  it('Adds reservation to database', async () => {
    const pathParameters = {
      reservationId: '123',
    };

    const event: APIGatewayProxyEvent = {
      headers: {},
      pathParameters,
    } as any;

    const result = await main(event);
    const body = JSON.parse(result.body);

    expect(result.statusCode).toEqual(200);
    expect(body.data).toEqual({
      reservationId: '123',
      clientId: '123',
      roomId: '123',
      startDate: '2023-01-01',
      endDate: '2023-01-02',
    });
  });
});
