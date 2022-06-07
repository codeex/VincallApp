export const apiDomain =
  process.env.NODE_ENV === "production"
    ? "https://apitest.vincall.net"
    : "https://apivincall.comm100dev.io";

export const defaultSiteId = "10000";

export const oauthDomain =
  process.env.NODE_ENV === "production"
    ? "https://oauthtest.vincall.net"
    : "https://oauthvincall.comm100dev.io";

export const vincallDomain = "https://wwwtest.vincall.net";
