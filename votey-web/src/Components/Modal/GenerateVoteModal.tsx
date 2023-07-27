import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '@mui/material/Input';
import { TextareaAutosize } from '@mui/material';
import React from 'react';

interface Props {
  open: boolean;
  onChangeVoteTitle(e: any): void;
  onChangeVoteDescription(e: any): void;
  onChangeInviteCode(e: any): void;
  onChangeRegVoter(e: any): void;
  onClickGenerate(): void;
  onClose(): void;
  uploadImage(file: any): void;
  title: string;
  description: string;
  disable: boolean;
}

const GenerateVoteModal: React.FC<Props> = ({
  open,
  disable,
  onClose,
  onChangeVoteTitle,
  onChangeVoteDescription,
  onChangeInviteCode,
  onChangeRegVoter,
  uploadImage,
  onClickGenerate,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className='modal'
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {'새로운 투표를 개설하시겠어요?'}
      </DialogTitle>
      <DialogContentContainer>
        <Input onChange={onChangeVoteTitle} placeholder='투표 제목'></Input>
        <Input
          onChange={onChangeVoteDescription}
          multiline
          placeholder='투표 설명'
        ></Input>
        <Input
          inputProps={{ maxLength: 8 }}
          onChange={onChangeInviteCode}
          placeholder='초대 코드 (선택)'
        ></Input>
        <Typography color='red' fontSize={12}>
          초대 코드를 통해서, 공유된 사람들만 투표 할 수 있어요. <br />
          코드가 없으면 누구나 투표할 수 있습니다.
        </Typography>
        <TextareaAutosize
          onChange={onChangeRegVoter}
          maxRows={10}
          aria-label="유권자 키등록"
          placeholder='Public Key'
          style={{width : 400}}
        />
        <Button variant='contained' component='label'>
          사진 업로드
          <input onChange={uploadImage} accept='image/*' type='file' hidden />
        </Button>
      </DialogContentContainer>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button
          color={disable ? 'secondary' : 'primary'}
          disabled={disable}
          onClick={() => {
            onClickGenerate();
            onClose();
          }}
          autoFocus
        >
          개설하기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const DialogContentContainer = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  gap: 50px;
`;

export default GenerateVoteModal;
