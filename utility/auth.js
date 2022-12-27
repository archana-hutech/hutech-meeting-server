const db = require('../model/db');
const jwt = require("jsonwebtoken");

async function createJWTToken(id, email, permission) {
  try {
    //get the matched user details
  //create JWT token which includes id & email
  const token = jwt.sign(
    { user: { id, email, permission } },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "24h" }
  );
  // console.log(token);
  return { idToken: token, refreshToken: "na" };
  } catch (error) {
     console.log(error);
     res.sendStatus(500); 
  }
}


async function authorizeUser(req, res, next) {
  try {
        //  console.log(req);
     console.log("Authorizing user permission.....");
     const Method = req.method;
     const Endpoint = req.url;
     console.log(Method, Endpoint);
     const authHeader = req.headers["authorization"];
     const tokenDetails = authHeader ? authHeader.split(" ")[1] : null;
     console.log({tokenDetails});
     if (tokenDetails == null) res.send(401);
     jwt.verify(tokenDetails, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
     if (err) {
      console.log(err);
      res.sendStatus(401);
     } else {
      console.log(user?.user?.permission?.permissions);
      const permissionsInfo=user?.user?.permission?.permissions;
      let hasPermissions=false;
      switch (Endpoint) {
        case '/employee':
          if(Method==='POST'){
            if(permissionsInfo?.All || permissionsInfo?.EMP_CRT)
            hasPermissions=true
          }
            else if(Method==='PUT'){
            if(permissionsInfo?.All || permissionsInfo?.EMP_CRT)
            hasPermissions=true
          }
            else if(Method==='DELETE'){
            if(permissionsInfo?.All || permissionsInfo?.EMP_CRT)
            hasPermissions=true
          }
          break;
        case '/permission':
          if(Method==='POST'){
            if(permissionsInfo?.All || permissionsInfo?.EMP_CRT)
            hasPermissions=true
          }
           else if(Method==='GET'){
              if(permissionsInfo?.All || permissionsInfo?.EMP_CRT )
              hasPermissions=true
           }
            else if(Method==='PUT'){
            if(permissionsInfo?.All || permissionsInfo?.EMP_CRT)
            hasPermissions=true
          }
            else if(Method==='DELETE'){
            if(permissionsInfo?.All || permissionsInfo?.EMP_CRT)
            hasPermissions=true
          }
          break;

          default : {
              if(Method===req.method && Endpoint.includes("/employee/") && Endpoint.length===46 && (permissionsInfo?.all || permissionsInfo?.EMP_CRT)){
              hasPermissions=true
              break;
          } else {
            (Method===req.method && Endpoint.includes("/permission/") && Endpoint.length===46 && (permissionsInfo?.all || permissionsInfo?.EMP_CRT))
            hasPermissions=true
            break;
          }
      }
     
      }
      //  console.log({hasPermissions});
    if(hasPermissions){
       req.user = {...user?.user,orgId:user?.user?.permission?.orgId||null};
      next();
     }else{
       res.sendStatus(401);
     } 
    }
  })
 } catch (error) {
    console.log(error);
    res.sendStatus(500); 
  }
}
    


module.exports = { createJWTToken, authorizeUser };
