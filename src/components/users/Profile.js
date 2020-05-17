import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import DefaultLayout from '../layout/DefaultLayout';
import * as SC from './users.styles';

const Profile = ({
  userId,
  userProfile,
  requestData
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestData(userId));
    // eslint-disable-next-line
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
      <SC.Profile.Wrapper>
        <img src={thumbnailUrl} alt='user thumbnail' />
        <div className='user-info'>
          <h1>username: {username}</h1>
          <h1>email: {email}</h1>
          <h1>Total Score: {totalScore} points</h1>
          <h1>Total Play: {playLog.length} games</h1>
        </div>
      </SC.Profile.Wrapper>
      <SC.Profile.Favorites>
        <h2>Favorite Artists</h2>
        <div className='card-wrapper'>
          {favoriteArtists.map(artist => {
            const { thumbnail: { url }, names, _id: artistId } = artist;
            return (
              <SC.Profile.Card key={artistId}>
                <img src={url} alt="thumbnail"/>
                <h1>{names[0].toUpperCase()}</h1>
              </SC.Profile.Card>)
          })}
        </div>
      </SC.Profile.Favorites>
      <SC.Profile.Favorites>
        <h2>Favorite Tracks</h2>
        <div className='card-wrapper'>
          {favoriteTracks.map(track => {
            const { thumbnail: { url }, title, _id: trackId, artist: { names } } = track;
            return (
              <SC.Profile.Card key={trackId}>
                <img src={url} alt="thumbnail"/>
                <h1>{title[0].toUpperCase()}</h1>
                <h1>{names[0].toUpperCase()}</h1>
              </SC.Profile.Card>)
          })}
        </div>
      </SC.Profile.Favorites>
    </DefaultLayout>
  );
};

Profile.propTypes = {
  userId: PropTypes.string.isRequired,
  userProfile: PropTypes.object.isRequired,
  requestData: PropTypes.func.isRequired
};

export default Profile;
