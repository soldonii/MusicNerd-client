import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Main from '../layout/Main';
import ProgressBar from '../layout/ProgressBar';
import ArtistCard from '../layout/ArtistCard';
import Loading from '../layout/Loading';

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
    requestData(userId);
    if (postResult === 'success') {
      history.push('/games');
    }
    // eslint-disable-next-line
  }, [userId, postResult]);

  const selectedLength = Object.keys(selectedArtists).length;

  return (
    <Main>
      {
        loading ?
          <Loading /> :
          <ArtistWrapper>
            <h3>
              {selectedLength === 0 ?
                'Choose your favorite artists from 5 to 10.' :
                `${selectedLength} Artists selected!`}
            </h3>
            <ProgressBar
              lengthLimit='10'
              selectedLength={selectedLength}
            />
            <ArtistList>
              {
                artistList.map(artist => {
                  const { thumbnail: { url }, names, _id: artistId } = artist;

                  return (
                    <ArtistCard
                      key={artistId}
                      dataId={artistId}
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
    </Main>
  );
};

FavoriteArtists.propTypes = {
  userId: PropTypes.string.isRequired,
  requestData: PropTypes.func.isRequired
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

export default FavoriteArtists;


