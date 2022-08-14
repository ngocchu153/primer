import Head from 'next/head';
import PrimeForm from '@/components/PrimeForm';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-0">
      <Head>
        <title>Primer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="m-0 mb-20 text-center text-5xl">Welcome to Primer!</h1>
        <PrimeForm />
      </main>
    </div>
  );
}
