import React, { useEffect } from 'react';
import axios from 'axios';

const FavoriteArtists = ({ userId }) => {
  useEffect(() => {
    const fetchArtistList = async () => {
      const artistList = await axios.get(`http://localhost:8080/users/${userId}/favorites`);
      console.log(artistList);
    };

    fetchArtistList();
  }, []);

  return (
    <div>FavoriteArtists</div>
  );
};

export default FavoriteArtists;


