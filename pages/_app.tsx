import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../src/componentes/Layout';
import { SnackbarProvider } from 'notistack';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <Head>
          <title>Peliculas</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SnackbarProvider>
    </>
  );
}

export default MyApp;
