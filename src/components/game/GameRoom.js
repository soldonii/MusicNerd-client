import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';
import styled from 'styled-components';

import DefaultLayout from '../layout/DefaultLayout';
import Header from '../layout/Header';
import PlayerCard from './PlayerCard';
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
  gameCreator,
  participants,
  readyStatus,
  chatMessages,
  score, // { username: 10 }
  isGameReady,
  // loading,
  // error,
  currentTrack,
  playLog,
  // recentScorer,
  resetGameState,
}) => {
  const [ isReady, setIsReady ] = useState(false);
  const [ message, setMessage ] = useState('');

  useEffect(() => {
    if (isGameReady) {
      requestNewTrack();
    }
  }, [ isGameReady ]);

  useEffect(() => {
    if (track) track.stop();
    const prevQuizScorer = playLog[playLog.length - 1];

    if (prevQuizScorer) {
      window.alert(prevQuizScorer);
    }

    if (currentTrack) {
      const { title, album_type: albumType, thumbnail: { url: thumbnail_url }, release_date: releaseDate, artist: { names: artistName } } = currentTrack;

      window.alert(`${artistName[0]}: ${title}. ${albumType}, ${thumbnail_url}, ${releaseDate}`);
    }

    if (isGameReady) {
      requestNewTrack();
    }
  }, [ playLog ]);

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
      }, 1000 * 30);

      clearTimeout(fadeTimeout);
      clearTimeout(stopTimeout);
      fadeTimeout = null;
      stopTimeout = null;
    }
  }, [ currentTrack ]);

  // useEffect(() => {
  //   setGotCorrectAnswer(true);
  // }, [ recentScorer ]);

  // useEffect(() => {
  //   gotCorrectAnswer && track.stop();
  //   window.alert(`${recentScorer} has scored!`);

  //   setGotCorrectAnswer(true);
  // }, [ gotCorrectAnswer ]);

  const onExitButtonClick = (userId, gameId) => {
    leaveRoom(userId, gameId);
    resetGameState();
    return history.push('/waiting');
  };

  const onReadyButtonClick = userId => {
    !isReady ? onReady(userId) : offReady(userId);
    setIsReady(!isReady);
  };

  const onStartButtonClick = () => {
    for (const participant of participants) {
      if (!readyStatus[participant.userId]) {
        window.alert('모든 유저가 READY하지 않았습니다!');
      }
    }

    requestGameStart(participants);
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
          {participants.map(player => (
            <PlayerCard
              key={player.userId}
              imgSrc={player.thumbnail_url}
              userId={player.userId}
              username={player.username}
              score={score[player.username] ? score[player.username] : 0}
              isReady={readyStatus[player.userId] ? true : false}
            />
          ))}
        </Header>
        <GameMain>
          <MainLeft>
            <img src={wave} alt="wave"/>
          </MainLeft>
          <MainRight>
            <ButtonContainer>
              <button onClick={() => onReadyButtonClick(userId)}>READY</button>
              {gameCreator === userId &&
                <button onClick={onStartButtonClick}>GAME START</button>}
              <button onClick={() => onExitButtonClick(userId, gameId)}>EXIT</button>
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
//   gameCreator,
//   participants,
//   readyStatus,
//   chatMessages,
//   score, // { username: 10 }
//   isGameReady,
//   // loading,
//   // error,
//   trackUrl,
//   // recentScorer,
//   resetGameState,
// }) => {
//   const [ isReady, setIsReady ] = useState(false);
//   const [ message, setMessage ] = useState('');

//   useEffect(() => {
//     requestNewTrack();
//   }, [ isGameReady ]);

//   useEffect(() => {
//     // console.log('trackUrl', trackUrl);
//     // console.log('track before', track);

//     // if (track) {
//     //   console.log('current track should be stopped', track)

//     //   track.stop();
//       // clearTimeout(fadeTimeout);
//       // clearTimeout(stopTimeout);
//     //   // window.alert(`${recentScorer} has scored!`);
//     //   track = null;
//     // }

//     if (trackUrl) {
//       track = new Howl({
//         src: [trackUrl],
//         volume: 0.7,
//         onstop: () => console.log('music stopped')
//       });

//       track.play();

//       fadeTimeout = setTimeout(() => {
//         track.fade(0.7, 0, 1000 * 5);
//       }, 1000 * 25);

//       stopTimeout = setTimeout(() => {
//         track.stop();
//       }, 1000 * 30);

//       clearTimeout(fadeTimeout);
//       clearTimeout(stopTimeout);

//       // 여기에 들어오는 것은 아무도 정답을 못 맞췄다는 의미
//       // 정답을 못 맞출 경우, 
//       // console.log('track after', track);
//     }
//   }, [ trackUrl ]);

//   // useEffect(() => {
//   //   setGotCorrectAnswer(true);
//   // }, [ recentScorer ]);

//   // useEffect(() => {
//   //   gotCorrectAnswer && track.stop();
//   //   window.alert(`${recentScorer} has scored!`);

//   //   setGotCorrectAnswer(true);
//   // }, [ gotCorrectAnswer ]);

//   const onExitButtonClick = (userId, gameId) => {
//     leaveRoom(userId, gameId);
//     resetGameState();
//     return history.push('/waiting');
//   };

//   const onReadyButtonClick = userId => {
//     !isReady ? onReady(userId) : offReady(userId);
//     setIsReady(!isReady);
//   };

//   const onStartButtonClick = () => {
//     for (const participant of participants) {
//       if (!readyStatus[participant.userId]) {
//         window.alert('모든 유저가 READY하지 않았습니다!');
//       }
//     }

//     requestGameStart(participants);
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
//           {participants.map(player => (
//             <PlayerCard
//               key={player.userId}
//               imgSrc={player.thumbnail_url}
//               userId={player.userId}
//               username={player.username}
//               score={score[player.username] ? score[player.username] : 0}
//               isReady={readyStatus[player.userId] ? true : false}
//             />
//           ))}
//         </Header>
//         <GameMain>
//           <MainLeft>
//             <img src={wave} alt="wave"/>
//           </MainLeft>
//           <MainRight>
//             <ButtonContainer>
//               <button onClick={() => onReadyButtonClick(userId)}>READY</button>
//               {gameCreator === userId &&
//                 <button onClick={onStartButtonClick}>GAME START</button>}
//               <button onClick={() => onExitButtonClick(userId, gameId)}>EXIT</button>
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