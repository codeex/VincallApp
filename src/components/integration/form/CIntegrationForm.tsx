import {
  CForm,
  CFormContainerContent,
  CFormContainerWrapper
} from '@comm100/framework/Components/Form';
import React from 'react';
import { ConnectState } from '../../../domains/bo/ConnectStateBo';

export type CIntegrationFormProps = {
  children: React.ReactNode;
  connect: ConnectState;
};

export const CIntegrationForm = ({
  children,
  connect
}: CIntegrationFormProps) => (
  <CForm initialValues={connect}>
    <CFormContainerWrapper>
      <CFormContainerContent>{children}</CFormContainerContent>
    </CFormContainerWrapper>
  </CForm>
);

CIntegrationForm.displayName = 'CIntegrationForm';
