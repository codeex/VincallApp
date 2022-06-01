import React, { MouseEvent } from 'react';
import { APPClient } from '@comm100/app-client';
import { CFormContent } from '../../components/integration/form/CFormContent';
import { CIntegrationForm } from '../../components/integration/form/CIntegrationForm';
import { CPage } from '../../components/CPage';
import { CUnConnected } from '../../components/CUnConnected';

export const SettingsPage = () => {
  const client = APPClient.init();
  const clickGoBackHandle = (event: MouseEvent) => {
    client.do('navigation.goto', '..');
  };
  const clickConnectHandle = (event: MouseEvent) => {
    console.log('clickConnectHandle');
  };
  return (
    <CPage
      id='settingsPage'
      title='VinCall Integration'
      description=''
      onClickGoBack={clickGoBackHandle}
    >
      {/* <CUnConnected onClick={clickConnectHandle} /> */}
      <CIntegrationForm>
        <CFormContent />
      </CIntegrationForm>
    </CPage>
  );
};
