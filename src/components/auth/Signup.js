import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';

import Form from '../layout/Form';
import FormInput from '../layout/FormInput';
import * as colors from '../../lib/colors';

const Signup = ({ error, onSignupSuccess, onSignupFail, clearError }) => {
  const history = useHistory();
  const [ user, setUser ] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });

  const { username, email, password, passwordConfirmation } = user;

  const checkInputCondition = () =>
    (username.length > 1) &&
    (email.includes('@')) &&
    (password.length > 5) &&
    (passwordConfirmation.length > 5);
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/signup', user);


      if (response.status === 200) {
        onSignupSuccess(response.data.token);
        history.push('/login');
      }
    } catch (err) {
      onSignupFail(err.response.data.errorMessage);
      window.setTimeout(() => clearError(), 2000);
    }
  };

  return (
    <SignupWrapper>
      <Form title='Sign Up' onSubmit={onSubmit}>
        <FormInput
          type='text'
          name='username'
          placeholder='Username'
          value={username}
          onChange={onChange}
          required
        />
        <FormInput
          type='email'
          name='email'
          placeholder='example@example.com'
          value={email}
          onChange={onChange}
          required
        />
        <FormInput
          type='password'
          name='password'
          placeholder='Password (over 6 characters)'
          minLength='6'
          value={password}
          onChange={onChange}
          required
        />
        <FormInput
          type='password'
          name='passwordConfirmation'
          placeholder='Confirm password'
          minLength='6'
          value={passwordConfirmation}
          onChange={onChange}
          required
        />
        <ErrorMessage>{error ? error : null}</ErrorMessage>
        <SubmitButton type='submit' value='Register' inactive={checkInputCondition()} />
      </Form>
    </SignupWrapper>
  );
};

const SignupWrapper = styled.section`
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

Signup.propTypes = {
  error: PropTypes.string,
  onSignupSuccess: PropTypes.func.isRequired,
  onSignupFail: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired
};

export default Signup;
