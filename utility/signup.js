const { Op } = require('sequelize');
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
        statusCode: 400,
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
        statusCode: 400,
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
        statusCode: 400,
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

async function getOrgData(offset, limit, q, id = null) {
  try {
    const getOrganisationDetails = await org.findAndCountAll({ where: id ? { id } : { [Op.or]:[{name : {
      [Op.iLike]:`%${q}%`, 
    }}, {city : {
      [Op.iLike]:`%${q}%`, 
    }}, {state : {
      [Op.iLike]: `%${q}%`
    }}] }, offset, limit,});
    if(getOrganisationDetails.count > 0 ){
      return {
         sucess: true,
         statusCode: 200,
         message: "organisation details",
         totalCount: getOrganisationDetails?.count,
         org: getOrganisationDetails?.rows,
      }
    } else {
      return {
          sucess: true,
          statusCode: 400,
          message: " organisation details not found",
         }
    }
  } catch (error) {
     console.log(error);
        return({ sucess:false, statusCode: 500, message:"Internal server error", error: error.message });
  }
}

async function updateOrg(id, orgData) {
 try {
  const updatedOrganization = await db.Organizations.update(orgData?.orgData,  { where: { id }, returning:true});
  if(updatedOrganization[0]>0){
 return {
      success: true,
      statusCode: 200,
      oganization: updatedOrganization[1],
    };
  }else{
 return {
      success: true,
      statusCode: 404,
       message: "organisation not found",
      //  oganization: updatedOrganization,
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

async function deleteOrganisation(id) {
  try {
    const delteOrg = await org.destroy({ where: { id } });
    return {
      success: true,
      statusCode: 200,
      message: "org deleted successfully",
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


module.exports = {createOrg, crtEmp, crtPermisson, getOrgData, updateOrg, deleteOrganisation };
