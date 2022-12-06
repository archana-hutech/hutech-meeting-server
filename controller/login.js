const express = require("express");
const route = express.Router();
const { loginUtility } = require('../utility/login')

route.post("/login", async (req, res) => {
  try {
    console.log("login success........");
    const userExist = await loginUtility(req?.body?.email, req?.body?.password);
    res.status(userExist?.statusCode).json(userExist);
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "failed to login",
      error: error.message,
    });
  }
});;

module.exports = route;
