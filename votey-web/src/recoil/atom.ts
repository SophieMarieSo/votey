import { AlertColor } from "@mui/material";
import { atom } from "recoil";
import { Voting } from "../Views/VotingList";

interface IAlertState {
  color: AlertColor;
  title?: string;
  description?: string;
}

const alertState = atom<IAlertState>({
  key: "alertState",
  default: {
    color: "success",
    title: "",
    description: "",
  },
});

const votingState = atom<Voting[]>({
  key: "votings",
  default: [],
});

export { alertState, votingState };
