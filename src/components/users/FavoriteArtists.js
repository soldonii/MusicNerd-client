import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import DefaultLayout from '../layout/DefaultLayout';
import ProgressBar from '../layout/ProgressBar';
import Loading from '../layout/Loading';
import ArtistCard from './ArtistCard';

const FavoriteArtists = ({
  userId,
  loading,
  artistList,
  selectedArtists,
  postResult,
  requestData,
  onSelect,
  onDeselect
}) => {
  const history = useHistory();

  useEffect(() => {
    if (postResult === 'success') {
      return history.push('/waiting');
    }
    requestData(userId);

    // eslint-disable-next-line
  }, [ userId, postResult ]);

  const selectedArtistLength = Object.keys(selectedArtists).length;
  const message = selectedArtistLength === 0 ?
    'Choose your favorite artists from 5 to 10.' :
    `${selectedArtistLength} Artists selected!`;

  return (
    <DefaultLayout>
      {
        loading ?
          <Loading /> :
          <ArtistWrapper>
            <h3>{message}</h3>
            <ProgressBar
              lengthLimit={10}
              currentLength={selectedArtistLength}
            />
            <ArtistList>
              {
                artistList.map(artist => {
                  const { thumbnail: { url }, names, _id: artistId } = artist;

                  return (
                    <ArtistCard
                      key={artistId}
                      artistId={artistId}
                      selectedArtists={selectedArtists}
                      thumbnailUrl={url}
                      name={names[0]}
                      onSelect={onSelect}
                      onDeselect={onDeselect}
                    />
                  );
                })
              }
            </ArtistList>
          </ArtistWrapper>
      }
    </DefaultLayout>
  );
};

const ArtistWrapper = styled.section`
  min-width: 80vw;
  min-height: 100vh;
  margin: 12vh 0 5vh 0;

  & h3 {
    font-size: 2rem;
    text-align: center;
  }
`;

const ArtistList = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 18rem);
`;

FavoriteArtists.propTypes = {
  userId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  artistList: PropTypes.array.isRequired,
  selectedArtists: PropTypes.object.isRequired,
  postResult: PropTypes.string.isRequired,
  requestData: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDeselect: PropTypes.func.isRequired,
};

export default FavoriteArtists;
