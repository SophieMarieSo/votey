import { css } from "@emotion/react";
import { colors } from "../modules/settings";

const globalStyle = css`
  body {
    margin: 0px;
  }
  #root {
    background-color: ${colors.voteyBlack};
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    overscroll-behavior: none;
    display: flex;
    flex-direction: column;
  }
`;

export default globalStyle;
