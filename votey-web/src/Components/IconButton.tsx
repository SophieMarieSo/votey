import React from 'react';
import styled from '@emotion/styled';

// image imports
import PersonCircle from '../assets/icons/person-circle.svg';
import BackArrow from '../assets/icons/back-arrow.svg';
import NavigateNext from '../assets/icons/navigate-next.svg';
import Enter from '../assets/icons/enter.svg';

interface Props {
  onClick(): void;
  name: string;
  size: number;
}

const IconButton: React.FC<Props> = ({ onClick, name, size }) => {
  const renderIcon = () => {
    switch (name) {
      case 'PersonCircle':
        return <Icon size={size} src={PersonCircle} />;
      case 'BackArrow':
        return <Icon size={size} src={BackArrow} />;
      case 'Enter':
        return <Icon size={size} src={Enter} />;
      case 'NavigateNext':
        return <Icon size={size} src={NavigateNext} />;
      default:
        return null;
    }
  };

  return <Container onClick={onClick}>{renderIcon()}</Container>;
};

const Container = styled.div``;

const Icon = styled.img<{ size: number }>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
`;

export default IconButton;
