import React, { MouseEventHandler } from 'react';
import { CPageGoBackContainerStyled } from '@comm100/styledComponents/Page/CPageGoBackContainerStyled';
import { CButton } from '@comm100/framework/Components/CButton';
import { CIcon } from '@comm100/framework/Components/CIcon';

export type CGoBackProps = {
  text?: string;
  onClick: MouseEventHandler;
};

export const CGoBack = ({ text, onClick }: CGoBackProps) => (
  <CPageGoBackContainerStyled>
    <CButton
      variant='text'
      text={text || 'Back'}
      color='inherit'
      onClick={onClick}
      disableRipple
      startIcon={<CIcon name='goback' />}
      data-tag='backButton'
    />
  </CPageGoBackContainerStyled>
);

CGoBack.displayName = 'CGoBack';
