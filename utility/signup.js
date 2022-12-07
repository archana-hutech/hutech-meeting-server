const db = require('../model/db');
const org = db.Organizations;
const emp = db.Employees;
const assent = db.Permission; 

async function createOrg(orgData) {
  try {
    const orgInfo = await org.create(orgData)
    if (orgData) {
      return {
        success: true,
        statusCode: 200,
        message: "org created successfully",
        orgs: orgInfo.get(),
      };
    } else {
      return {
        success: false,
        statusCode: 500,
        message: "failed to register user",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      statusCode: 500,
      message: "internal server error",
      error: error.message,
    };
  }
}

async function crtPermisson(permissionData) {
  try {
    if (permissionData) {
      const accessInfo = await assent.create(permissionData)
      return {
        success: true,
        statusCode: 200,
        message: "given access to the owner",
        access: accessInfo.get(),
      };
    } else {
      return {
        success: false,
        statusCode: 500,
        message: "failed to register access",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      statusCode: 500,
      message: "internal server error",
      error: error.message,
    };
  }
}

async function crtEmp(empData) {
  try {
    const usersInfo = await emp.create(empData)
    if (empData) {
      return {
        success: true,
        statusCode: 200,
        message: "emp created successfully",
        user: usersInfo.get(),
      };
    } else {
      return {
        success: false,
        statusCode: 500,
        message: "failed to register emp",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      statusCode: 500,
      message: "internal server error",
      error: error.message,
    };
  }
}



module.exports = {createOrg, crtEmp, crtPermisson };
