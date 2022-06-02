import { createContext, useContext } from "react";

export type PageContextValue = {
  disconnectCallback: () => void;
};

export const PageContext = createContext({} as PageContextValue);
export const PageContextProvider = PageContext.Provider;

export const usePageContext = (): PageContextValue => {
  return useContext<PageContextValue>(PageContext);
};
