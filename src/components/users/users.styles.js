import styled from 'styled-components';
import * as colors from '../../lib/colors';

export const FavoriteArtists = {
  Wrapper: styled.section`
    min-width: 80vw;
    min-height: 100vh;
    margin: 12vh 0 5vh 0;

    h3 {
      font-size: 2rem;
      text-align: center;
    }
  `,
  ArtistList: styled.div`
    display: grid;
    grid-template-columns: repeat(5, 20rem);
  `
};

export const ArtistCard = {
  Wrapper: styled.div`
    width: 17rem;
    height: 20rem;
    padding: 1rem;
    text-align: center;
    margin: 1.5rem auto;
    background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    cursor: pointer;

    img {
      width: 15rem;
      height: 15rem;
    }

    h1 {
      margin-top: 1rem;
    }
  `
};

export const Profile = {
  Wrapper: styled.section`
    width: 80vw;
    padding: 2rem;
    margin-top: 15vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    border: 0.2rem solid ${colors.MAIN_TEXT_COLOR};
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
  `,
  Favorites: styled.section`
    width: 80vw;
    min-height: 45vh;
    padding: 2rem;
    border: 0.2rem solid ${colors.MAIN_TEXT_COLOR};

    h2 {
      font-size: 3rem;
    }

    .card-wrapper {
      display: flex;
      flex-wrap: wrap;
    }
  `,
  Card: styled.div`
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
  `
};
