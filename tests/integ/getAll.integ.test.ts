import axios from 'axios';

describe('Integration test for getAll handler', function () {
  it('Get all reservations to database', async () => {
    const url = 'https://vl1k51d212.execute-api.us-east-1.amazonaws.com/reservation/getAll';
    const result = await axios.get(url);

    expect(result.status).toEqual(200);
    expect(result.data.data).toEqual([
      {
         endDate: '2023-01-02',
         reservationId: 'ad2a234e-b782-40ef-acdc-71d4d8e85fab',
         startDate: '2023-01-01',
         createdAt: '2022-06-06T01:31:04.154Z',
         roomId: '456',
         clientId: '123',
      },
      {
         endDate: '2023-01-02',
         reservationId: 'e4053518-bd63-403f-a2b6-dadfba913279',
         startDate: '2023-01-01',
         createdAt: '2022-06-06T01:28:56.694Z',
         roomId: '123',
         clientId: '123',
      },
      {
         endDate: '456',
         reservationId: 'e6cdf232-854a-4404-81b4-27ad8ebc84ec',
         startDate: '456',
         createdAt: '2022-06-05T17:47:17.943Z',
         roomId: '456',
         clientId: '456',
      },
   ]);
  });
});
