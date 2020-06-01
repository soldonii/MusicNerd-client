import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Loading from '../layout/Loading';
import Form from '../layout/Form';
import FormInput from '../layout/FormInput';

import * as SC from './auth.styles';

const Signup = ({
  error,
  loading,
  signUp
}) => {
  const dispatch = useDispatch();
  const [ user, setUser ] = useState({
    username: '',
    email: '',
    password: '',
    confirmationPassword: ''
  });

  const { username, email, password, confirmationPassword } = user;

  const checkInputCondition = () =>
    (username.length > 1) &&
    (email.includes('@')) &&
    (password.length > 5) &&
    (confirmationPassword.length > 5);
  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = (e, user) => {
    e.preventDefault();
    dispatch(signUp(user));
  };

  return (
    loading ?
      <Loading /> :
      <SC.Auth.Wrapper>
        <Form title='Sign Up' onSubmit={e => onSubmit(e, user)}>
          <FormInput
            type='text'
            name='username'
            placeholder='Username (max 8 characters)'
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
            name='confirmationPassword'
            placeholder='Confirm password'
            minLength='6'
            value={confirmationPassword}
            onChange={onChange}
            required
          />
          <SC.Auth.ErrorMessage>{error ? error : null}</SC.Auth.ErrorMessage>
          <SC.Auth.SubmitButton type='submit' value='Register' isActive={checkInputCondition()} />
        </Form>
      </SC.Auth.Wrapper>
  );
};

Signup.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  signUp: PropTypes.func.isRequired
};

export default Signup;
