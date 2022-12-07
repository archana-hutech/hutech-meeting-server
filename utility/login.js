const db = require('../model/db');
const emp = db.Employees;
const assent = db.Permission
const { createJWTToken } = require('../utility/auth');

async function loginUtility(email, password) {
  try {
    const userInfoExist = await emp.findOne({ where: { email, password },include:[{model: db.Permission, attributes:["id", "name", "permissions", "orgId"] }] });
    const userDetails = userInfoExist
    if (userDetails?.id) {
      const tokenIfo = await createJWTToken(
        userDetails?.id,
        userDetails?.email,
        userDetails?.permission
      )
      return {
        success: true,
        statusCode: 200,
        ...tokenIfo,
        message: "user login success",
      }
    } else {
      return { success: false, statusCode: 401, message: "unauthorized" };
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


module.exports = { loginUtility };
