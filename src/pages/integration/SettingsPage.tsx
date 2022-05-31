import React, { MouseEvent } from 'react';
import { CEditFormAction } from '../../components/integration/form/CEditFormAction';
import { CFormContent } from '../../components/integration/form/CFormContent';
import { CIntegrationForm } from '../../components/integration/form/CIntegrationForm';
import { CPage } from '../../components/CPage';

export const SettingsPage = () => {
  const clickGoBackHandle = (event: MouseEvent) => {
    console.log('clickGoBackHandle');
  };
  return (
    <CPage
      id='settingsPage'
      title='VinCall Integration'
      onClickGoBack={clickGoBackHandle}
    >
      <CIntegrationForm>
        <CFormContent />
        <CEditFormAction />
      </CIntegrationForm>
    </CPage>
  );
};
