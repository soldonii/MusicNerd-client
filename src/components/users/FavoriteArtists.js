import React from 'react';
import PropTypes from 'prop-types';

import DefaultLayout from '../layout/DefaultLayout';
import ProgressBar from '../layout/ProgressBar';
import Loading from '../layout/Loading';
import ArtistCard from './ArtistCard';

import * as SC from './users.styles';

const FavoriteArtists = ({
  loading,
  artistList,
  selectedArtists,
  onSelect,
  onDeselect
}) => {
  const selectedArtistLength = Object.keys(selectedArtists).length;
  const progressMessage = selectedArtistLength === 0 ?
    'Choose your favorite artists from 5 to 10.' :
    `${selectedArtistLength} Artists selected!`;

  return (
    <DefaultLayout>
      {loading ?
        <Loading /> :
        <SC.FavoriteArtists.Wrapper>
          <h3>{progressMessage}</h3>
          <ProgressBar
            lengthLimit={10}
            currentLength={selectedArtistLength}
          />
          <SC.FavoriteArtists.ArtistList id='artistList'>
            {artistList.map(artist => {
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
            })}
          </SC.FavoriteArtists.ArtistList>
        </SC.FavoriteArtists.Wrapper>}
    </DefaultLayout>
  );
};

FavoriteArtists.propTypes = {
  loading: PropTypes.bool.isRequired,
  artistList: PropTypes.array.isRequired,
  selectedArtists: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDeselect: PropTypes.func.isRequired,
};

export default FavoriteArtists;
