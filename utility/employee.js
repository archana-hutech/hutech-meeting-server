const db = require('../model/db');
const emp = db.Employees;

async function addEmployee(users) {
  try {
    const usersInfo = await emp.create(users);
    console.log(users);
    if (users) {
      return {
        success: true,
        statusCode: 200,
        message: "user created successfully",
        user: usersInfo.get(),
      };
    } else {
      return {
        success: false,
        statusCode: 500,
        message: "failed to register user",
      };
    }
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: "internal server error",
      error: error.message,
    };
  }
}


async function getEmployee(id = null) {
  try {
    const usersDetails = await emp.findAll({ where: id ? { id } : {} });
    // console.log({usersDetails});
    if (usersDetails.length > 0) {
      return {
        success: true,
        statusCode: 200,
        message: "User details found",
        user: id ? usersDetails[0] : usersDetails,
      };
    } else {
      return {
        success: false,
        statusCode: 404,
        message: "User details not found",
      };
    }
  } catch (error) {
    return {
      success: false,
      statusCode: 404,
      message: "user not found",
      error: error.message,
    };
  }
}

async function accessGenerate(){
  
}


async function deletedUser(id) {
  try {
    const delUser = await emp.destroy({ where: { id } });
    return {
      success: true,
      statusCode: 200,
      message: "user deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: "internal server error",
      error: error.message,
    };
  }
}


module.exports = { getEmployee, addEmployee, deletedUser };