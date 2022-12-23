const express = require("express");
const route = express.Router();
const { createOrg, crtEmp, crtPermisson, getOrgData, updateOrg } = require('../utility/signup')

// create-org 
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

//getAllOrganisation
route.get("/", async (req, res) =>{
  try {
    const organisationData = await getOrgData();
    res.status(organisationData?.statusCode).json(organisationData);
  } catch (error) {
    res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
  }
})

// const filters = req.query;
//   const filteredUsers = data.filter(user => {
//     let isValid = true;
//     for (key in filters) {
//       console.log(key, user[key], filters[key]);
//       isValid = isValid && user[key] == filters[key];
//     }
//     return isValid;
//   });

//getById
route.get("/:id", async (req, res) => {
   try {
    let OrganisationDetails = await getOrgData(req?.params?.id);
    res.status(OrganisationDetails?.statusCode).json(OrganisationDetails);
   } catch (error) {
     res.status(500).json({
       success: false,
       message: "internal server error",
       error: error.message,
     });
   }
})

route.put("/:id", async (req, res) => {
  try {
    const organisationDisplay = await updateOrg(req?.params?.id, req?.body);
    console.log({organisationDisplay});
    res.status(organisationDisplay?.statusCode).json(organisationDisplay);
  } catch (error) {
    console.log(error);
    res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
  }
})

route.delete("/:id", async (req, res) => {
  
})

module.exports = route;