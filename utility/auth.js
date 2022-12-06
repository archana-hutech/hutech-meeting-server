const db = require('../model/db');
const jwt = require("jsonwebtoken");

async function createJWTToken(id, email) {
  //get the matched user details
  //create JWT token which includes id & email
  const token = jwt.sign(
    { user: { id, email } },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
  // console.log(token);
  return { idToken: token, refreshToken: "na" };
}

module.exports = { createJWTToken };
