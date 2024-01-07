// proxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // Forward requests starting with "/auth/google" to "http://localhost:5000/auth/google"
  app.use(
    createProxyMiddleware("/auth/google", { target: "http://localhost:5000" })
  );

  // Forward requests starting with "/api/**" to "http://localhost:5000/api/**"
  app.use(
    createProxyMiddleware("/api/**", { target: "http://localhost:5000" })
  );
};
