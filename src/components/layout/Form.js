import React from 'react';
import styled from 'styled-components';
import * as colors from '../../lib/colors';

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
  color: ${colors.FORM_TEXT_COLOR};
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & h1 {
    font-size: 4rem;
    margin-bottom: 4rem;
  }
`;

export default Form;
