import axios from 'axios';

const setTokenToHeader = () => {
  const token = localStorage.getItem('token');

  if (token) {
    return axios.defaults.headers.common['x-access-token'] = token;
  }

  delete axios.defaults.headers.common['x-access-token'];
};

export default setTokenToHeader;
