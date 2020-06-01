import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import * as colors from '../../lib/colors';
import * as SC from './users.styles';

const ArtistCard = ({
  artistId,
  selectedArtists,
  thumbnailUrl,
  name,
  onSelect,
  onDeselect
}) => {
  const dispatch = useDispatch();
  const [ isSelected, setIsSelected ] = useState(false);

  const onClick = artistId => {
    if (artistId in selectedArtists) {
      setIsSelected(false);
      return dispatch(onDeselect(artistId));
    }

    if (Object.keys(selectedArtists).length === 10) {
      return window.alert('최대 10명까지만 선택할 수 있습니다.');
    }

    setIsSelected(true);
    dispatch(onSelect(artistId));
  };

  return (
    <SC.ArtistCard.Wrapper
      data-id={artistId}
      onClick={e => onClick(e.currentTarget.dataset.id)}
      style={isSelected || artistId in selectedArtists ? selectedStyle : deselectedStyle}
    >
      <img src={thumbnailUrl} alt="thumbnail"/>
      <h1>{name.toUpperCase()}</h1>
    </SC.ArtistCard.Wrapper>
  );
};

const selectedStyle = { backgroundImage: colors.SELECTED_CARD_COLOR };
const deselectedStyle = { backgroundImage: colors.DESELECTED_CARD_COLOR };

ArtistCard.propTypes = {
  artistId: PropTypes.string.isRequired,
  selectedArtists: PropTypes.object.isRequired,
  thumbnailUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDeselect: PropTypes.func.isRequired
};

export default ArtistCard;
