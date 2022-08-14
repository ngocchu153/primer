import request from 'utils/request';

describe('Request Utils', () => {
  const originalFetch = global.fetch;
  beforeAll(() => {
    global.fetch = jest.fn(() => Promise.resolve({} as Response));
  });
  afterAll(() => {
    jest.clearAllMocks();
    global.fetch = originalFetch;
  });

  test('Should return data when response is ok', async () => {
    const data = { data: 'ok request' };
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      status: 200,
      json: () => Promise.resolve(data),
    } as Response);

    const res = await request('fake_url');
    expect(res).toEqual(data);
  });

  test('Should throw error when response status code >= 400', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      status: 400,
      json: () => Promise.resolve({ message: 'Bad Request!' }),
    } as Response);

    await expect(request('fake_url')).rejects.toMatchObject({
      message: 'Bad Request!',
    });
  });

  test('Should reject when fetch network error', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockRejectedValueOnce(new Error('Network Error!'));

    expect(request('fake_url')).rejects.toMatchObject({
      networkError: 'Network Error!',
    });
  });
});
