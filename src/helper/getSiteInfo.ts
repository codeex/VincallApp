import Query from "query-string";
import { defaultSiteId } from "../config";

export const getQueryParams = (): { [key: string]: string } =>
  Query.parse(location.search.toLowerCase());

export const getSiteId = (): string => {
  if (process.env.NODE_ENV === "production") {
    return getQueryParams()["siteid"];
  } else {
    return defaultSiteId;
  }
};

export const getDomain = (): string => getQueryParams()["domain"];

export const getAgentId = (): string => getQueryParams()["agentid"];

export const setSessionStorageAccessToken = (accessToken: string) =>
  sessionStorage.setItem("accessToken", accessToken);

export const getSessionStorageAccessToken = () =>
  sessionStorage.getItem("accessToken");
