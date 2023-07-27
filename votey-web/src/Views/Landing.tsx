import styled from '@emotion/styled';
import React from 'react';
import Text from '../Components/Text';
import { colors } from '../modules/settings';

import ChainDark from '../assets/images/chain-dark.jpg';
import EtherDark from '../assets/images/ether-dark.jpg';
import Vote from '../assets/images/vote.jpg';
import useScrollFadeIn from '../Hooks/useScrollFadeIn';

// 랜딩 페이지, figma 상으로 가장 먼저 위치한 디자인 (앱 설명)

const Landing = () => {
  const firstCard = useScrollFadeIn();
  const secondCard = useScrollFadeIn();
  const thirdCard = useScrollFadeIn();

  return (
    <Container>
      <EnterAppButton
        onClick={() => {
          window.location.href = `https://app.${window.location.host}`;
        }}
      >
        <Text color='voteyBlue100' fontWeight='bold' fontSize={30}>
          Enter Votey
        </Text>
      </EnterAppButton>
      <Card image={ChainDark}>
        <FirstAnimationaWrapper style={firstCard.style} ref={firstCard.ref}>
          <Text color='voteyWhite' fontWeight='bold' fontSize={50}>
            블록체인 네트워크를 통해
            <br />
            조작되지 않는 투표기록을 투명하게 확인하세요
          </Text>
        </FirstAnimationaWrapper>
      </Card>
      <Card image={EtherDark}>
        <SecondAnimationaWrapper ref={secondCard.ref} style={secondCard.style}>
          <Text color='voteyWhite' fontWeight='bold' fontSize={50}>
            이더리움 네트워크를 통한 Dapp으로,
            {'\r\n'}
            서비스는 안정적이게 운영될 것입니다
          </Text>
        </SecondAnimationaWrapper>
      </Card>
      <Card image={Vote}>
        <ThirdAnimationaWrapper ref={thirdCard.ref} style={thirdCard.style}>
          <Text color='voteyWhite' fontWeight='bold' fontSize={50}>
            선거 관리 위원회, 여론조사 기관이 아닌,
            {'\r\n'}
            투명한 네트워크를 통해서
            {'\r\n'}
            민주적으로 투표하세요
          </Text>
        </ThirdAnimationaWrapper>
      </Card>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
  scroll-snap-type: y mandatory;
`;

const Card = styled.div<{ image?: string }>`
  width: 100vw;
  height: 100vh;
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  scroll-snap-align: center;
`;

const EnterAppButton = styled.div`
  border-radius: 30px;
  border: 3px solid ${colors.voteyBlue100};
  &:hover {
    border: 5px solid ${colors.voteyBlue100};
    transform: scale(1.1);
    transition: all 0.2s ease-in-out;
  }
  padding: 0px 20px;
  cursor: pointer;
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 100;
`;

const FirstAnimationaWrapper = styled.div`
  /* /* width: 100%; */
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SecondAnimationaWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ThirdAnimationaWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Landing;
