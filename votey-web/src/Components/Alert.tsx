import * as React from "react";
import { useRecoilValue } from "recoil";
import { Alert, AlertTitle } from "@mui/material";

import { alertState } from "../recoil/atom";
import styled from "@emotion/styled";

const RecoilAlert = () => {
  const alertAtomState = useRecoilValue(alertState);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 2000);
  }, [alertAtomState]);

  return (
    <Container>
      {visible && (
        <Alert severity={alertAtomState.color}>
          <AlertTitle>{alertAtomState.title}</AlertTitle>
          {alertAtomState.description}
        </Alert>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  width: 300px;
  bottom: 20px;
  right: 20px;
  transition: 1s;
`;

export default RecoilAlert;
