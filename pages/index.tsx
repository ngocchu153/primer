import Head from 'next/head';

import styles from '@/pages/index.module.css';
import { useState } from 'react';
import { MinimalData } from './api/v1/find-minimal';

export default function Home() {
  const [value, setValue] = useState(2);
  const [result, setResult] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => setValue(event?.target?.value);
  const findHighestPrimer = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/v1/find-minimal?inputNumber=${value}`);
      const resJson = (await res.json()) as MinimalData;
      const { result } = resJson;
      setResult(result as number);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Primer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>Welcome to Primer!</h1>

        <p className={styles.description}>
          Find the highest prime number lower than the input number below
        </p>

        <div>
          <input
            type="number"
            value={value}
            onChange={handleChange}
            min="2"
            max="9007199254740991"
          />
          <button disabled={loading} onClick={findHighestPrimer}>
            Find!
          </button>
          {result > 0 && <div>Result: {result}</div>}
          {error && <div>Error: {error}</div>}
        </div>
      </main>
    </div>
  );
}
