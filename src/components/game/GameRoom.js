import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';
import styled from 'styled-components';

import DefaultLayout from '../layout/DefaultLayout';
import Header from '../layout/Header';
import Button from '../layout/Button';
import PlayerCard from './PlayerCard';
import TrackCard from './TrackCard';
import Chatting from './Chatting';

import history from '../../lib/history';
import wave from '../../assets/soundwave.gif';

import {
  leaveRoom,
  onReady,
  offReady,
  sendMessage,
  requestGameStart,
  requestNewTrack
} from '../../lib/socket';

let track;
let fadeTimeout, stopTimeout;

const GameRoom = ({
  userId,
  gameId,
  gameHost,
  players,
  readyStatus,
  chatMessages,
  isGameReady,
  currentTrack,
  score,
  playLog,
  loading,
  error,
  updatePlayLog
}) => {
  const [ isReady, setIsReady ] = useState(false);
  const [ message, setMessage ] = useState('');
  const [ hasScored, setHasScored ] = useState(false);
  const [ isTrackEnded, setIsTrackEnded ] = useState(false);

  useEffect(() => {
    if (isGameReady) {
      requestNewTrack();
    }
  }, [ isGameReady ]);

  useEffect(() => {
    if (currentTrack) {
      track = new Howl({
        src: [currentTrack.audio_url],
        volume: 0.7,
        onstop: () => console.log('music stopped')
      });

      track.play();

      fadeTimeout = setTimeout(() => {
        track.fade(0.7, 0, 1000 * 5);
      }, 1000 * 25);

      stopTimeout = setTimeout(() => {
        track.stop();
        updatePlayLog();
      }, 1000 * 30);
    }

    return () => {
      if (track) {
        track.stop();
        clearTimeout(fadeTimeout);
        clearTimeout(stopTimeout);
      }
    }
  }, [ currentTrack ]);

  useEffect(() => {
    let displayScorerTimeout;

    if (hasScored) {
      displayScorerTimeout = setTimeout(() => {
        setHasScored(false);
      }, 2000);
    }

    return () => clearTimeout(displayScorerTimeout);
  }, [ hasScored ]);

  useEffect(() => {
    let displayTrackInfoTimeout;

    if (isTrackEnded) {
      displayTrackInfoTimeout = setTimeout(() => {
        if (track) {
          track.stop();

          clearTimeout(fadeTimeout);
          clearTimeout(stopTimeout);
          fadeTimeout = null;
          stopTimeout = null;
        }

        if (isGameReady) {
          requestNewTrack();
        }

        setIsTrackEnded(false);
      }, 4000);
    }

    return () => clearTimeout(displayTrackInfoTimeout);
  }, [ isTrackEnded ]);

  useEffect(() => {
    const prevQuizScorer = playLog[playLog.length - 1];

    // 맞춘 player 표시해주기
    if (prevQuizScorer) {
      setHasScored(true);
    }

    setIsTrackEnded(true);

    // 현재 재생되던 음악 정보 보여주기(3초 동안)
    // if (currentTrack) {
    //   const {
    //     title,
    //     album_type: albumType,
    //     thumbnail: { url: thumbnailUrl },
    //     release_date: releaseDate,
    //     artist: { names: artistName }
    //   } = currentTrack;

    //   window.alert(`${artistName[0]}: ${title}. ${albumType}, ${thumbnailUrl}, ${releaseDate}`);
    // }

    // 재생되던 음악 멈춰주기
    // if (track) {
    //   track.stop();

    //   clearTimeout(fadeTimeout);
    //   clearTimeout(stopTimeout);
    //   fadeTimeout = null;
    //   stopTimeout = null;
    // }

    // if (isGameReady) {
    //   requestNewTrack();
    // }
  }, [ playLog ]);

  const onExitButtonClick = (userId, gameId) => {
    leaveRoom(userId, gameId);
    return history.push('/waiting');
  };

  const onReadyButtonClick = userId => {
    !isReady ? onReady(userId) : offReady(userId);
    setIsReady(!isReady);
  };

  const onStartButtonClick = () => {
    for (const player of players) {
      if (!readyStatus[player.userId]) {
        return window.alert('모든 유저가 READY하지 않았습니다!');
      }
    }

    requestGameStart(players);
  };

  const onSendButtonClick = (event, message) => {
    event.preventDefault();
    sendMessage(message);
    setMessage('');
  };

  return (
    <DefaultLayout>
      <GameWrapper>
        <Header>
          {players.map(player => (
            <PlayerCard
              key={player.userId}
              userId={player.userId}
              username={player.username}
              score={score[player.username] ? score[player.username] : 0}
              isReady={readyStatus[player.userId]}
              hasScored={hasScored}
            />
          ))}
        </Header>
        <GameMain>
          <MainLeft>
            <img src={wave} alt="wave"/>
            <TrackCard track={currentTrack} isTrackEnded={isTrackEnded} />
          </MainLeft>
          <MainRight>
            <ButtonContainer>
              {gameHost === userId &&
                <Button onClick={onStartButtonClick}>GAME START</Button>}
              {!isGameReady && <Button onClick={() => onReadyButtonClick(userId)}>READY</Button>}
              <Button onClick={() => onExitButtonClick(userId, gameId)}>EXIT</Button>
            </ButtonContainer>
            <Chatting
              message={message}
              setMessage={setMessage}
              onSendButtonClick={onSendButtonClick}
            >
              {chatMessages}
            </Chatting>
          </MainRight>
        </GameMain>
      </GameWrapper>
    </DefaultLayout>
  );
};

const GameWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 2vh 2vw;
`;

const GameMain = styled.div`
  height: 76vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainLeft = styled.div`
  height: 45rem;
  width: 55rem;
  margin: 0 1.5rem;
  background-color: lightgray;

  & img {
    height: 45rem;
    width: 55rem;
  }
`;

const MainRight = styled.div`
  height: 45rem;
  width: 55rem;
  margin: 0 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ButtonContainer = styled.div`
  width: 55rem;
  display: flex;
  justify-content: space-between;
`;

export default GameRoom;









// import React, { useState, useEffect } from 'react';
// import { Howl } from 'howler';
// import styled from 'styled-components';

// import DefaultLayout from '../layout/DefaultLayout';
// import Header from '../layout/Header';
// import Button from '../layout/Button';
// import PlayerCard from './PlayerCard';
// import Chatting from './Chatting';

// import history from '../../lib/history';
// import wave from '../../assets/soundwave.gif';

// import {
//   leaveRoom,
//   onReady,
//   offReady,
//   sendMessage,
//   requestGameStart,
//   requestNewTrack
// } from '../../lib/socket';

// let track;
// let fadeTimeout, stopTimeout;

// const GameRoom = ({
//   userId,
//   gameId,
//   gameHost,
//   players,
//   readyStatus,
//   chatMessages,
//   isGameReady,
//   currentTrack,
//   score,
//   playLog,
//   loading,
//   error,
//   updatePlayLog
// }) => {
//   const [ isReady, setIsReady ] = useState(false);
//   const [ message, setMessage ] = useState('');

//   useEffect(() => {
//     if (isGameReady) {
//       requestNewTrack();
//     }
//   }, [ isGameReady ]);

//   useEffect(() => {
//     if (currentTrack) {
//       track = new Howl({
//         src: [currentTrack.audio_url],
//         volume: 0.7,
//         onstop: () => console.log('music stopped')
//       });

//       track.play();

//       fadeTimeout = setTimeout(() => {
//         track.fade(0.7, 0, 1000 * 5);
//       }, 1000 * 25);

//       stopTimeout = setTimeout(() => {
//         track.stop();
//         updatePlayLog();
//       }, 1000 * 30);
//     }

//     return () => {
//       if (track) track.stop();
//     }
//   }, [ currentTrack ]);

//   useEffect(() => {
//     const prevQuizScorer = playLog[playLog.length - 1];

//     if (prevQuizScorer) {
//       window.alert(prevQuizScorer);
//     }

//     // 현재 재생되던 음악 정보 보여주기(3초 동안)
//     if (currentTrack) {
//       const {
//         title,
//         album_type: albumType,
//         thumbnail: { url: thumbnailUrl },
//         release_date: releaseDate,
//         artist: { names: artistName }
//       } = currentTrack;

//       window.alert(`${artistName[0]}: ${title}. ${albumType}, ${thumbnailUrl}, ${releaseDate}`);
//     }

//     // 재생되던 음악 멈춰주기
//     if (track) {
//       track.stop();

//       clearTimeout(fadeTimeout);
//       clearTimeout(stopTimeout);
//       fadeTimeout = null;
//       stopTimeout = null;
//     }

//     if (isGameReady) {
//       requestNewTrack();
//     }
//   }, [ playLog ]);

//   const onExitButtonClick = (userId, gameId) => {
//     leaveRoom(userId, gameId);
//     return history.push('/waiting');
//   };

//   const onReadyButtonClick = userId => {
//     !isReady ? onReady(userId) : offReady(userId);
//     setIsReady(!isReady);
//   };

//   const onStartButtonClick = () => {
//     for (const player of players) {
//       if (!readyStatus[player.userId]) {
//         window.alert('모든 유저가 READY하지 않았습니다!');
//       }
//     }

//     requestGameStart(players);
//   };

//   const onSendButtonClick = (event, message) => {
//     event.preventDefault();
//     sendMessage(message);
//     setMessage('');
//   };

//   return (
//     <DefaultLayout>
//       <GameWrapper>
//         <Header>
//           {players.map(player => (
//             <PlayerCard
//               key={player.userId}
//               imgSrc={player.thumbnail_url}
//               userId={player.userId}
//               username={player.username}
//               score={score[player.username] ? score[player.username] : 0}
//               isReady={readyStatus[player.userId]}
//               hasScored={playLog[playLog.length - 1] === player.username}
//             />
//           ))}
//         </Header>
//         <GameMain>
//           <MainLeft>
//             <img src={wave} alt="wave"/>
//           </MainLeft>
//           <MainRight>
//             <ButtonContainer>
//               {gameHost === userId &&
//                 <Button onClick={onStartButtonClick}>GAME START</Button>}
//               {!isGameReady && <Button onClick={() => onReadyButtonClick(userId)}>READY</Button>}
//               <Button onClick={() => onExitButtonClick(userId, gameId)}>EXIT</Button>
//             </ButtonContainer>
//             <Chatting
//               message={message}
//               setMessage={setMessage}
//               onSendButtonClick={onSendButtonClick}
//             >
//               {chatMessages}
//             </Chatting>
//           </MainRight>
//         </GameMain>
//       </GameWrapper>
//     </DefaultLayout>
//   );
// };

// const GameWrapper = styled.div`
//   height: 100%;
//   width: 100%;
//   background-color: rgba(0, 0, 0, 0.5);
//   padding: 2vh 2vw;
// `;

// const GameMain = styled.div`
//   height: 76vh;
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const MainLeft = styled.div`
//   height: 45rem;
//   width: 55rem;
//   margin: 0 1.5rem;
//   background-color: lightgray;

//   & img {
//     height: 45rem;
//     width: 55rem;
//   }
// `;

// const MainRight = styled.div`
//   height: 45rem;
//   width: 55rem;
//   margin: 0 1.5rem;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   align-items: center;
// `;

// const ButtonContainer = styled.div`
//   width: 55rem;
//   display: flex;
//   justify-content: space-between;
// `;

// export default GameRoom;
