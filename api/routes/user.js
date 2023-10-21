const express = require("express");
const router = express.Router();
const { routeWrapper } = require("./apiutils");
const UserModel = require("../models/UserModel");
const _ = require("lodash");

module.exports = () => {
  router.post("/login", (req, res) => {
    routeWrapper(req, res, false, () => new UserModel().checkLogin(req.body));
  });
  router.post("/add", function (req, res, next) {
    routeWrapper(req, res, false, () =>
      new UserModel().add(
        _.pick(req.body, [
          "username",
          "email",
          "password",
        ])
      )
    );
  });
  return router;
};