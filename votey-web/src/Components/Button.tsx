import styled from '@emotion/styled';
import React from 'react';
import { colors } from '../modules/settings';

interface Props {
  onClick(): void;
  children: React.ReactElement;
}

const Button: React.FC<Props> = ({ onClick, children }) => {
  return <Container onClick={onClick}>{children}</Container>;
};

const Container = styled.div`
  border-radius: 20px;
  padding: 10px 40px;
  box-shadow: 1px 2px 3px ${colors.voteyBlack};
  background-color: ${colors.voteyBlue100};
  cursor: pointer;
`;

export default Button;
