import axios from 'axios';

describe('Integration test for delete handler', function () {
  it('Deletes reservation from database', async () => {
    const url = 'https://vl1k51d212.execute-api.us-east-1.amazonaws.com/reservation/test';
    const result = await axios.delete(url);

    expect(result.status).toEqual(200);
    expect(result.data.result).toEqual('OK');
  });
});
