import React, { Fragment } from 'react';
import styled from 'styled-components';

import Loading from './Loading';

const Modal = ({
  loading,
  shouldModalOpen,
  setShouldModalOpen,
  title,
  children
}) => {
  const modalStyle = shouldModalOpen ? { display: 'block' } : { display: 'none' };

  return (
    <Fragment>
      <ModalOverlay
        style={modalStyle}
        onClick={() => setShouldModalOpen(false)}
      />
      <ModalWindow style={modalStyle}>
        {
          loading ?
            <Loading color='black' /> :
            <Fragment>
              <ModalHeader>
                <h1>{title}</h1>
                <h3 onClick={() => setShouldModalOpen(false)}>X</h3>
              </ModalHeader>
              <ModalContent>
                {children}
              </ModalContent>
            </Fragment>
        }
      </ModalWindow>
    </Fragment>
  );
};

const ModalOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  height: 100vh;
  width: 100vw;
  z-index: 1;
`;

const ModalWindow = styled.div`
  padding: 1rem;
  position: absolute;
  background-color: white;
  color: black;
  text-align: center;
  z-index: 2
`;

const ModalHeader = styled.div`
  display: flex;
  & h3 {
    position: absolute;
    right: 1rem;
  }
`;

const ModalContent = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

export default Modal;
