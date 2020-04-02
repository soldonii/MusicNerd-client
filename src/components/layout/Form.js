import React from 'react';
import styled from 'styled-components';

const Form = ({ title, onSubmit, children }) => {
  return (
    <FormWrapper onSubmit={onSubmit}>
      <h1>{title}</h1>
      {children}
    </FormWrapper>
  );
};

const FormWrapper = styled.form`
  width: 40vw;
  height: 70vh;
  background-color: white;
  border: 0.2rem solid black;
  border-radius: 0.5rem;
  box-shadow: 0.2rem 0.2rem 0.5rem grey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  & h1 {
    font-size: 3rem;
  }
`;

export default Form;
