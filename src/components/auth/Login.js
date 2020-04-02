import React, { useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';

import Form from '../layout/Form';

const Login = ({ error, onLoginSuccess, onLoginFail }) => {
  const history = useHistory();
  const [ user, setUser ] = useState({
    email: '',
    password: '',
  });

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/login', user);
      if (response.status === 200) {
        onLoginSuccess(response.data.token, response.data.userId);
        history.push('/');
      }
    } catch(err) {
      onLoginFail(err.response.data.message);
    }
  };

  const { email, password } = user;

  return (
    <LoginWrapper>
      <Form title='로그인' onSubmit={onSubmit}>
        <div>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
            minLength='6'
          />
        {error && <h2>{error}</h2>}
        <input
          type='submit'
          value='로그인'
        />
        </div>
      </Form>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.section`
  width: 30vw;
  height: 100vh;
  margin-left: 60vw;
  display: flex;
  align-items: center;
`;

Login.propTypes = {

};

export default Login;
