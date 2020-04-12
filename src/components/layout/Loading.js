import React from 'react';
import ReactLoading from 'react-loading';

const Loading = ({ color }) => (
  <ReactLoading
    type='cubes'
    color={color}
    height='10%'
    width='10%'
  />
);

Loading.defaultProps = {
  color: '#fff'
};

export default Loading;
