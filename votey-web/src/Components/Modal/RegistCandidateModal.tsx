import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";
import React from "react";

interface Props {
  open: boolean;
  onChangeVoteItem(e: any): void;
  onClickGenerate(): void;
  onClose(): void;
  item: string;
  disable: boolean;
}

const RegistCandidateModal: React.FC<Props> = ({
  open,
  disable,
  onClose,
  onChangeVoteItem,
  onClickGenerate,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="modal"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">투표 아이템을 등록합니다</DialogTitle>
      <DialogContentContainer>
        <Input onChange={onChangeVoteItem} placeholder="투표 아이템을 입력하세요"></Input>
      </DialogContentContainer>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button
          color={disable ? "secondary" : "primary"}
          disabled={disable}
          onClick={() => {
            onClickGenerate();
            onClose();
          }}
          autoFocus
        >
          등록하기
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

export default RegistCandidateModal;
