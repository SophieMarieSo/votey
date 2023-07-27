# 이더리움 기반 Dapp(디앱) 개발
- 블록체인 기반으로 체결하는 계약 Smart Contract 

## How to Contract Test
### 이더리움 로컬 개발 플랫폼 Ganache 설치
- https://trufflesuite.com/ganache/ 에 접속하여서 Ganache를 설치합니다.
- QuickStart 클릭하여 기본값으로 생성합니다.

![퀵스타트](https://user-images.githubusercontent.com/55939155/163662176-392f1874-e2e5-4035-8ab3-29e25b2cc546.PNG)

### Truffle 설치
- 이더리움 Smart Contract를 만드는 개발언어인 Solidity를 컴파일하고 테스트할 수 있는 환경을 구축합니다.
- 설치가 되어있지 않을경우 node.js 플랫폼에서 npm install truffle 명령어를 통해 설치합니다.
- truffle version 명령어를 통해서 버전확인을 할수 있습니다.


### Ganache 와 Truffle 연동
- Truffle과 Ganache 연동을 위해 네트워크 설정을 맞춥니다.

![가나쉬정보](https://user-images.githubusercontent.com/55939155/163662416-5092da98-d8b3-45e3-b488-b5d0c6a1e645.PNG)
- Ganache 기본화면을 보면 다음과 같이 되어있습니다.

![가나쉬 설정](https://user-images.githubusercontent.com/55939155/163662453-d7b7c07d-f353-408c-8c11-a0d10b014cef.PNG)
- 다음과 같이 설정버튼을 누르고

![가나쉬 설정2](https://user-images.githubusercontent.com/55939155/163662463-3eff42be-1451-42d8-bb0f-70e3125bb926.PNG)
- 화면과 같이 설정한후 Restart 버튼을 눌러줍니다.

![가나쉬 설정3](https://user-images.githubusercontent.com/55939155/163662477-4734b956-899a-4bfa-b47f-af1d9d40b8d2.PNG)
- 다음과 같은 화면이 나오면 성공!

![truffle-config](https://user-images.githubusercontent.com/55939155/163662515-88edaba8-38b6-49ba-b43a-0a2ddc96fe34.PNG)
- Truffle 설정도 다음과 같이 해줍니다.

### Smart Contract 배포
- truffle migrate 명령어를 통해 배포 할 수 있습니다.
- cmd 창을 키고 폴더로 이동합니다.
- truffle migrate --reset 명령어를 통해서 컨트랙트를 배포합니다 (가나슈가 켜져있는 상태여야 함.)

![migrate 후](https://user-images.githubusercontent.com/55939155/163662621-b4b81789-4616-4404-987b-a56c7584be06.PNG)
- 성공하면 다음과 같이 트랜잭션이 날라가고 블록이 생성되는것을 확인 할 수 있습니다.


### Smart Contract 테스트
- truffle console --network development 명령어를 통해 사설 테스트넷에 접속하여 테스트를 실행합니다.

![console](https://user-images.githubusercontent.com/55939155/163662672-6425a8ee-116a-42c5-b850-7f490487c1f0.PNG)
- 다음과 같이 나오면 성공
- 이제 미리 작성해둔 votey_test.js 파일을 통해 테스트를 실행합니다.
- console 창에 truffle test test/votey_test.js 명령어를 입력합니다.
- 이제 contract를 컴파일하고 테스트를 실행하게 됩니다.

![test](https://user-images.githubusercontent.com/55939155/163662715-c7b47de5-b5ca-4a92-8040-16ca7278cca4.PNG)
- 테스트가 잘되는것을 확인하였습니다.

![ganache](https://user-images.githubusercontent.com/55939155/163662731-24f1fa36-862a-4a8d-b7cd-f730b833084e.PNG)
- 가나슈를 확인하게 되면 테스트하면서 생기는 트랜잭션과 블록을 확인할수 있습니다

![logs](https://user-images.githubusercontent.com/55939155/163662739-9d748cf5-4f32-4d34-9695-fba9a4af9dd1.PNG)
- 가나슈의 LOGS 탭에 들어가면 로그도 확인할 수 있습니다.
