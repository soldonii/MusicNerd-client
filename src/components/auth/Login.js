import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Loading from '../layout/Loading';
import Form from '../layout/Form';
import FormInput from '../layout/FormInput';

import * as colors from '../../lib/colors';

const Login = ({
  error,
  loading,
  requestLogin
}) => {
  const [ user, setUser ] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const checkInputCondition = () => (email.includes('@')) && (password.length > 5);
  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  return (
    loading ?
      <Loading /> :
      <LoginWrapper>
        <Form title='Login' onSubmit={e => requestLogin(e, user)}>
          <FormInput
            type='email'
            name='email'
            placeholder='Email address'
            value={email}
            onChange={onChange}
            required
          />
          <FormInput
            type='password'
            name='password'
            placeholder='Password'
            minLength='6'
            value={password}
            onChange={onChange}
            required
          />
          <ErrorMessage>{error ? error : null}</ErrorMessage>
          <SubmitButton type='submit' value='Login' isActive={checkInputCondition()} />
        </Form>
      </LoginWrapper>
  );
};

const LoginWrapper = styled.section`
  width: 35vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const ErrorMessage = styled.p`
  margin: 2rem 0;
  font-size: 1.6rem;
  height: 3rem;
  width: 70%;
  text-align: center;
  color: red;
`;

const SubmitButton = styled.input`
  border: none;
  border-radius: 2rem;
  background-color: ${colors.HIGHLIGHT};
  color: ${colors.MAIN_TEXT_COLOR};
  font-size: 2rem;
  padding: 1rem 1.5rem;
  width: 50%;
  cursor: ${props => !props.isActive ? 'normal' : 'pointer'};
  opacity: ${props => !props.isActive ? 0.5 : 1};

  &:hover {
    box-shadow: ${props => !props.isActive ? 'none' : '0.3rem 0.3rem 0.3rem #52b7ff'};
    transition: all 0.3s;
  }
`;

Login.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  requestLogin: PropTypes.func.isRequired,
};

export default Login;
