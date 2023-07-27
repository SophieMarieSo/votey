/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import styled from '@emotion/styled';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Chip from '@material-ui/core/Chip';
import IconButton from '../Components/IconButton';

import { colors } from '../modules/settings';
import VoteyContract from '../assets/abi/votey-abi.json';
import { alertState, votingState } from '../recoil/atom';
import RegistCandidateModal from '../Components/Modal/RegistCandidateModal';
import { addresses } from '../constant/addresses';
import InvalidVote from './InvalidVote';
import { Voting } from './VotingList';
import RadioButton from '../Components/RadioButton';
import CheckInviteCodeModal from '../Components/Modal/CheckInviteCodeModal';
import AlertModal from '../Components/Modal/AlertModal';

const DUPLICATE_ERROR_MESSAGE = 'You are already vote!!';
const WRONG_INVITE_CODE_MESSAGE = 'Invite code is incorrect!!';
const REGISTER_VOTER_ERROR_MESSAGE = 'You are not voter';

// setCandidate & getCandidate
interface CandidateItemList {
  candidate_id: string;
  candidate_name: string;
  placeId: number;
  vote_count: number;
}

const BLANK_HASH =
  '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';

const VotingStatus = () => {
  const {
    connector,
    library,
    account,
    chainId,
    active,
    error,
    activate,
    deactivate,
  } = useWeb3React();
  const [selectedId, setSelectedId] = useState<string>('');
  const { placeId } = useParams();
  const trimedPlaceId = placeId?.replace(':', '');
  const setAlertAtomState = useSetRecoilState(alertState);
  const [candidateList, setCandidateList] = useState<CandidateItemList[]>([]);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isInviteCodeModalOpen, setInviteCodeModalOpen] =
    useState<boolean>(false);
  const [inviteCode, setInviteCode] = useState<string>('');
  const [itemText, setItemText] = useState<string>('');
  const [voteData, setVoteData] = useState<Voting>({} as Voting);
  const [highestCount, setHighestCount] = useState<number>(0);
  const navigate = useNavigate();

  const [isSelected, setSelected] = useState<boolean>(false);
  const [isSameCount, setSameCount] = useState<number>(0);

  const [alertTitle, setAlertTitle] = useState<string>('');
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [isAlertModalOpen, setAlertModalOpen] = useState<boolean>(false);

  const loadVote = async () => {
    const provider = new ethers.providers.Web3Provider(library.provider);
    const signer = provider.getSigner();
    const voteyContract = new ethers.Contract(
      addresses.votey,
      VoteyContract,
      signer
    );
    let data = await voteyContract.getVote(
      ethers.utils.hexValue(Number(trimedPlaceId))
    );

    setVoteData(data);
  };

  const onClickRadioButton = (newId: string) => {
    if (selectedId === newId) {
      setSelectedId('');
    } else {
      setSelectedId(newId);
    }
  };

  const onClickAlertModal = () => {
    setAlertModalOpen(!isAlertModalOpen);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onChangeVoteItem = (e: any) => {
    setItemText(e.target.value);
  };

  const onChangeInviteCode = (e: any) => {
    setInviteCode(e.target.value);
  };

  const onClickGenerate = async () => {
    const provider = new ethers.providers.Web3Provider(library.provider);
    const signer = provider.getSigner();
    const voteyContract = new ethers.Contract(
      addresses.votey,
      VoteyContract,
      signer
    );
    const estimateGas = await voteyContract.estimateGas.setCandidate(
      itemText,
      ethers.utils.hexValue(Number(trimedPlaceId))
    );

    let approveTx = await voteyContract.setCandidate(
      itemText,
      ethers.utils.hexValue(Number(trimedPlaceId))
    );

    // reset modal

    // loading false
  };

  const onClickEndVote = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(library.provider);
      const signer = provider.getSigner();
      const voteyContract = new ethers.Contract(
        addresses.votey,
        VoteyContract,
        signer
      );
      const estimateGas = await voteyContract.estimateGas.endVote(
        ethers.utils.hexValue(Number(trimedPlaceId))
      );

      let approveTx = await voteyContract.endVote(
        ethers.utils.hexValue(Number(trimedPlaceId))
      );

      navigate(`/list`);
    } catch (error: any) {
      alert('종료 할 수 없어요.');
    }
  };
  const onClickStartVote = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(library.provider);
      const signer = provider.getSigner();
      const voteyContract = new ethers.Contract(
        addresses.votey,
        VoteyContract,
        signer
      );
      const estimateGas = await voteyContract.estimateGas.startVote(
        ethers.utils.hexValue(Number(trimedPlaceId))
      );

      let approveTx = await voteyContract.startVote(
        ethers.utils.hexValue(Number(trimedPlaceId))
      );

    } catch (error: any) {
      alert('투표를 시작할 수 없어요.');
    }
  };
  const callVote = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(library.provider);
      const signer = provider.getSigner();
      const voteyContract = new ethers.Contract(
        addresses.votey,
        VoteyContract,
        signer
      );
      const estimateGas = await voteyContract.estimateGas.addVote(
        ethers.utils.hexValue(Number(trimedPlaceId)),
        selectedId,
        account,
        inviteCode
      );

      let approveTx = await voteyContract.addVote(
        ethers.utils.hexValue(Number(trimedPlaceId)),
        selectedId,
        account,
        inviteCode
      );

      setSelectedId('');
    } catch (error: any) {
      if (String(error.message).includes(DUPLICATE_ERROR_MESSAGE)) {
        setAlertTitle('중복 투표');
        setAlertMessage('이미 투표에 참여하셨어요.');
        setAlertModalOpen(true);
      } else if (String(error.message).includes(WRONG_INVITE_CODE_MESSAGE)) {
        setAlertTitle('초대코드 오류');
        setAlertMessage('잘못된 초대코드 입니다.');
        setAlertModalOpen(true);
      } else if (String(error.message).includes(REGISTER_VOTER_ERROR_MESSAGE)){
        setAlertTitle('등록되지 않은 유권자');
        setAlertMessage('해당 투표에 등록된 유권자가 아닙니다.');
        setAlertModalOpen(true);
      }
    }
  };

  const onClickVote = async () => {
    if (voteData.inviteCode !== BLANK_HASH) {
      setInviteCodeModalOpen(true);
    } else {
      await callVote();
    }
  };

  const getCandidates = async () => {
    const provider = new ethers.providers.Web3Provider(library.provider);
    const signer = provider.getSigner();
    const voteyContract = new ethers.Contract(
      addresses.votey,
      VoteyContract,
      signer
    );

    let data = await voteyContract.getCandidate(
      ethers.utils.hexValue(Number(trimedPlaceId))
    );

    setCandidateList(data);
  };

  const calcHighestItems = () => {
    var voteCount = 0;
    var max = 0;
    var isSameCount = 0;

    candidateList.forEach((candidate, index) => {
      if (candidateList.length === 1) {
        setHighestCount(Number(candidateList[index].vote_count));
      }

      // 후보자 리스트의 득표수가 모두 동일한 경우 highestCount로 지정되지 않기 위해 득표수가 동일한 경우를 count
      if ( Number(candidateList[0].vote_count) == candidateList[index].vote_count ) {
        setSameCount(++isSameCount);
      }

      if (index < candidateList.length - 1) {
        if (
          Number(candidate.vote_count) >
          Number(candidateList[index + 1].vote_count)
        ) {
          voteCount = Number(candidate.vote_count);
        } else {
          voteCount = Number(candidateList[index + 1].vote_count);
        }
      }
      max = Math.max(max, voteCount);
      setHighestCount(max);
    });
  };

  const renderCandidateLists = () => {
    return (
      <CandidateListContainer>
        {candidateList.map((item) => {
          return (
            <CandidateListItemContainer
              selected={
                !voteData.isStarted && highestCount === Number(item.vote_count) && isSameCount != candidateList.length
              }
              key={item.candidate_id}
            >
              {voteData.isStarted && (
                <RadioButton
                  isSelected={item.candidate_id === selectedId}
                  id={item.candidate_id}
                  onClick={() => onClickRadioButton(item.candidate_id)}
                />
              )}
              <Typography fontWeight='bold' fontSize={24}>
                {item.candidate_name}
              </Typography>
              {!voteData.isStarted && (
                <Typography fontWeight='bold' fontSize={24}>
                  {Number(item.vote_count)}표
                </Typography>
              )}
            </CandidateListItemContainer>
          );
        })}
      </CandidateListContainer>
    );
  };

  useEffect(() => {
    if (placeId) {
      loadVote();
      getCandidates();
    }
  }, [placeId]);

  useEffect(() => {
    if (!voteData.isStarted) {
      calcHighestItems();
    }
  }, [candidateList]);

  if (!voteData.maker) {
    return <CircularProgress />;
  }

  if (Number(voteData.maker) === 0) {
    return <InvalidVote />;
  }

  const onClick = () => {
    navigate(`/list`);
  };

  return (
    <>
      <Container>
        {!voteData.maker ? (
          <CircularProgress />
        ) : (
          <BodyContainer>
            <NameContainer>
              <Typography
                color={colors.voteyWhite}
                fontSize={40}
                fontWeight='bold'
              >
                {voteData.name}
              </Typography>
              <Chip
                color='secondary'
                target='_blank'
                component='a'
                href={`https://rinkeby.etherscan.io/address/${voteData.maker}`}
                clickable
                label={`발의자 : ${voteData.maker}`}
              ></Chip>
              <Chip
                color='primary'
                label={`설명 : ${voteData.description}`}
              ></Chip>
              <BackIconButton>
                <IconButton onClick={onClick} name='BackArrow' size={15} />
              </BackIconButton>
            </NameContainer>
            <ContentContainer>
              <ContentBodyContainer>
                {renderCandidateLists()}
              </ContentBodyContainer>
              <VotingButtonContainer>
                {voteData.maker !== account && voteData.isStarted && voteData.registered && (
                  <Button
                    fullWidth
                    variant='contained'
                    size='large'
                    color='primary'
                    title='투표하기'
                    onClick={onClickVote}
                  >
                    투표하기
                  </Button>
                )}
                {voteData.maker !== account && voteData.isStarted && !voteData.registered && (
                <Button
                  onClick={()=>console.log('click')}
                  variant='contained'
                  color='error'
                  size='large'
                  title='후보자 등록 중입니다'
                >
                  후보자 등록 중입니다
                </Button>
              )}
              </VotingButtonContainer>
            </ContentContainer>
          </BodyContainer>
        )}
        {voteData.isStarted && (
          <>
            <ButtonContainer>
              {voteData.maker === account && voteData.registered && (
                <Button
                  onClick={onClickEndVote}
                  variant='contained'
                  color='error'
                  size='large'
                  title='투표 종료'
                >
                  투표 종료
                </Button>
              )}
              {voteData.maker === account && !voteData.registered && (
                <Button
                  onClick={openModal}
                  variant='contained'
                  color='secondary'
                  size='large'
                  title='투표자 등록'
                  //disabled={isSelected}
                >
                  후보자 등록
                </Button>
              )}
              {voteData.maker === account && !voteData.registered && (
                <Button
                  onClick={onClickStartVote}
                  variant='contained'
                  color='success'
                  size='large'
                  title='투표 시작'
                  //disabled={isSelected}
                >
                  투표시작
                </Button>
              )}

            </ButtonContainer>
            <RegistCandidateModal
              open={isModalOpen}
              onClickGenerate={onClickGenerate}
              onClose={closeModal}
              onChangeVoteItem={onChangeVoteItem}
              item={itemText}
              disable={itemText === ''}
            />
            <CheckInviteCodeModal
              open={isInviteCodeModalOpen}
              onClickGenerate={callVote}
              onClose={() => setInviteCodeModalOpen(false)}
              onChangeInviteCode={onChangeInviteCode}
              disable={inviteCode === ''}
            />
            <AlertModal
              isModalOpen={isAlertModalOpen}
              onClickModal={onClickAlertModal}
              title={alertTitle}
              description={alertMessage}
            />
            <BackIconButton>
              <IconButton onClick={onClick} name='BackArrow' size={15} />
            </BackIconButton>
          </>
        )}
      </Container>
    </>
  );
};
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

const NameContainer = styled.div`
  padding: 20px;
  //background-color: transparent;
  // border-radius: 20px;
  // box-shadow: 5px 5px 15px 5px #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 80%;
  align-content: center;
  justify-content: center;
  gap: 10px;
  padding: 0px 40px;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 80%;
  padding: 10px;
  background-color: transparent;
  // border-radius: 20px;
  // box-shadow: 1px 3px 10px 0px #000000;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const ContentBodyContainer = styled.div`
  flex: 1;
  width: 100%;
`;

const VotingButtonContainer = styled.div`
  position: fixed;
  bottom: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  position: fixed;
  bottom: 30px;
`;

const CandidateListContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const CandidateListItemContainer = styled.div<{ selected: boolean }>`
  display: flex;
  color: white;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  margin: 3px;
  border-radius: 50px;
  background-color: #686868;
  color: ${(props) => (props.selected ? '#FFD400' : '#ffffff')};
  box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.2);
  transition-duration: 1s;
  width: 50%;
`;

const BackIconButton = styled.div`
  display: flex;
  position: fixed;
  right: 5px;
  bottom: 10px;
  cursor: pointer;
`;

export default VotingStatus;
