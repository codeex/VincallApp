import React, { MouseEvent } from 'react';
import { CFormContent } from '../../components/integration/form/CFormContent';
import { CIntegrationForm } from '../../components/integration/form/CIntegrationForm';
import { CPage } from '../../components/CPage';
import { CUnConnected } from '../../components/CUnConnected';

export const SettingsPage = () => {
  const clickGoBackHandle = (event: MouseEvent) => {
    console.log('clickGoBackHandle');
  };
  const clickConnectHandle = (event: MouseEvent) => {
    console.log('clickConnectHandle');
  };
  return (
    <CPage
      id='settingsPage'
      title='VinCall Integration'
      description='Description'
      onClickGoBack={clickGoBackHandle}
    >
      <CUnConnected onClick={clickConnectHandle} />
      <CIntegrationForm>
        <CFormContent />
      </CIntegrationForm>
    </CPage>
  );
};
