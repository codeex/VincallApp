import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { CFormSkeleton } from "@comm100/framework/Components/Form";
import { APPClient } from "comm100-app";
import { CFormContent } from "../../components/integration/form/CFormContent";
import { CIntegrationForm } from "../../components/integration/form/CIntegrationForm";
import { CPage } from "../../components/CPage";
import { CUnConnected } from "../../components/CUnConnected";
import { delayOpenWindow } from "@comm100/framework/Helpers";
import { CCircularProgressStyled } from "@comm100/styledComponents/Button/CCircularProgressStyled";
import { CVincallConnectContainerStyled } from "../../styledComponents/CVincallConnectContainerStyled";
import { VincallDomainService } from "../../domains/VincallDomainService";
import {
  getSessionStorageAccessToken,
  getSiteId
} from "../../helper/getSiteInfo";
import { ConnectState } from "../../domains/bo/ConnectStateBo";
import { PageContextProvider } from "./PageContext";
import { apiDomain, oauthDomain } from "../../config";
import { Login } from "./Login";

export type ConnectStatus = "connecting" | "connected" | "unconnected";

export const SettingsPage = () => {
  const client = APPClient.init();
  const [isIntegrating, setIsIntegrating] = useState(false);
  const [connectStatus, setConnectStatus] = useState<ConnectStatus>(
    "connecting"
  );
  const [connectData, setConnectData] = useState<ConnectState>();
  const handleRef = useRef(null as any);

  const clickGoBackHandle = (event: MouseEvent) => {
    client.do("navigation.goto", "..");
  };
  const clickConnectHandle = (event: MouseEvent) => {
    const currentHref = window.location.href.substring(
      0,
      window.location.href.indexOf("?")
    );
    const callbackHref = currentHref.replace(
      /\/([^\/]*)\.html/gi,
      "/vincallCallback.html"
    );
    handleRef.current = delayOpenWindow(
      async () => {
        return [
          `${oauthDomain}/connect/authorize`,
          "?client_id=vincall",
          "&response_type=code",
          "&scope=api",
          `&redirect_uri=${encodeURIComponent(
            `${apiDomain}/open/login/callback?redirect_uri=${encodeURIComponent(
              callbackHref
            )}&siteId=${getSiteId()}&domain=${oauthDomain}`
          )}`
        ].join("");
      },
      "connect",
      {
        width: 480,
        height: 600,
        top: 100,
        left: 100
      }
    );
  };

  const handleLoadConnectState = () => {
    const connectStateService = new VincallDomainService({
      url: `/open/connectState?siteId=${getSiteId()}`,
      token: getSessionStorageAccessToken()!
    });
    connectStateService
      .get()
      .then(data => {
        setConnectStatus(data.connected ? "connected" : "unconnected");
        setConnectData(data as ConnectState);
        setIsIntegrating(false);
      })
      .catch(err => {
        setConnectStatus("unconnected");
      });
  };
  const handleMessage = async (event: any) => {
    const { code } = event.data;
    const pathname = event.source.location.pathname;

    if (pathname.toLowerCase().indexOf("vincallcallback.html") >= 0 && code) {
      setIsIntegrating(true);

      handleRef.current.then(h => h.close());

      handleLoadConnectState();
    }
  };
  const handleLoad = () => {
    // check connect state
    handleLoadConnectState();
    //register message event
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  };
  useEffect(() => {
    return handleLoad();
  }, []);

  const PageContext = React.createContext({});

  return (
    <CPage
      id="settingsPage"
      title="VinCall Integration"
      description="Integrate VinCall with Comm100 in minutes and deliver phone support from the Comm100 Agent Console where your team use to manage all other channels."
      onClickGoBack={clickGoBackHandle}
    >
      <PageContextProvider
        value={{
          disconnectCallback: () => {
            setConnectStatus("unconnected");
          }
        }}
      >
        {connectStatus === "connecting" && <CFormSkeleton />}
        {connectStatus === "unconnected" && (
          <>
            {isIntegrating && (
              <CVincallConnectContainerStyled>
                <CCircularProgressStyled size={50} />
              </CVincallConnectContainerStyled>
            )}
            {!isIntegrating && <CUnConnected onClick={clickConnectHandle} />}
          </>
        )}
        {connectStatus === "connected" &&
          connectData && (
            <CIntegrationForm connect={connectData}>
              <CFormContent />
            </CIntegrationForm>
          )}
      </PageContextProvider>
    </CPage>
  );
};
