const db = require('../model/db');
const emp = db.Employees;
const assent = db.Permission;


//create role
async function accessRole(user){
   try {
    const accessInfo = await assent.create(user);
    console.log(user);
    if (user) {
      return {
        success: true,
        statusCode: 200,
        message: "role created successfully",
        user: accessInfo.get(),
      };
    } else {
      return {
        success: false,
        statusCode: 500,
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
             statusCode:500,
             message:"permissions not found",
         }
     };
    } catch (error) {
     console.log(error);
        return({ sucess:false, statusCode: 400, message:"users not found", error: error.message });
     }
     }

// update permission
async function updatePermission(id, user){
  try {
        const updatePermissionInfo = await assent.update(user, {where:{id}});
        console.log(updatePermissionInfo);
        if (permission) {
           return {
                    sucess: true,
                    statusCode:200,
                    message:"updated sucessfully",
                };
        }else {
          return{
                sucess: false,
                statusCode:500,
                message:"failed to update the permission",
            }
        }
  } catch (error) {
     console.log(error);
                return({ sucess:false, statusCode: 400, message:"permission not updated", error: error.message });
             }
}

//delete permissioin
async function removePermission(id){

}

module.exports = { accessRole, getPermission, updatePermission, removePermission };