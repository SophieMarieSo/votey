const Votey = artifacts.require("Votey");

//beforeEach와 afterEach함수는 test 전과 후에 호출되며
//async와 await 키워드로 node.js의 비동기 처리
//user0,user1...user9 10개까지 가능하며 접속한 블록체인 계정(지갑)주소입니다.
contract('Votey', function ([user0, user1, user2]) {
    let votey;

    //테스트 실행 단위 it 실행 전 
    beforeEach(async () => {
        console.log('');
        console.log('Before each');
        votey = await Votey.new('Big Start Votey');
    })

    //테스트 실행 단위 it 실행 후 
    afterEach(async () => {
        console.log('After each');
        console.log('Good bye');
    })

    // // 첫번째 it - 투표생성 테스트
    // it('Generate Vote Test', async () => {
    //     console.log('===========Generate Vote Test===========');
    //     // 투표 생성 로직
    //     await votey.generateVote("한동규", "캡스톤 투표1");
    //     let count = await votey.getVoteCount() - 1;
    //     let vote = await votey.getVote(count);

    //     await votey.generateVote("김대현", "캡스톤 투표2",);
    //     let count2 = await votey.getVoteCount() - 1;
    //     let vote2 = await votey.getVote(count2);
    //     let voteId = [];
    //     voteId = await votey.getAllVotesId();

    //     console.log(`vote count : ${count}`);
    //     console.log(`vote : ${vote}`);
    //     console.log(`vote count : ${count2}`);
    //     console.log(`vote : ${vote2}`);
    //     for (var i = 0; i < voteId.length; i++) {
    //         console.log(`voteId : ${voteId[i]}`);
    //     }
    // })

    // // 두번째 it - 후보자 생성 테스트
    // it('Candidate Create Test', async () => {
    //     console.log('===========Candidate Create Test===========');
    //     // 투표 생성 로직
    //     await votey.generateVote("한동규", "캡스톤 투표1");
    //     let vote_count = await votey.getVoteCount() - 1;
    //     let vote = await votey.getVote(vote_count);

    //     // 후보자 생성 로직
    //     await votey.setCandidate("안은진", vote_count);
    //     await votey.setCandidate("박서윤", vote_count);
    //     await votey.setCandidate("김대현", vote_count);
    //     await votey.setCandidate("한동규", vote_count);
    //     //await votey.setCandidate("한동규", vote_count);
    //     let candidate_count = await votey.getCandidateCount(vote_count);
    //     let candidates = [];
    //     candidates = await votey.getCandidate(vote_count);

    //     console.log(`vote count : ${vote_count}`);
    //     console.log(`vote : ${vote}`);
    //     console.log(`candidate count : ${candidate_count}`);
    //     for (var i = 0; i < candidates.length; i++) {
    //         console.log(`candidates : ${candidates[i]}`);
    //     }
    // })

    // 세번째 it - 투표 테스트
    it('Voting Test', async () => {
        console.log('===========Voting Test===========');
        // 투표 생성 로직
        await votey.generateVote("한동규", "캡스톤 투표1");
        let vote_count = await votey.getVoteCount() - 1;
        let vote = await votey.getVote(vote_count);

        // 후보자 생성 로직
        await votey.setCandidate("안은진", vote_count);
        await votey.setCandidate("박서윤", vote_count);
        await votey.setCandidate("김대현", vote_count);
        await votey.setCandidate("한동규", vote_count);

        let candidate_count = await votey.getCandidateCount(vote_count);
        let candidates = [];
        candidates = await votey.getCandidate(vote_count);

        // 투표 로직
        await votey.addVote(vote_count, "안은진", 01040560511);
        await votey.addVote(vote_count, "박서윤", 01040560512);
        await votey.addVote(vote_count, "박서윤", 01040560513);
        await votey.addVote(vote_count, "김대현", 01040560514);
        await votey.addVote(vote_count, "김대현", 01040560515);
        await votey.addVote(vote_count, "김대현", 01040560516);
        await votey.addVote(vote_count, "한동규", 01040560517);

        vote = await votey.getVote(vote_count);
        candidates = await votey.getCandidate(vote_count);

        console.log(`vote count : ${vote_count}`);
        console.log(`vote : ${vote}`);
        console.log(`candidate count : ${candidate_count}`);
        for (var i = 0; i < candidates.length; i++) {
            console.log(`candidates : ${candidates[i]}`);
        }
    })


    // // 네번째 it - 개표 테스트
    // it('Leader Test', async () => {
    //     console.log('===========Leader Test===========');
    //     // 투표 생성 로직
    //     await votey.generateVote("한동규", "캡스톤 투표1");
    //     let vote_count = await votey.getVoteCount();
    //     let vote = await votey.getVote(vote_count);

    //     // 후보자 생성 로직
    //     await votey.setCandidate("안은진", vote_count);
    //     await votey.setCandidate("박서윤", vote_count);
    //     await votey.setCandidate("김대현", vote_count);
    //     await votey.setCandidate("한동규", vote_count);

    //     let candidate_count = await votey.getCandidateCount(vote_count);
    //     let candidates = [];
    //     candidates = await votey.getCandidate(vote_count);

    //     // 투표 로직
    //     await votey.addVote(vote_count, "안은진", 01040560511);
    //     await votey.addVote(vote_count, "박서윤", 01040560512);
    //     await votey.addVote(vote_count, "박서윤", 01040560513);
    //     await votey.addVote(vote_count, "김대현", 01040560514);
    //     await votey.addVote(vote_count, "김대현", 01040560515);
    //     await votey.addVote(vote_count, "김대현", 01040560516);
    //     await votey.addVote(vote_count, "한동규", 01040560517);

    //     candidates = await votey.getCandidate(vote_count);

    //     // 개표 로직

    //     await votey.leader(vote_count);
    //     let leader = await votey.getLeader(vote_count);

    //     console.log(`vote count : ${vote_count}`);
    //     console.log(`vote : ${vote}`);
    //     console.log(`candidate count : ${candidate_count}`);
    //     for (var i = 0; i < candidates.length; i++) {
    //         console.log(`candidates : ${candidates[i]}`);
    //     }
    //     console.log(`leader : ${leader.lead_name} , voting count : ${leader.lead_votes}`);
    // })

    // // 다섯번째 it - 투표 종료 테스트
    // it('Vote Status Test', async () => {
    //     console.log('===========Vote Status Test===========');
    //     // 투표 생성 로직
    //     await votey.generateVote("한동규", "캡스톤 투표1");
    //     let count = await votey.getVoteCount();
    //     let vote = await votey.getVote(count);

    //     await votey.generateVote("김대현", "캡스톤 투표2");
    //     let count2 = await votey.getVoteCount();
    //     await votey.setVoteStatus(count2, false);
    //     let vote2 = await votey.getVote(count2);

    //     console.log(`vote count : ${count}`);
    //     console.log(`vote : ${vote}`);
    //     console.log(`vote count : ${count2}`);
    //     console.log(`vote : ${vote2}`);
    // })
});