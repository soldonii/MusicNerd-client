import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Loading from '../layout/Loading';
import Form from '../layout/Form';
import FormInput from '../layout/FormInput';

import * as SC from './auth.styles';

const Login = ({
  error,
  loading,
  login
}) => {
  const dispatch = useDispatch();
  const [ user, setUser ] = useState({ email: '', password: '' });
  const { email, password } = user;

  const checkInputCondition = () => (email.includes('@')) && (password.length > 5);
  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    dispatch(login(user));
  };

  return (
    loading ?
      <Loading /> :
      <SC.Auth.Wrapper>
        <Form title='Login' onSubmit={e => onSubmit(e, user)}>
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
          <SC.Auth.ErrorMessage>{error ? error : null}</SC.Auth.ErrorMessage>
          <SC.Auth.SubmitButton type='submit' value='Login' isActive={checkInputCondition()} />
        </Form>
      </SC.Auth.Wrapper>
  );
};

Login.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
};

export default Login;
