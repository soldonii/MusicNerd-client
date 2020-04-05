import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Main from '../layout/Main';
import ArtistCard from '../layout/ArtistCard';

const FavoriteArtists = ({ userId, artistList, requestData }) => {
  useEffect(() => {
    requestData(userId);
    // eslint-disable-next-line
  }, [userId]);

  console.log('artist List', artistList);

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
                  thumbnailUrl={url}
                  name={names[0]}
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


