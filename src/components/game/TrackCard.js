import React from 'react';
import styled from 'styled-components';

import heart from '../../assets/heart.png';

const TrackCard = ({ track, isTrackEnded }) => {
  if (track) {
    const {
      title,
      thumbnail: { url: thumbnailUrl },
      release_date: releaseDate,
      artist: { names: artistName }
    } = track;

    return (
      <CardWrapper isTrackEnded={isTrackEnded}>
        <img src={heart} alt='heart' className='heart'/>
        <img src={thumbnailUrl} alt='thumbnail' className='coverimg'/>
        <h2>{title[0]}</h2>
        <p><span>{releaseDate} 발매</span><span>{artistName[0]}</span></p>
      </CardWrapper>
    );
  }

  return null;
};

const CardWrapper = styled.div`
  width: 25rem;
  height: 28rem;
  padding: 2rem;
  text-align: center;
  background: linear-gradient(186deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 45%, rgba(0,106,255,1) 100%);
  position: absolute;
  box-sizing: content-box;
  /* visibility: ${props => props.isTrackEnded ? 'visible' : 'hidden'} */
  display: ${props => props.isTrackEnded ? 'block' : 'none'};
  transform: ${props => props.isTrackEnded ? 'translate(0, -32rem)' : 'translate(0, 0)'};
  transition: all 1s ease-in-out;

  .heart {
    position: absolute;
    top: 1rem;
    right: 1rem;
    height: 2rem;
    width: 2rem;
    cursor: pointer;
  }

  .coverimg {
    height: 22rem;
    width: 22rem;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.3rem;
  }

  p {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    font-size: 1.2rem;
  }
`;

export default TrackCard;
