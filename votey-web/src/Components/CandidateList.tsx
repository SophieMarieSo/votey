import styled from "@emotion/styled";
import React from "react";
import { colors } from "../modules/settings";
import RadioButton from "./RadioButton";
import Text from "./Text";

interface Props {
  title: string;
  team: string;
  isSelected: boolean;
  onClickList(id: string): void;
}

const CandidateList: React.FC<Props> = ({ title, team, isSelected, onClickList }) => {
  return (
    <Container>
      <RadioButton isSelected={isSelected} id={title} onClick={onClickList}/>
      <TitleContainer>
        <Text fontSize={30} fontWeight="bold" color="voteyWhite">
          {title}
        </Text>
      </TitleContainer>
      <TeamContainer>
        <Text fontSize={20} fontWeight="regular" color="voteyWhite">
          {team}
        </Text>
      </TeamContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${colors.voteyGray};
  border-radius: 45px;
  display: flex;
  align-items: center;
  margin: 20px;
  padding: 0px 30px;
`;

const TitleContainer = styled.div``;

const TeamContainer = styled.div`
  padding-left: 20px;
  padding-top: 10px;
`;

export default CandidateList;
