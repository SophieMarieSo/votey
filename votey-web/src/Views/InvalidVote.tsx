import styled from "@emotion/styled";
import { DoNotStep } from "@mui/icons-material";
import * as React from "react";

import Text from "../Components/Text";

const InvalidVote = () => {
  return (
    <Container>
      <StyledIcon color="error" />
      <Text fontSize={30} fontWeight="bold" color="voteyWhite">
        유효하지 않은 투표입니다.{" "}
      </Text>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  flex: 1;
`;

const StyledIcon = styled(DoNotStep)`
  width: 200px;
  height: 200px;
`;

const Illust = styled.img`
  width: 100px;
  height: 100%;
`;

export default InvalidVote;
