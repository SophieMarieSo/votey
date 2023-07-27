import styled from '@emotion/styled';
import React from 'react';
import { colors } from '../modules/settings';
import Text from './Text';

interface Props {
  isSelected: boolean;
  onClick(value: string): void;
  content: string;
  id: string;
}

interface ContainerProps {
  isSelected: boolean;
}

const CategoryButton: React.FC<Props> = ({
  isSelected,
  onClick,
  content,
  id,
}) => {
  return (
    <Container onClick={() => onClick(id)} isSelected={isSelected}>
      <Text
        fontSize={18}
        fontWeight='bold'
        color={isSelected ? 'voteyBlue100' : 'voteyWhite'}
      >
        {content}
      </Text>
    </Container>
  );
};

const Container = styled.div<ContainerProps>`
  border: 2px solid ${colors.voteyWhite};
  width: 200px;
  border-radius: 60px;
  background-color: ${(props) =>
    props.isSelected ? colors.voteyWhite : 'transparent'};
  padding: 0px 10px;
  transition: 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

export default CategoryButton;
