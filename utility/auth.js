const db = require('../model/db');
const jwt = require("jsonwebtoken");

async function createJWTToken(id, email, permission) {
  console.log({permission});
  //get the matched user details
  //create JWT token which includes id & email
  const token = jwt.sign(
    { user: { id, email, permission } },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "9h" }
  );
  // console.log(token);
  return { idToken: token, refreshToken: "na" };
}


async function authorizeUser(req, res, next) {
  console.log("Authorizing user permission.....");
  const authHeader = req.headers["authorization"];
  const tokenDetails = authHeader ? authHeader.split(" ")[1] : null;
  console.log(tokenDetails);
  if (tokenDetails == null) res.send(401);
  jwt.verify(tokenDetails, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.sendStatus(401);
    } else {
      console.log("Authorized user",user);
      req.user = user;
      next();
    }
  });
}


module.exports = { createJWTToken, authorizeUser };
