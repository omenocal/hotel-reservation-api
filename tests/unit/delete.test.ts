import { APIGatewayProxyEvent } from 'aws-lambda';

import { main } from '../../src/functions/reservation/delete/handler';

jest.mock('uuid');
jest.mock('aws-sdk', () => {
  return {
    DynamoDB: {
      DocumentClient:jest.fn(() => {
        return {
          delete: jest.fn(() => {
            return {
              promise: jest.fn(() => true)
            };
          })
        };
      })
    }
  };
});

describe('Unit test for delete handler', function () {
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
    expect(body.result).toEqual('OK');
  });
});
