import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { APPClient } from "@comm100/app-client";
import { CFormContent } from "../../components/integration/form/CFormContent";
import { CIntegrationForm } from "../../components/integration/form/CIntegrationForm";
import { CPage } from "../../components/CPage";
import { CUnConnected } from "../../components/CUnConnected";
import { delayOpenWindow } from "@comm100/framework/Helpers";
import { CCircularProgressStyled } from "@comm100/styledComponents/Button/CCircularProgressStyled";
import { CVincallConnectContainerStyled } from "../../styledComponents/CVincallConnectContainerStyled";

export const SettingsPage = () => {
  const client = APPClient.init();
  const [isIntegrating, setIsIntegrating] = useState(false);
  const handleRef = useRef(null as any);
  const clickGoBackHandle = (event: MouseEvent) => {
    client.do("navigation.goto", "..");
  };
  const clickConnectHandle = (event: MouseEvent) => {
    handleRef.current = delayOpenWindow(
      async () => {
        return [
          "https://oauth.vincall.net/connect/authorize",
          "?client_id=vincall",
          "&response_type=code",
          "&scope=vincall",
          `&redirect_uri=${encodeURIComponent(
            "https://apivincall.comm100dev.io/open/login/callback?redirect_uri=https://voipdash.comm100dev.io/vincallback.html"
          )}`
        ].join("");
      },
      "connect",
      {
        width: 600,
        height: 500,
        top: 100,
        left: 100
      }
    );
  };
  const handleMessage = async (event: any) => {
    const { code } = event.data;
    const pathname = event.source.location.pathname;

    if (pathname.toLowerCase().indexOf("vincallCallback.html") >= 0 && code) {
      setIsIntegrating(true);

      handleRef.current.then(h => h.close());

      //TODO: get data

      setIsIntegrating(false);
    }
  };
  const handleLoad = () => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  };
  useEffect(() => {
    return handleLoad();
  }, []);
  return (
    <CPage
      id="settingsPage"
      title="VinCall Integration"
      description="Description"
      onClickGoBack={clickGoBackHandle}
    >
      {isIntegrating ? (
        <CVincallConnectContainerStyled>
          <CCircularProgressStyled size={50} />
        </CVincallConnectContainerStyled>
      ) : (
        <CUnConnected onClick={clickConnectHandle} />
      )}
      <CIntegrationForm>
        <CFormContent />
      </CIntegrationForm>
    </CPage>
  );
};
