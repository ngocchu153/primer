import Head from 'next/head';

import { useState } from 'react';
import { request } from 'utils';
import { ApiError } from 'next/dist/server/api-utils';

export default function Home() {
  const [value, setValue] = useState(2);
  const [result, setResult] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event: any) => setValue(event?.target?.value);
  const findHighestPrimer = async () => {
    setLoading(true);
    setError('');
    setResult(0);
    try {
      const { data } = (await request(
        `/api/v1/find-minimal?inputNumber=${value}`
      )) as models.ApiResponse<number>;
      setResult(data!);
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
        <h1 className="m-0 text-6xl text-center">Welcome to Primer!</h1>

        <p className="text-center text-xl my-4">
          Find the highest prime number lower than the input number below
        </p>

        <div className="flex flex-col items-center">
          <div className="">
            <input
              className="rounded border"
              type="number"
              value={value}
              onChange={handleChange}
              min="2"
              max="9007199254740991"
            />
            <button
              className="ml-4 rounded border px-2"
              disabled={loading}
              onClick={findHighestPrimer}
            >
              Find!
            </button>
          </div>
          {result > 0 && <div className='mt-2'>Result: {result}</div>}
          {error && <div className="text-red-500 mt-2">Error: {error}</div>}
        </div>
      </main>
    </div>
  );
}
