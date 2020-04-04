import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';

import Form from '../layout/Form';
import FormInput from '../layout/FormInput';
import * as colors from '../../lib/colors';

const Login = ({ error, onLoginSuccess, onLoginFail, clearError }) => {
  const history = useHistory();
  const [ user, setUser ] = useState({
    email: '',
    password: '',
  });

  const checkInputCondition = () => (email.includes('@')) && (password.length > 5);
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/login', user);
      if (response.status === 200) {
        onLoginSuccess(response.data.token, response.data.userId);
        history.push(`/users/${response.data.userId}/favorites`);
      }
    } catch(err) {
      onLoginFail(err.response.data.errorMessage);
      window.setTimeout(() => clearError(), 2000);
    }
  };

  const { email, password } = user;

  return (
    <LoginWrapper>
      <Form title='Login' onSubmit={onSubmit}>
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
        <SubmitButton type='submit' value='Login' inactive={checkInputCondition()} />
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
  cursor: ${props => !props.inactive ? 'normal' : 'pointer'};
  opacity: ${props => !props.inactive ? 0.5 : 1};

  &:hover {
    box-shadow: ${props => !props.inactive ? 'none' : '0.3rem 0.3rem 0.3rem #52b7ff'};
    transition: all 0.3s;
  }
`;

Login.propTypes = {
  error: PropTypes.string,
  onLoginSuccess: PropTypes.func.isRequired,
  onLoginFail: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired
};

export default Login;
