import React from "react";
import { CFieldInputProps } from "@comm100/framework/Components/Form";
import { CIconButton } from "@comm100/framework/Components/CIconButton";
import { confirmDialog } from "@comm100/framework/Helpers";
import { dispatchSuccessfullEvent } from "@comm100/framework/Infrastructure/CustomEvent";
import { getSessionStorageAccessToken, getSiteId } from "../helper/getSiteInfo";
import { VincallDomainService } from "../../src/domains/VincallDomainService";
import { usePageContext } from "../../src/pages/integration/PageContext";

export interface CDisconnectButtonProps extends CFieldInputProps<boolean> {}

export const CDisconnectButton = ({ name, value }: CDisconnectButtonProps) => {
  const { disconnectCallback } = usePageContext();
  const handleClick = async () => {
    const confirm = await confirmDialog({
      title: "Confirm Disconnect",
      message: `Are you sure you want to disconnect with Vincall Server "${value}"?`
    });

    if (confirm) {
      const disConnectStateService = new VincallDomainService({
        url: `/open/disconnect?siteId=${getSiteId()}`,
        token: getSessionStorageAccessToken()!
      });
      disConnectStateService
        .update({})
        .then(data => {
          disconnectCallback();
        })
        .catch(err => {});

      dispatchSuccessfullEvent(
        "VinCall Integration disconnected successfully."
      );
    }
  };
  return (
    <CIconButton icon="disconnect" onClick={handleClick} title="Disconnect" />
  );
};

CDisconnectButton.displayName = "CDisconnectButton";
