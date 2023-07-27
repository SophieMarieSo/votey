import styled from "@emotion/styled";
import * as React from "react";
import { colorType, colors } from "../modules/settings";

interface Props {
  fontSize: number;
  fontWeight: "bold" | "regular" | "light";
  color: colorType;
  children: any;
}

const Text: React.FC<Props> = ({ fontSize, fontWeight, color, children }) => {
  return (
    <Phrase fontSize={fontSize} color={color} fontWeight={fontWeight}>
      {children}
    </Phrase>
  );
};

const Phrase = styled.p<Props>`
  font-size: ${(props) => props.fontSize}px;
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => colors[props.color]};
`;

export default Text;
