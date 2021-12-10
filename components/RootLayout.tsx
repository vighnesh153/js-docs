/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

import React from 'react';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

import Navbar from 'components/Navbar';
import Resizable from 'components/Resizable';
import Explorer from 'components/Explorer';
import View from 'components/View';
import Modal, { ModalProvider } from 'components/Modal';

import { JsDocsAuthProvider } from 'contexts/AuthContext';
import { GlobalsContextProvider } from 'contexts/GlobalsContext';

const ContextProviders: React.FC = (props) => (
  <JsDocsAuthProvider>
    <GlobalsContextProvider>
      <ModalProvider>{props.children}</ModalProvider>
    </GlobalsContextProvider>
  </JsDocsAuthProvider>
);

const StyledMain = styled.main`
  display: flex;
  flex-direction: row;
  width: 100%;

  .viewer {
    flex: 1;
    min-width: 0;
  }
`;

const RootLayout: React.FC = (props) => {
  return (
    <ContextProviders>
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
              <View>{props.children}</View>
            </div>
          </StyledMain>
        </div>
      </div>
    </ContextProviders>
  );
};

export default RootLayout;
