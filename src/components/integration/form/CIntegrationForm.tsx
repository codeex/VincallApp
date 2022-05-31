import {
  CForm,
  CFormContainerContent,
  CFormContainerWrapper,
  CFormSkeleton
} from '@comm100/framework/Components/Form';
import React, { useEffect, useState } from 'react';

export type CIntegrationFormProps = {
  children: React.ReactNode;
};

const defaultValues = {
  callStatusOnAnsweringChat: true,
  callStatus: 'away',
  chatStatusOnAnsweringCall: true,
  chatStatus: 'online'
};

export const CIntegrationForm = ({ children }: CIntegrationFormProps) => {
  const [loading, setLoading] = useState<boolean>();
  useEffect(() => {
    console.log('loading');
  }, []);

  return (
    <>
      {loading && <CFormSkeleton />}
      {!loading && (
        <CForm initialValues={defaultValues}>
          <CFormContainerWrapper>
            <CFormContainerContent>{children}</CFormContainerContent>
          </CFormContainerWrapper>
        </CForm>
      )}
    </>
  );
};

CIntegrationForm.displayName = 'CIntegrationForm';
