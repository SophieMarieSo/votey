import styled from "@emotion/styled";
import * as React from "react";
import Text from "../Components/Text";

const Error = () => {
  return (
    <Container>
      <Text color="voteyBlack" fontSize={100} fontWeight="bold">
        지정되지 않은 경로입니다.
      </Text>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

export default Error;
