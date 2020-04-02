import React, { useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';

import Form from '../layout/Form';

const Signup = ({ error, onSuccess, onFail }) => {
  const history = useHistory();
  const [ user, setUser ] = useState({
    username: '',
    gender: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/signup', user);
      if (response.status === 200) {
        onSuccess(response.data.token);
        history.push('/login');
      }
    } catch(error) {
      onFail(error.response.data.errorMessage);
    }
  };

  const { username, email, password, passwordConfirmation } = user;

  return (
    <SignupWrapper>
      <Form title='회원가입' onSubmit={onSubmit}>
        <div>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            name='username'
            value={username}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor='gender'>Gender</label>
          <label htmlFor='male'>
            <input
              type='radio'
              name='gender'
              value='male'
              onChange={onChange}
              required
            />Male
          </label>
          <label htmlFor='female'>
            <input
              type='radio'
              name='gender'
              value='female'
              onChange={onChange}
              required
            />Female
          </label>
        </div>
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
        </div>
        <div>
          <label htmlFor='passwordConfirmation'>Confirm Password</label>
          <input
            type='password'
            name='passwordConfirmation'
            value={passwordConfirmation}
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
        {error && <h2>{error}</h2>}
        <input
          type='submit'
          value='회원가입'
        />
      </Form>
    </SignupWrapper>
  );
};

const SignupWrapper = styled.section`
  width: 30vw;
  height: 100vh;
  margin-left: 60vw;
  display: flex;
  align-items: center;
`;

Signup.propTypes = {
  error: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFail: PropTypes.func.isRequired
};

export default Signup;
