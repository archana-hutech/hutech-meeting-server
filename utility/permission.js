const db = require('../model/db');
const emp = db.Employees;
const assent = db.Permission;


//create role
async function accessRole(role){
   try {
    const accessInfo = await assent.create(role);
    if (accessInfo) {
      return {
        success: true,
        statusCode: 200,
        message: "role created successfully",
        roles: accessInfo.get(),
      };
    } else {
      return {
        success: false,
        statusCode: 400,
        message: "failed to create role for user",
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

// get permission
async function getPermission(id = null) {
     try{
         const getAssent = await assent.findAll({where: id ? { id } : {} });
         console.log({getAssent});
         if (getAssent.length > 0){
      return {
         sucess:true,
         statusCode: 200,
         message:" read permission details",
         access:id ? getAssent[0] : getAssent,
         };
     }else{
         return {
             sucess: true,
             statusCode:400,
             message:"permissions not found",
         }
     };
    } catch (error) {
     console.log(error);
        return({ sucess:false, statusCode: 500, message:"users not found", error: error.message });
     }
     }

// update permission
async function updatePermission(id, role){
  try {
        const updatePermissionInfo = await assent.update(role, {where:{id}});
        console.log(updatePermissionInfo);
        if (updatePermissionInfo) {
           return {
                    sucess: true,
                    statusCode:200,
                    message:"updated sucessfully",
                };
        }else {
          return{
                sucess: false,
                statusCode:400,
                message:"failed to update the permission",
            }
        }
  } catch (error) {
     console.log(error);
                return({ sucess:false, statusCode: 500, message:"permission not found", error: error.message });
             }
}

//delete permissioin
async function removePermission(id){
  try {
     const delteAssent = await assent.destroy({ where: { id } });
      return {
      success: true,
      statusCode: 200,
      message: "assent deleted successfully",
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

module.exports = { accessRole, getPermission, updatePermission, removePermission };