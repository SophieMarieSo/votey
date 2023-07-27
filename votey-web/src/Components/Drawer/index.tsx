import React from 'react';
import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import ListIcon from '@mui/icons-material/List';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { colors } from '../../modules/settings';
import {
  Button,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

import VoteyLogo from '../../assets/images/logo.png';
import { useSetRecoilState } from 'recoil';
import { alertState } from '../../recoil/atom';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../../modules/connector';
import { trim } from '../../modules/helpers';
import { useNavigate } from 'react-router-dom';

interface Props {
  active: boolean;
  account: string;
  connect(): void;
  disconnect(): void;
  walletInfo?: {
    address: string;
    ethBalance: string;
  };
}

const routeItems = [
  { name: 'List', iconComponent: <ListIcon />, link: '/list' },
];

const DrawerComponent: React.FC<Props> = ({
  active,
  account,
  connect,
  disconnect,
  walletInfo,
}) => {
  const routeLink = (link: string) => {
    window.location.href = `https://${window.location.host}${link}`;
  };
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Logo
          onClick={() => {
            navigate(`./list`);
          }}
        >
          votey
        </Logo>

        <ButtonWrapper>
          {active ? (
            <Test>
              <Button variant='text' size='large'>
                {trim(account ?? '', 10) ?? ''}
              </Button>
              <Button onClick={disconnect} variant='contained' size='large'>
                Disconnect
              </Button>
            </Test>
          ) : (
            <Button
              color='success'
              onClick={connect}
              variant='contained'
              size='large'
            >
              connect
            </Button>
          )}
        </ButtonWrapper>
      </Container>
      <Outlet></Outlet>
    </>
  );
};

const Test = styled.div``;

const Logo = styled.div`
  font-weight: 800;
  font-size: 55px;
  line-height: 60px;
  color: #538dff;
  cursor: pointer;
`;

const Container = styled.div`
  overscroll-behavior: none;
  display: flex;
  justify-content: space-between;
  padding: 20px 40px;
  background: color.votetBlack;
`;

const StylesListItemText = styled(ListItemText)`
  margin-left: 25px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-right: 20px;
`;

export default DrawerComponent;
