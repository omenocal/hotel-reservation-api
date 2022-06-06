import { APIGatewayProxyEvent } from 'aws-lambda';

import { main } from '../../src/functions/reservation/getAll/handler';

const mockResponse = [
  {
    reservationId: '123',
    clientId: '123',
    roomId: '123',
    startDate: '2023-01-01',
    endDate: '2023-01-02',
  },
  {
    reservationId: '456',
    clientId: '456',
    roomId: '456',
    startDate: '2023-01-01',
    endDate: '2023-01-02',
  },
];

jest.mock('uuid');
jest.mock('aws-sdk', () => {
  return {
    DynamoDB: {
      DocumentClient:jest.fn(() => {
        return {
          scan: jest.fn(() => {
            return {
              promise: jest.fn(() => {
                return {
                  Items: mockResponse,
                };
              })
            };
          })
        };
      })
    }
  };
});

describe('Unit test for getAll handler', function () {
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
    expect(body.data).toEqual(mockResponse);
  });
});
