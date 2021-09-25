import Head from 'next/head';

const HomePage = () => {
  return (
    <div>
      <Head>
        <title>Vighnesh's Docs | Notes</title>
        <meta
          name="description"
          content="A simple notes and documentation storing site for my personal needs."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>Main content</main>
    </div>
  );
};

export default HomePage;
