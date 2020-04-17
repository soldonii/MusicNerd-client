![logo](./src/assets/logo.png);

# MusicNerd

## 1. Introduction
**Music Nerd**는 게임에 참여한 player들의 선호 아티스트에 기반, 실시간으로 아티스트의 음원을 30초 간 재생하여 음원의 전주를 듣고 가수 이름과 노래 제목을 맞추는 게임입니다.
- 본 프로젝트의 아이디어는 한 예능 프로그램 코너에서 착안하였습니다.([링크](https://www.youtube.com/watch?v=b93AbJQseNk))

## 2. Preview
**배포 링크**
- 링크

![MusicNerd Preview] - gif 추가
**Youtube 링크**

## 3. Features
- Local 회원가입 및 로그인
- 선호가수 선택 기능
- 게임방 생성 및 입장
- 실시간 채팅
- 실시간 음원 재생
- player들의 채팅 메시지를 통한 정/오답 판별
- 선호 음원 좋아요 기능
- 유저 정보 및 플레이 기록, 선호 가수 및 선호 음원 기록 확인

## 4. Requirements
- 최신 Chrome Browser의 사용을 권장합니다.

## 5. Prerequisites
### Client
`.env` 파일을 생성하고 아래 코드를 입력한 후, root 디렉토리에 저장해야 합니다.

```
REACT_APP_SERVER_URI=http://localhost:8080
```

### Server
`.env` 파일을 생성하고 아래 `<>`에 환경변수를 입력한 후 root 디렉토리에 저장해야 합니다.

```
PORT=8080
MONGODB_URI=<mongoDB-connection-string>
JWT_SECRET_KEY=<jwt-secret-key>
AMAZON_S3_URI=https://musicnerd.s3.ap-northeast-2.amazonaws.com
```

## 6. Installation
### Client
```
git clone https://gitlab.com/soldonii/musicnerd_client.git
cd musicnerd_client

## 위에서 생성한 .env 파일을 root 디렉토리에 추가합니다.
npm install
npm start
```

### Server
```
git clone https://gitlab.com/soldonii/musicnerd_server.git
cd musicnerd_server

## 위에서 생성한 .env 파일을 root 디렉토리에 추가합니다.
npm install
npm start
```

## 7. Skills
### Client
- ES2015+
- React
- React Router
- Redux
- Redux Persist
- Socket.io
- Styled Component

### Server
- ES2015+
- Node.js
- Express
- MongoDB, Atlas
- Mongoose
- JSON Web Token
- Socket.io

### Tests
#### Client
- Jest, Enzyme을 이용하여 Component 및 Reducer Unit test를 작성했습니다.
- Cypress를 이용하여 End To End(E2E) Test를 작성했습니다.
![E2E Test]

#### Server
- Mocha, Chai

## 8. Project Control
- Version Control: Git, Gitlab
- Task Control: Trello

## 9. Deployment
### Client
- Netlify(?)

### Server
- Amazon Web Service(AWS) Elastic Beanstalk
- Circle CI를 이용한 빌드 자동화(?)

## 10. Challenges
부트캠프 기간 중에는 socket을 본격적으로 다뤄볼 기회가 없다가, 본 프로젝트의 핵심 기술 중 하나로 socket을 활용하다보니 무수한 시행착오를 겪게 되었습니다. 2주 간의 프로젝트 기간 동안 가장 큰 어려움이었던 socket 관련 여러 시행착오 및 극복 방안을 정리하였습니다.

### 1) 특정 Route에서 서버와 socket 연결하기
첫번째 시행착오는 정확한 타이밍, 즉 원하는 route로 이동했을 때 클라이언트와 서버의 socket을 연결하는 작업에서 발생했습니다. 최초에는 user 로그인 및 선호가수 선택 기능에서는 socket이 필요하지 않기 때문에, user가 게임방을 생성하여 해당 방으로 route가 이동될 때 서버 쪽의 socket을 활성화시킨 후 연결해야 한다고 생각했습니다.

그래서 서버에서의 socket 활성화 및 연결 로직을 게임방 생성과 관련된 express router에서 middleware처럼 다뤄야한다고 생각했으나, 원하는대로 연결이 이뤄지지 않았습니다. 많은 시행착오 끝에 서버에서는 application이 구동될 때 먼저 socket을 활성화시킨 후, user가 게임방에 입장한 후 client 쪽 socket에서 connection event를 보내주면, 서버에서는 해당 user를 socket의 room에 join시켜주어야 제가 원하는 방식으로 구현된다는 점을 깨닫게 되었습니다.

### 2) React에서 socket 다루기
socket의 연결 타이밍 뿐 아니라, socket을 통해 event를 emit하여 서버에 보내고, 서버에서 보낸 event를 받아 redux state를 변경하도록 초기 세팅을 하는데에 무척 어려움을 겪었습니다. 최초에는 게임방에 입장 시 rendering되는 Game Container에서 useEffect를 이용, 컴포넌트가 mount되기 전에 socket을 연결했습니다. 그러나 다른 유저가 새로운 방에 입장할 때마다 socket 연결을 계속하여, 여러 개의 socket이 추가로 연결되는 문제를 발견했습니다. 이를 해결하기 위해 최초 클라이언트 쪽에서는 로그인 후 대기실로 이동할 때 1회만 socket을 서버와 연결하고, 유저가 게임방에 입장할 때에는 socket 연결이 아닌, 해당 방의 gameId를 기반으로 socket room에 join하도록 수정해 socket이 여러차례 연결되는 문제를 해결할 수 있었습니다.

그 뿐 아니라, 서버와의 socket 연결은 대기실(`<WatingContainer>` 컴포넌트)에서 하지만 각종 이벤트를 주고 받는 행위는 게임방(`<GameRoom>` 컴포넌트) 내부에서 이뤄져야 했습니다. 동일한 state를 공유하는 컴포넌트가 아니라 `<WatingContainer>`에서 생성한 socket 인스턴스를 `<GameRoom>` 컴포넌트 내부에서 어떻게 사용할 수 있을지도 굉장히 난관이었습니다. 생성한 socket 인스턴스를 redux state에 보관하는 방법도 생각해보았으나, redux의 state는 '~~~'한 대상을 저장하기에 적합하지 않다는 점을 알게되어, 다른 방식을 찾아야 했습니다. 차선책으로 현재는 socket과 관련된 로직들을 담은 파일을 만든 후, 연결한 socket 인스턴스를 해당 파일 내에서 글로벌 변수로 선언하여, 각종 event를 주고 받을 때 항상 해당 socket을 가져온 후 emit/on하도록 하였습니다. 이 방식을 통해 다른 컴포넌트에서 선언된 socket 인스턴스를 또 다른 컴포넌트에서 활용할 수 있게 됐으나, 가장 이상적으로는 redux의 middleware로서 socket을 관리해야 한다는 것을 알게됐습니다. 해당 로직은 현재 프로젝트에는 적용되어 있지 않지만, 추후 현재 socket 관련 로직을 redux middleware로 옮기는 작업을 진행할 예정입니다.

### 3) 게임 내 다양한 user event 처리
멀티플레이가 가능하고, 꽤 많은 user event가 발생하는 게임은 처음인지라, 작은 규모의 게임에도 제가 예상한 것보다 훨씬 많은 user event가 존재한다는 것을 체감했습니다. user의 입/퇴장, ready 여부, 방장 확인, 실시간 채팅, 실시간 음원 전송, 실시간 정/오답 판별, 정답 시 user 점수 update, 음원 종료 시 재생되던 음원 정보 보여주기 등 최초 기획 시에는 생각하지 못했던 많은 이벤트들을 다뤄야 했습니다. 많은 이벤트들을 다루기 위해 최초에는 통합되어 있던 리듀서를 waiting reducer와 game reducer로 나눠 관리가 용이하도록 수정했으며, 최대한 이벤트들을 잘게 쪼개 서버 쪽에서 하나의 이벤트 당 최소한의 작업만 수행하여 최소한의 정보만 클라이언트에 보내도록 노력하였습니다. 하나의 이벤트당 관리할 redux state가 적어지다보니 조금이나마 event에 대한 state 관리가 수월해지는 것을 느꼈습니다.

## 11. Things to do
- client socket 로직 redux middleware로 적용
- React component 재사용성 높이기

