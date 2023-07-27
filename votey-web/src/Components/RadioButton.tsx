import styled from "@emotion/styled";
import * as React from "react";

import { colors } from "../modules/settings";

interface Props {
  isSelected: boolean;
  id: string;
  onClick(id: string): void;
}

const RadioButton: React.FC<Props> = ({ isSelected, id, onClick }) => {
  return (
    <Container onClick={() => onClick(id)}>
      <Circle>{isSelected && <InnerCircle></InnerCircle>}</Circle>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const Circle = styled.div`
  border-radius: 60px;
  width: 40px;
  height: 40px;
  background-color: white;
`;

const InnerCircle = styled.div`
  border-radius: 60px;
  width: 30px;
  height: 30px;
  background-color: ${colors.voteyBlueMild100};
  position: relative;
  left: 5px;
  top: 5px;
`;

export default RadioButton;
