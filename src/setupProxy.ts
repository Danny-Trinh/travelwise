var express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
var app = express();
module.exports = function (app: any) {
  app.use(
    "/plants",
    createProxyMiddleware({
      target: "http://theplantpla.net/api/getplants/",
      changeOrigin: true,
    })
  );
};
