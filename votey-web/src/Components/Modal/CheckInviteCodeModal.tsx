import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";
import React from "react";

interface Props {
  open: boolean;
  disable: boolean;
  onClose(): void;
  onClickGenerate(): void;
  onChangeInviteCode(e: any): void;
}

const CheckInviteCodeModal: React.FC<Props> = ({
  open,
  disable,
  onClose,
  onClickGenerate,
  onChangeInviteCode,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="modal"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"초대 코드를 입력해야 투표를 할 수 있습니다."}
        <Typography fontSize={10} color="red">
          주의하세요! 초대코드를 분실하시면, 찾을 방법은 없습니다.
        </Typography>
      </DialogTitle>
      <DialogContentContainer>
        <Input
          onChange={onChangeInviteCode}
          placeholder="초대 코드를 입력해주세요"
        ></Input>
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
          투표하기
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

export default CheckInviteCodeModal;
