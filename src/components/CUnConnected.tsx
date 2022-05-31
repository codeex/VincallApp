import React, { MouseEventHandler } from 'react';
import { CButton } from '@comm100/framework/Components/CButton';
import { CUnConnectContainerStyled } from '../styledComponents/CUnConnectContainerStyled';
import unconnectedImg from '../images/unconnect.svg';

export type CUnConnectedProps = {
  onClick: MouseEventHandler;
};

export const CUnConnected = ({ onClick }: CUnConnectedProps) => (
  <CUnConnectContainerStyled>
    <img src={unconnectedImg} alt='unconnected' />
    No account connected.
    <CButton
      text='Connect with VinCall'
      variant='contained'
      onClick={onClick}
    ></CButton>
  </CUnConnectContainerStyled>
);

CUnConnected.displayName = 'CUnConnected';
