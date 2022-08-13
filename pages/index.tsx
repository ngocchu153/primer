import Head from 'next/head';
import { ChangeEvent, useState } from 'react';
import { request } from 'utils';
import { ApiError } from 'next/dist/server/api-utils';

export default function Home() {
  const [value, setValue] = useState<number>();
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value as unknown as number);

  const findHighestPrimer = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = (await request(
        `/api/v1/find?inputNumber=${value}`
      )) as models.ApiResponse<number>;
      setResult(`Highest prime number lower than ${value} is: ${data}`);
    } catch (e) {
      const err = e as ApiError;
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-0 py-2">
      <Head>
        <title>Primer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="m-0 text-center text-6xl">Welcome to Primer!</h1>

        <p className="my-4 text-center text-xl">
          {result ||
            'Find the highest prime number lower than the input number below'}
        </p>

        <div className="flex flex-col items-center">
          <div className="">
            <input
              className="rounded border px-1"
              placeholder="Your number"
              autoFocus
              type="number"
              value={value}
              onChange={handleChange}
              min="2"
              max="9007199254740991"
              step="1"
            />
            <button
              className="ml-4 mb-2 rounded border px-2 disabled:cursor-not-allowed disabled:text-gray-300"
              disabled={loading || !value}
              onClick={findHighestPrimer}
            >
              Find!
          </button>
          </div>
          <div className={error ? 'text-red-500 text-xs' : 'text-xs invisible'}>Error: {error}</div>
        </div>
      </main>
    </div>
  );
}
