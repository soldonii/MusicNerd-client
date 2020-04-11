import React from 'react';
import ReactLoading from 'react-loading';

const Loading = ({ color, style }) => (
  <ReactLoading
    type='cubes'
    color={color}
    style={style}
    height='10%'
    width='10%'
  />
);

Loading.defaultProps = {
  color: '#fff'
}

export default Loading;
