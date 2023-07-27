import React from "react";
import styled from "@emotion/styled";
import Text from "../Components/Text";

const ConnectWallet = () => {
  return (
    <Container>
      <MetamaskLogo src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/512px-MetaMask_Fox.svg.png?20201112074605" />
      <Text fontSize={30} fontWeight="bold" color="voteyWhite">
        Metamask 지갑을 연동해주세요
      </Text>
    </Container>
  );
};

const MetamaskLogo = styled.img`
  width: 256px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default ConnectWallet;
