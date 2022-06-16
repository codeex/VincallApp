import React, { useEffect, useState } from "react";
import { apiDomain, oauthDomain } from "src/config";
import {
  getAgentId,
  getSiteId,
  setSessionStorageAccessToken
} from "src/helper/getSiteInfo";
import { SettingsPage } from "./SettingsPage";

export const Authentication = () => {
  const [accessToken, setAccessToken] = useState("");
  const currentHref = window.location.href.substring(
    0,
    window.location.href.indexOf("?")
  );
  const getAccessTokenHref = currentHref.replace(
    /\/([^\/]*)\.html/gi,
    "/getAccessToken.html"
  );
  const handleMessage = async (event: any) => {
    const { code } = event.data;
    const pathname = event.source.location.pathname;

    if (pathname.toLowerCase().indexOf("getaccesstoken.html") >= 0 && code) {
      setSessionStorageAccessToken(code);
      setAccessToken(code);
    }
  };
  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  });
  return (
    <>
      <iframe
        src={`${apiDomain}/open/login/?agentId=${getAgentId()}&siteId=${getSiteId()}&domain=${encodeURIComponent(
          `${window.location.protocol}//${window.location.host}`
        )}&returnUri=${encodeURIComponent(getAccessTokenHref)}`}
        style={{ display: "none" }}
      />
      {accessToken && <SettingsPage />}
    </>
  );
};
