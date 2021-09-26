import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import 'styles/globals.css';

import theme from 'util/theme';

import Navbar from 'components/Navbar';

const App: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props;

  return (
    <React.Fragment>
      <Head>
        <title>Vighnesh's Docs | Notes</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        {/* PWA primary color */}
        <meta content={theme.palette.primary.main} name="theme-color" />
        <meta
          name="description"
          content="A simple notes and documentation storing site for my personal needs."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="_app-body">
          <Navbar />
          <div className="main">
            <Component {...pageProps} />
          </div>
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
