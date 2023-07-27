/* eslint-disable react-hooks/exhaustive-deps */
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AWS from 'aws-sdk';
import Button from '@mui/material/Button';
import {v4 as uuid} from 'uuid';
import { BigNumber, BytesLike, ethers } from 'ethers';

import VoteyContract from '../assets/abi/votey-abi.json';
import CategoryButton from '../Components/CategoryButton';
import SquareCard from '../Components/SquareCard';
import GenerateVoteModal from '../Components/Modal/GenerateVoteModal';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import useWeb3Context from '../Hooks/useWeb3Context';
import { useWeb3React } from '@web3-react/core';
import { addresses } from '../constant/addresses';
import { Link, useNavigate, useNavigationType } from 'react-router-dom';
import { Action } from 'history';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { votingState } from '../recoil/atom';

export interface Voting {
  placeId: BigNumber;
  title: string;
  maker: string;
  name: string;
  imageUrl: string;
  description: string;
  isStarted: boolean;
  registered: boolean;
  inviteCode: string;
  register_voter: BytesLike;
}

const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;
const REGION = process.env.REACT_APP_REGION;

AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});
const doneVotings: Voting[] = [];

type CurrentSelectedCategoryType = 'inProgress' | 'Done';
const initialSelectedCategory: CurrentSelectedCategoryType = 'inProgress';

const VotingList = () => {
  const [currentSelectedCategory, setCurrentSelectedCategory] =
    useState<CurrentSelectedCategoryType>(initialSelectedCategory);
  const [generateModalVisible, setGenerateModalVisible] =
    useState<boolean>(false);
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
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [voteTitle, setVoteTitle] = useState<string>('');
  const [voteDescription, setVoteDescription] = useState<string>('');
  const [voteInviteCode, setVoteInviteCode] = useState('');
  const [register_voter,setRegister_voter] = useState([]);
  const [imageLoad, setImageLoad] = useState<boolean>(false);
  const [generateLoading, setGenerateLoading] = useState<boolean>(false);
  const [votes, setVotes] = useState<Voting[]>([]);

  const onClickCategory = (value: CurrentSelectedCategoryType) => {
    setCurrentSelectedCategory(value);
  };

  const openGenerateVoteModal = () => {
    setGenerateModalVisible(true);
  };

  const closeGenerateVoteModal = () => {
    setVoteTitle('');
    setVoteDescription('');
    setGenerateModalVisible(false);
  };

  const onClickUpload = (e: any) => {
    try {
      setImageLoad(true);
      setSelectedFile(e.target.files[0]);
      setImageLoad(false);
    } catch (error) {
      console.log('upload error', error);
    }
  };

  const onChangeVoteTitle = (e: any) => {
    setVoteTitle(e.target.value);
  };

  const onChangeVoteDescription = (e: any) => {
    setVoteDescription(e.target.value);
  };

  const onChangeRegVoter = (e:any) => {
    var regVoterList = e.target.value.split(',');
    setRegister_voter(regVoterList);
  };

  const loadVotes = async () => {
    const provider = new ethers.providers.Web3Provider(library.provider);
    const signer = provider.getSigner();
    const voteyContract = new ethers.Contract(
      addresses.votey,
      VoteyContract,
      signer
    );
    let data;
    const voteDatas = await voteyContract.getVotes();
    const filteredVoteDatas = voteDatas.filter((voteData: Voting) => {
      if (voteData.isStarted === (currentSelectedCategory === 'inProgress')) {
        return true;
      }
    });
    setVotes(filteredVoteDatas);
  };

  const onChangeInviteCode = (e: any) => {
    setVoteInviteCode(e.target.value);
  };

  const onClickGenerateVote = async () => {
    try {
      let imageUrl = 'https://votey.s3.ap-northeast-2.amazonaws.com/vote.jpg';
      if (selectedFile) {
        const formData = new FormData();
        const imageKey = uuid();
        formData.append('image/jpg', selectedFile);
        const params: PutObjectRequest = {
          ACL: 'public-read',
          Body: selectedFile,
          Bucket: S3_BUCKET ?? '',
          Key: `${imageKey}.jpg`,
          ContentType: 'image/jpg',
        };
        myBucket
          .putObject(params)
          .on('httpUploadProgress', (evt) => {
            setGenerateLoading(true);
          })
          .send((err) => {
            if (err) console.log(err);
          });
        setGenerateLoading(false);
        imageUrl = `https://votey.s3.ap-northeast-2.amazonaws.com/${imageKey}.jpg`;
      }

      const provider = new ethers.providers.Web3Provider(library.provider);
      const signer = provider.getSigner();
      const voteyContract = new ethers.Contract(
        addresses.votey,
        VoteyContract,
        signer
      );
      const estimateGas = await voteyContract.estimateGas.generateVote(
        voteTitle,
        voteDescription,
        imageUrl,
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes(voteInviteCode)),
        register_voter
      );

      let approveTx = await voteyContract.generateVote(
        voteTitle,
        voteDescription,
        imageUrl,
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes(voteInviteCode)),
        register_voter
      );

      setSelectedFile(null);
      setVoteTitle('');
      setVoteDescription('');
      setVoteInviteCode('');
      setRegister_voter([]);
      loadVotes();

      // voteyContract
    } catch (error) {
      console.log('error!', error);
      alert('에러가 발생했어요.');
    }
  };

  const renderVotingLists = (): Array<React.ReactElement | null> => {
    return votes.map((item, index) => {
      return (
        <SquareCard
          onClick={() => {
            navigate(`/status:${Number(item.placeId._hex)}`, {
              state: {
                voting: item,
              },
            });
          }}
          backgroundImageSource={item.imageUrl}
          title={item.title}
          subTitle={item.name}
        />
      );
    });
  };

  useEffect(() => {
    loadVotes();
  }, [active, currentSelectedCategory]);

  return (
    <Container>
      <CategoriesContainer>
        <CategoryButton
          key={1}
          isSelected={currentSelectedCategory === 'inProgress'}
          onClick={onClickCategory}
          id='inProgress'
          content='진행중인 투표'
        />
        <CategoryButton
          key={2}
          isSelected={currentSelectedCategory === 'Done'}
          onClick={onClickCategory}
          id='Done'
          content='종료된 투표'
        />
      </CategoriesContainer>
      <VotingListContainer>{renderVotingLists()}</VotingListContainer>
      {currentSelectedCategory === 'inProgress' && (
        <Button
          onClick={openGenerateVoteModal}
          variant='contained'
          color='primary'
          size='large'
          endIcon={<AddBoxIcon fontSize='large' />}
        >
          투표 개설하기
        </Button>
      )}
      <GenerateVoteModal
        disable={imageLoad || voteTitle === '' || voteDescription === ''}
        onChangeVoteTitle={onChangeVoteTitle}
        onChangeVoteDescription={onChangeVoteDescription}
        onClickGenerate={onClickGenerateVote}
        onChangeInviteCode={onChangeInviteCode}
        onChangeRegVoter={onChangeRegVoter}
        uploadImage={onClickUpload}
        onClose={closeGenerateVoteModal}
        title='test modal'
        description='test description'
        open={generateModalVisible}
      />
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 1s;
`;

const CategoriesContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  gap: 20px;
  cursor: pointer;
`;

const VotingListContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 40px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  width: calc(100vw - 40px);
  padding-bottom: 3px;
  scroll-behavior: smooth;
`;

export default VotingList;
