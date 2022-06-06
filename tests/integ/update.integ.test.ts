import axios from 'axios';

describe('Integration test for update handler', function () {
  it('Updates reservation', async () => {
    const url = 'https://vl1k51d212.execute-api.us-east-1.amazonaws.com/reservation/ad2a234e-b782-40ef-acdc-71d4d8e85fab';
    const result = await axios.patch(url, {
      roomId: '456',
      clientId: '456',
      startDate: '2023-01-01',
      endDate: '2023-01-02',
    });

    expect(result.status).toEqual(200);
    expect(result.data.reservationId).toBeDefined();
  });
});
