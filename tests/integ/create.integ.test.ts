import axios from 'axios';

describe('Integration test for create handler', function () {
  it.skip('Adds reservation to database', async () => {
    const result = await axios.post('https://vl1k51d212.execute-api.us-east-1.amazonaws.com/reservation', {
      roomId: '123',
      clientId: '123',
      startDate: '2023-01-01',
      endDate: '2023-01-02',
    });

    expect(result.status).toEqual(200);
    expect(result.data.reservationId).toBeDefined();
  });
});
