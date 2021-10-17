import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import styled from 'styled-components';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'styles/globals.scss';

import theme from 'util/theme';

import Navbar from 'components/Navbar';

import { JsDocsAuthProvider } from 'contexts/AuthContext';
import { GlobalsContextProvider } from 'contexts/GlobalsContext';

import Modal, { ModalProvider } from 'components/Modal';
import Resizable from 'components/Resizable';
import Explorer from 'components/Explorer';
import View from 'components/View';

const StyledMain = styled.main`
  display: flex;
  flex-direction: row;
  width: 100%;

  .viewer {
    flex: 1;
    min-width: 0;
  }
`;

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
        <JsDocsAuthProvider>
          <GlobalsContextProvider>
            <ModalProvider>
              <Modal />
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                theme={'colored'}
                draggable
                pauseOnHover
              />
              <div className="_app-body">
                <Navbar />
                <div className="main">
                  <StyledMain>
                    <Resizable direction={'horizontal'} initialWidthMultiplier={0.25}>
                      <Explorer />
                    </Resizable>
                    <div className="viewer">
                      <View />
                    </div>
                  </StyledMain>
                  <Component {...pageProps} />
                </div>
              </div>
            </ModalProvider>
          </GlobalsContextProvider>
        </JsDocsAuthProvider>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
