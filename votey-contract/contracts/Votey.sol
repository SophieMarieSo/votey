pragma solidity >=0.4.22 <0.9.0;

/*
    1. 컨트랙트 실행 테스트
        generateVote -> setCandidate -> vote -> 리더 -> status 변경 -> 동규가 캇
    2. 실제 블록 데이터 뜯어봐서 실제로 데이터가 정확하게 들어갔는지 테스트 -> 동규가 캇 & 내가 한번 더 보고
    3. get 후보자들 함수 만들어주기 -> 동규가 만듬
    4. 클라이언트 연동 -> 종료

    5. 추가적 기능 논의 필요 -> 서로 생각해오기
    * 거버넌스 토큰
    * 컨트랙트를 세분화 해보기 (컨트랙트간 연동을 하는 구조를 만들어보기, 투표를 생성해주는 컨트랙트가 있다면?)
    동규짱굿
*/

contract Votey {
    /**
     *** 구조체 생성
     **/

    struct Vote {
        uint256 placeId; // 아이디
        uint256 time; // 시간
        bool isStarted; // 투표 시작,종료 여부
        string name; // 이름
        string description; // 투표 정보
        address maker; // 개설자
        string imageUrl; // 이미지 url
        Candidate[] candidates; // 후보자 배열
        uint256 candidateCount; // 후보자 수
        Voter[] voter; // 투표자 배열
        uint256 voterCount; // 투표된 횟수
        bytes32 inviteCode; // 초대코드 해시
    }

    struct Candidate {
        uint256 candidate_id; // 아이디
        string candidate_name; // 이름
        uint256 placeId;
        uint256 vote_count; // 투표 수
    }

    struct Voter {
        address voterAddress;
    }

    /**
     *** 변수 생성
     **/

    mapping(uint256 => Vote) public VoteStore;
    uint256 public voteCount = 0;

    uint256[] public voteIdStore;

    /**
     *** 함수 생성
     **/

    // 함수 오류 수정 - return 값 제거
    function generateVote(
        string memory name,
        string memory description,
        string memory imageUrl,
        bytes32 inviteCode
    ) public {
        Vote storage v = VoteStore[voteCount];
        v.placeId = voteCount;
        v.time = block.timestamp;
        v.isStarted = true;
        v.name = name;
        v.description = description;
        v.imageUrl = imageUrl;
        v.maker = msg.sender;
        v.candidateCount = 0;
        v.voterCount = 0;
        v.inviteCode = inviteCode;

        voteIdStore.push(voteCount); // 투표를 만들때 마다 투표 아이디를 저장하는 배열에 추가
        voteCount++;
        emit VoteGenerate(voteCount, block.timestamp, true);
    }

    function getVoteCount() public view returns (uint256) {
        return voteCount;
    }

    function getVote(uint256 _key) public view returns (Vote memory) {
        return VoteStore[_key];
    }

    function getVotes() public view returns (Vote[] memory) {
        Vote[] memory votes = new Vote[](voteCount);
        uint256 count = 0;
        for (uint256 i = 0; i < voteCount; i++) {
            votes[count] = VoteStore[i];
            count++;
        }
        return votes;
    }

    /** 진행중인 투표, 종료된 투표 구별하여 출력하는 함수 생성하기 **/

    // 1. 진행중인 투표들을 가져오는 함수 getRunningVote
    function getRunningVote() public view returns (Vote[] memory) {
        Vote[] memory votes = new Vote[](voteCount);
        uint256 count = 0;
        for (uint256 i = 0; i < voteCount; i++) {
            if (VoteStore[i].isStarted == true) {
                votes[count] = VoteStore[i];
                count++;
            }
        }
        return votes;
    }

    // 2. 종료된 투표들을 가져오는 함수 getClosedVote
    function getClosedVote() public view returns (Vote[] memory) {
        Vote[] memory votes = new Vote[](voteCount);
        uint256 count = 0;
        for (uint256 i = 0; i < voteCount; i++) {
            if (VoteStore[i].isStarted == false) {
                votes[count] = VoteStore[i];
                count++;
            }
        }
        return votes;
    }

    // getAllVotesId
    function getAllVotesId() public view returns (uint256[] memory) {
        return voteIdStore;
    }

    // 후보자 생성 함수
    function setCandidate(string memory _name, uint256 _voteId) public {
        require(
            checkDuplicateCandidate(_name, _voteId),
            "The candidate is already Registered"
        );
        VoteStore[_voteId].candidates.push(
            Candidate(VoteStore[_voteId].candidateCount, _name, _voteId, 0)
        );
        VoteStore[_voteId].candidateCount++;

        emit Regestering_candidate(
            VoteStore[_voteId].candidateCount,
            _name,
            _voteId,
            0
        );
    }

    function getCandidateCount(uint256 _voteId) public view returns (uint256) {
        return VoteStore[_voteId].candidateCount;
    }

    function getCandidate(uint256 _voteId)
        public
        view
        returns (Candidate[] memory)
    {
        uint256 candidate_count = getCandidateCount(_voteId);
        Candidate[] memory candidates = new Candidate[](candidate_count);
        uint256 count = 0;
        for (uint256 i = 0; i < VoteStore[_voteId].candidateCount; i++) {
            candidates[count] = VoteStore[_voteId].candidates[count];
            count++;
        }

        return candidates;
    }

    function getVoter(uint256 _voteId) public view returns (Voter[] memory) {
        uint256 voter_count = VoteStore[_voteId].voterCount;
        Voter[] memory voters = new Voter[](voter_count);
        uint256 count = 0;
        for (uint256 i = 0; i < VoteStore[_voteId].voterCount; i++) {
            voters[count] = VoteStore[_voteId].voter[count];
            count++;
        }

        return voters;
    }

    // 후보자 중복 체크 - 오류수정하기
    function checkDuplicateCandidate(string memory _name, uint256 _placeId)
        private
        view
        returns (bool)
    {
        Candidate[] memory candidates = getCandidate(_placeId);
        for (uint256 i = 0; i < candidates.length; i++) {
            string memory Name = candidates[i].candidate_name;
            if (
                keccak256(abi.encodePacked((Name))) ==
                keccak256(abi.encodePacked((_name)))
            ) {
                return false;
            }
        }
        return true;
    }

    // 투표자 중복 체크 - 오류수정하기
    function checkDuplicateVoter(uint256 voteId, address voterAddress)
        private
        view
        returns (bool)
    {
        Voter[] memory voters = getVoter(voteId);
        for (uint256 i = 0; i < voters.length; i++) {
            address comparingVoterAddress = voters[i].voterAddress;
            if (comparingVoterAddress == voterAddress) {
                return false;
            }
        }
        return true;
    }

    function checkInviteCode(uint256 voteId, string memory inviteCodeInput)
        private
        view
        returns (bool)
    {
        uint256 len = bytes(inviteCodeInput).length;
        bytes32 compareHash = keccak256(abi.encodePacked((inviteCodeInput)));
        if (len > 8) {
            return false;
        }
        if (VoteStore[voteId].inviteCode != compareHash) {
            return false;
        }
        return true;
    }

    // 투표하기 함수 오류 수정
    function addVote(
        uint256 _voteId,
        uint256 _candidate_id,
        address voterAddress,
        string memory inviteCodeInput
    ) public {
        require(
            checkDuplicateVoter(_voteId, voterAddress),
            "You are already vote!!"
        );

        require(
            checkInviteCode(_voteId, inviteCodeInput),
            "Invite code is incorrect!!"
        );

        for (uint256 i = 0; i < VoteStore[_voteId].candidateCount; i++) {
            uint256 candidate_id = VoteStore[_voteId]
                .candidates[i]
                .candidate_id;

            if (_candidate_id == candidate_id) {
                VoteStore[_voteId].candidates[i].vote_count++;
                VoteStore[_voteId].voter.push(Voter(voterAddress));
                VoteStore[_voteId].voterCount++;
            }
        }

        emit Voted(_voteId, voterAddress);
    }

    function checkMaker(address maker) private view returns (bool) {
        if (maker == msg.sender) {
            return true;
        }
        return false;
    }

    // 투표 끝내기
    function endVote(uint256 _placeID) public {
        require(checkMaker(VoteStore[_placeID].maker), "you're not maker");
        VoteStore[_placeID].isStarted = false;
        emit EndVote(_placeID);
    }

    event Regestering_candidate(
        uint256 candidate_id,
        string name,
        uint256 place_id,
        uint256 total_vote
    );
    event EndVote(uint256 _placeID);
    event Voted(uint256 place_id, address voter_address);
    event VoteGenerate(uint256 voteCount, uint256 time, bool isStarted);
}
