import React from 'react';
import { useFormikContext } from 'formik';
import {
  CFormControl,
  CFormControlGroup,
  CFormControlGroupContainer,
  CFormControlGroupItemContainer,
  CFormField,
  CFormControlGroupItem,
  CFormControlGroupItemWithInline,
  CFormControlInlineContainer
} from '@comm100/framework/Components/Form';
import { CIndentBox } from '@comm100/framework/Components/IndentBox/CIndentBox';
import { CCheckbox } from '@comm100/framework/Components/CCheckbox';
import { CSelect } from '@comm100/framework/Components/CSelect';
import { CSubGroupTitleText } from '@comm100/framework/Components/CSubGroupTitleText';
import { CHtmlText } from '@comm100/framework/Components/CHtmlText';
import { IntegrationBo } from '../bo/integrationBo';

export const CFormContent = () => {
  const { values } = useFormikContext<IntegrationBo>();
  return (
    <CFormControlGroupContainer title='Agent Status Management'>
      <CFormControlGroup>
        <CFormControlGroupItemContainer data-formfield='callStatusOnAnsweringChat'>
          <CFormControl
            name='callStatusOnAnsweringChat'
            labelForValue='Automatically switch call status when agent starts answering chat'
            labelShrink
            component={CCheckbox}
            helperText='Block incoming call when agent starts answering a chat. And you will see the missed call in "Recent Call" page.'
            helperTextPosition='tooltip'
          />
        </CFormControlGroupItemContainer>
        {values.callStatusOnAnsweringChat && (
          <CFormControlGroupItem xs={12}>
            <CIndentBox>
              <CFormControlGroup isChild={true}>
                <CFormControlGroupItemContainer xs={12}>
                  <CFormControlGroupItem xs={12}>
                    <CFormControlGroupItemWithInline>
                      <CFormControlInlineContainer width='auto'>
                        <CHtmlText
                          content='Change agent call status to&nbsp;&nbsp;'
                          isInline={true}
                        />
                      </CFormControlInlineContainer>
                      <CFormControlInlineContainer width='200px'>
                        <CFormControl
                          name='callStatus'
                          labelShrink
                          placeholder='te'
                          component={CSelect}
                          options={[]}
                        />
                      </CFormControlInlineContainer>
                    </CFormControlGroupItemWithInline>
                  </CFormControlGroupItem>
                </CFormControlGroupItemContainer>
              </CFormControlGroup>
            </CIndentBox>
          </CFormControlGroupItem>
        )}
        <CFormControlGroupItemContainer xs={12} />
        <CFormControlGroupItemContainer data-formfield='chatStatusOnAnsweringCall'>
          <CFormControl
            name='chatStatusOnAnsweringCall'
            labelForValue='Block incoming chat when agent starts answering call'
            labelShrink
            component={CCheckbox}
            helperText='Automatically switch the chat status of an agent when he/she is on a call. It will switch back to the previous status automatically after the agent finishes the call.'
            helperTextPosition='tooltip'
          />
        </CFormControlGroupItemContainer>
        {values.chatStatusOnAnsweringCall && (
          <CFormControlGroupItem xs={12}>
            <CIndentBox>
              <CFormControlGroup isChild={true}>
                <CFormControlGroupItemContainer xs={12}>
                  <CFormControlGroupItem xs={12}>
                    <CFormControlGroupItemWithInline>
                      <CFormControlInlineContainer width='auto'>
                        <CHtmlText
                          content='Change agent chat status to&nbsp;&nbsp;'
                          isInline={true}
                        />
                      </CFormControlInlineContainer>
                      <CFormControlInlineContainer width='200px'>
                        <CFormControl
                          name='chatStatus'
                          labelShrink
                          placeholder='te'
                          component={CSelect}
                          options={[]}
                        />
                      </CFormControlInlineContainer>
                    </CFormControlGroupItemWithInline>
                  </CFormControlGroupItem>
                </CFormControlGroupItemContainer>
              </CFormControlGroup>
            </CIndentBox>
          </CFormControlGroupItem>
        )}
      </CFormControlGroup>
    </CFormControlGroupContainer>
  );
};
CFormContent.displayName = 'CFormContent';
