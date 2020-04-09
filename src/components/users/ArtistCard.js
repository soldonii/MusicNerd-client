import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ArtistCard = ({
  artistId,
  selectedArtists,
  thumbnailUrl,
  name,
  onSelect,
  onDeselect
}) => {
  const [ isSelected, setIsSelected ] = useState(false);

  const onClick = artistId => {
    if (artistId in selectedArtists) {
      setIsSelected(false);
      onDeselect(artistId);
    } else {
      if (Object.keys(selectedArtists).length === 10) {
        return window.alert('최대 10명까지만 선택할 수 있습니다.');
      }
      setIsSelected(true);
      onSelect(artistId);
    }
  };

  return (
    <CardWrapper
      data-id={artistId}
      onClick={e => onClick(e.currentTarget.dataset.id)}
      style={isSelected || artistId in selectedArtists ? selectedStyle : deselectedStyle}
    >
      <img src={thumbnailUrl} alt="thumbnail"/>
      <h1>{name.toUpperCase()}</h1>
    </CardWrapper>
  );
};

const selectedStyle = {
  backgroundColor: '#FBAB7E',
  backgroundImage: 'linear-gradient(0deg, #FBAB7E 0%, #F7CE68 100%)'
};

const deselectedStyle = {
  backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
};

const CardWrapper = styled.div`
  width: 17rem;
  height: 20rem;
  padding: 1rem;
  text-align: center;
  margin: 1.5rem auto;
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  cursor: pointer;

  & img {
    width: 15rem;
    height: 15rem;
  }

  & h1 {
    margin-top: 1rem;
  }
`;

ArtistCard.propTypes = {
  artistId: PropTypes.string.isRequired,
  selectedArtists: PropTypes.object.isRequired,
  thumbnailUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDeselect: PropTypes.func.isRequired
};

export default ArtistCard;
