const express = require("express");
const route = express.Router();
const { accessRole, getPermission, updatePermission, removePermission } = require('../utility/permission');
const { authorizeUser } = require('../utility/auth');

//add-role
route.post("/permission", authorizeUser, async(req, res) =>{
  try {
    const generatePermission = await accessRole({...req?.body, orgId:req?.user?.orgId});
    res.status(generatePermission?.statusCode).json(generatePermission);   
  } catch (error) {
     res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
     });
  }
})

//getPermission by id
route.get("/permission/:id", authorizeUser, async(req, res) =>{
  try {
    const permissionDetails = await getPermission(req?.params?.id);
     //  console.log(permissiondetails);
        res.status(permissionDetails?.statusCode).json(permissionDetails);  
  } 
    catch (error) {
        res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
    }
})

//getPermission 
route.get("/permission", authorizeUser, async(req, res) =>{
  try {
    const accessDetails = await getPermission();
        res.status(accessDetails?.statusCode).json(accessDetails);  
  } 
    catch (error) {
        res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
    }
})


//update permission
 route.put("/permission/:id", authorizeUser, async (req, res) => {
   try {
       const assentDisplay = await updatePermission(req?.params.id, {...{...req?.body, orgId:req?.user?.orgId }});
        res.status(assentDisplay?.statusCode).json(assentDisplay);
   } catch (error) {
      console.log(error);
       res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
   }
 })

 //delete permission
 route.delete("/permission/:id", authorizeUser, async (req, res) => {
    try {
      const removeAccess = await removePermission(req?.params.id);
      console.log(removeAccess);
      res.status(removeAccess?.statusCode).json(removeAccess);
    } catch (error) {
      console.log(error);
        res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
    }
 })


module.exports = route;