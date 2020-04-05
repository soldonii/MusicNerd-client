import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Main from '../layout/Main';
import ArtistCard from '../layout/ArtistCard';

const FavoriteArtists = ({
  userId,
  artistList,
  selectedArtists,
  requestData,
  onSelect,
  onDeselect
}) => {
  useEffect(() => {
    requestData(userId);
    // eslint-disable-next-line
  }, [userId]);

  return (
    <Main>
      <ArtistWrapper>
        <div>status bar</div>
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
`;

const ArtistList = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 18rem);
`;

export default FavoriteArtists;


