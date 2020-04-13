import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { setTokenToHeader } from '../../lib/auth';

import DefaultLayout from '../layout/DefaultLayout';

const Profile = ({
  userId,
  userProfile,
  requestData
}) => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    setTokenToHeader(token);
  }, []);

  useEffect(() => {
    requestData(userId);
  }, []);

  const {
    favoriteArtists,
    favoriteTracks,
    username,
    email,
    thumbnailUrl,
    playLog
  } = userProfile;

  let totalScore = 0;
  playLog.forEach(play => totalScore += play.scored);

  return (
    <DefaultLayout>
      <UserInfoWrapper>
        <img src={thumbnailUrl} alt='user thumbnail' />
        <div className='user-info'>
          <h1>username: {username}</h1>
          <h1>email: {email}</h1>
          <h3>Total Score: {totalScore} points</h3>
          <h3>Total Play: {playLog.length} games</h3>
        </div>
      </UserInfoWrapper>
      <Favorites>
        <h2>Favorite Artists</h2>
        <div className='card-wrapper'>
          {favoriteArtists.map(artist => {
            const { thumbnail: { url }, names, _id: artistId } = artist;
            return (
              <FavoritesCard key={artistId}>
                <img src={url} alt="thumbnail"/>
                <h1>{names[0].toUpperCase()}</h1>
              </FavoritesCard>)
          })}
        </div>
      </Favorites>
      <Favorites>
        <h2>Favorite Tracks</h2>
        <div className='card-wrapper'>
          {favoriteTracks.map(track => {
            const { thumbnail: { url }, title, _id: trackId, artist: { names } } = track;
            console.log(track);
            return (
              <FavoritesCard key={trackId}>
                <img src={url} alt="thumbnail"/>
                <h1>{title[0].toUpperCase()}</h1>
                <h1>{names[0].toUpperCase()}</h1>
              </FavoritesCard>)
          })}
        </div>
      </Favorites>
    </DefaultLayout>
  );
};

const UserInfoWrapper = styled.section`
  width: 80vw;
  padding: 2rem;
  margin-top: 15vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border: 0.2rem solid white;
  border-bottom: none;

  img {
    width: 10rem;
    height: auto;
    margin: 0 1rem;
  }

  .user-info {
    margin: 0 1rem;
    height: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: 1.2rem;
  }
`;

const Favorites = styled.section`
  width: 80vw;
  min-height: 45vh;
  padding: 2rem;
  border: 0.2rem solid white;

  h2 {
    font-size: 3rem;
  }

  .card-wrapper {
    display: flex;
    flex-wrap: wrap;
  }
`;

const FavoritesCard = styled.div`
  width: 17rem;
  min-height: 20rem;
  padding: 1rem;
  text-align: center;
  margin: 1.5rem auto;
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  img {
    width: 15rem;
    height: 15rem;
  }

  h1 {
    margin-top: 1rem;
  }
`;

Profile.propTypes = {
  userId: PropTypes.string.isRequired,
  userProfile: PropTypes.object.isRequired,
  requestData: PropTypes.func.isRequired
};

export default Profile;


// 프로필 페이지 : user 프로필 정보, 좋아요 누른 음악, 좋아요 눌렀던 가수 수정, playLog 보여주기.