const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/notification", // Change to your backend API route
    createProxyMiddleware({
      target: "http://localhost:3001", // Your Rails backend URL
      changeOrigin: true
    })
  );
};
