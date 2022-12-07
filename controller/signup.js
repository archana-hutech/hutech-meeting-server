const express = require("express");
const route = express.Router();
const {createOrg, crtEmp, crtPermisson } = require('../utility/signup')

//post 
route.post("/signup", async (req, res) => {
  try { 
     const { orgData, empData } = req.body;
    if(orgData && empData){
         const crtOrg = await createOrg(orgData);
         if(crtOrg?.success){
            const permissionCrt = await crtPermisson({orgId:crtOrg?.orgs.id, name:"Admin", permissions:{All:true} });
             if(permissionCrt?.success){
               const empCrt = await crtEmp({orgId:crtOrg?.orgs?.id, permissionId:permissionCrt?.access?.id,...empData});
               if(empCrt?.success){
                   //success
                    res.status(empCrt?.statusCode).json(empCrt);
               }else{
                   res.status(500).json("org created but failed to create user")
               }
             }
             else {
                 res.status(500).json("owner didn't get the access");
             }
         }
         else{
             res.status(crtOrg?.statusCode).json(crtOrg);
        }
    } 
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
});



module.exports = route;