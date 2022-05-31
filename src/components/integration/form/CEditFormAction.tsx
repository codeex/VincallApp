import {
  CFormAction,
  CFormActionCancelButton,
  CFormActionSubmitButton
} from '@comm100/framework/Components/Form';
import React from 'react';

export const CEditFormAction = () => {
  return (
    <>
      <CFormAction>
        <CFormActionSubmitButton onSubmit={((values: any) => {}) as any} />
        <CFormActionCancelButton onCancel={((values: any) => {}) as any} />
      </CFormAction>
    </>
  );
};

CEditFormAction.displayName = 'CEditFormAction';
