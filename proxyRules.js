const targetDomain = "https://apivincall.comm100dev.io";

const removeCookieSecure = (proxyRes, req, res) => {
  const sc = proxyRes.headers["set-cookie"];
  if (Array.isArray(sc)) {
    proxyRes.headers["set-cookie"] = sc.map(sc => {
      return sc
        .split(";")
        .filter(
          v =>
            v.trim().toLowerCase() !== "secure" &&
            !v
              .trim()
              .toLowerCase()
              .includes("samesite")
        )
        .join("; ");
    });
  }
  if (!proxyRes.headers["content-type"]) {
    proxyRes.headers["content-type"] = "application/json";
  }
};
module.exports = [
  {
    path: "/open/agents",
    target: targetDomain,
    secure: false,
    changeOrigin: true,
    cookieDomainRewrite: "localhost",
    onProxyRes: removeCookieSecure
  },
  {
    path: "/open",
    target: targetDomain,
    secure: false,
    changeOrigin: true,
    cookieDomainRewrite: "localhost",
    onProxyRes: removeCookieSecure
  }
];
