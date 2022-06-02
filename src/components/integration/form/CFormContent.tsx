import React from "react";
import {
  CFormControl,
  CFormControlGroup,
  CFormControlGroupContainer,
  CFormControlGroupItemContainer
} from "@comm100/framework/Components/Form";
import { CInput } from "@comm100/framework/Components/CInput";
import { CAgentMappingTable } from "../table/CAgentMappingTable";
import { CDisconnectButton } from "../../CDisconnectButton";

export const CFormContent = () => {
  return (
    <>
      <CFormControlGroupContainer title="Connect to Vincall Server">
        <CFormControlGroup>
          <CFormControlGroupItemContainer xs={6}>
            <CFormControl
              name="server"
              label="Connected Server"
              labelShrink
              component={CInput}
              maxLength={2048}
              disabled
            />
          </CFormControlGroupItemContainer>
          <CFormControlGroupItemContainer xs={6}>
            <CFormControl name="server" component={CDisconnectButton} />
          </CFormControlGroupItemContainer>
        </CFormControlGroup>
      </CFormControlGroupContainer>
      <CFormControlGroupContainer title="Agents Mapping">
        <CFormControlGroup>
          <CFormControlGroupItemContainer xs={12}>
            <CAgentMappingTable />
          </CFormControlGroupItemContainer>
        </CFormControlGroup>
      </CFormControlGroupContainer>
    </>
  );
};
CFormContent.displayName = "CFormContent";
