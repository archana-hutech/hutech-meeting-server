const express = require("express");
const route = express.Router();
const { getEmployee, addEmployee, deletedUser } = require('../utility/employee');
const { authorizeUser } = require("../utility/auth");


//get-user by id
route.get("/employee/:id", authorizeUser, async (req, res) => {
  try {
    let userDetail = await getEmployee(req?.params.id);
    res.status(userDetail?.statusCode).json(userDetail);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
});

//add-employee
route.post("/employee", authorizeUser, async (req, res) => {
  try {
    const crtEmployee = await addEmployee({...req?.body, orgId:req?.user?.orgId});
    res.status(crtEmployee?.statusCode).json(crtEmployee);  
  } catch (error) {
    console.log(error);
     res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
     });
  }
})

//delete by id
route.delete("/employee/:id",  async (req, res) => {
  try {
    let userDelete = await deletedUser(req?.params?.id);
    res.status(userDelete?.statusCode).json(userDelete);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
});

module.exports = route;
