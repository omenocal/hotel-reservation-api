import axios from 'axios';

describe('Integration test for get handler', function () {
  it('Gets reservation from database', async () => {
    const url = 'https://vl1k51d212.execute-api.us-east-1.amazonaws.com/reservation/e4053518-bd63-403f-a2b6-dadfba913279';
    const result = await axios.get(url);

    expect(result.status).toEqual(200);
    expect(result.data.data).toEqual({
      reservationId: 'e4053518-bd63-403f-a2b6-dadfba913279',
      roomId: '123',
      clientId: '123',
      startDate: '2023-01-01',
      endDate: '2023-01-02',
      createdAt: '2022-06-06T01:28:56.694Z',
    });
  });
});
