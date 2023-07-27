import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { colors } from "../../modules/settings";

interface Props {
  isModalOpen: boolean;
  onClickModal(): void;
  title: string;
  description: string;
}

const getModalStyle = () => {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: colors.voteyBlack,
      color: colors.voteyWhite,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

const AlertModal: React.FC<Props> = ({
  isModalOpen,
  onClickModal,
  title,
  description,
}) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title"> {title} </h2>
      <p id="simple-modal-description"> {description} </p>
    </div>
  );

  return (
    <div>
      <Modal
        open={isModalOpen}
        onClick={onClickModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default AlertModal;