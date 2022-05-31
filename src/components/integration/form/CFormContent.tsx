import React from 'react';
import {
  CFormControl,
  CFormControlGroup,
  CFormControlGroupContainer,
  CFormControlGroupItemContainer
} from '@comm100/framework/Components/Form';
import { CInput } from '@comm100/framework/Components/CInput';

export const CFormContent = () => {
  return (
    <CFormControlGroupContainer title='Connect to VinCall Server'>
      <CFormControlGroup>
        <CFormControlGroupItemContainer
          xs={12}
          data-formfield='callStatusOnAnsweringChat'
        >
          <CFormControl
            name='server'
            label='Connected Server'
            labelShrink
            component={CInput}
            maxLength={2048}
            disabled
          />
        </CFormControlGroupItemContainer>
      </CFormControlGroup>
    </CFormControlGroupContainer>
  );
};
CFormContent.displayName = 'CFormContent';
