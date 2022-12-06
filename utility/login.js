const db = require('../model/db');
const emp = db.Employees;
const { createJWTToken } = require('../utility/auth');

async function loginUtility(email, password) {
  try {
    const userInfoExist = await emp.findOne({ where: { email, password } });
    const userDetails = userInfoExist.get();
    if (userDetails?.id) {
      const tokenIfo = await createJWTToken(
        userDetails?.id,
        userDetails?.email
      )
      return {
        success: true,
        statusCode: 200,
        ...tokenIfo,
        message: "user login success",
      }
    } else {
      return { success: false, statusCode: 401, message: "unauthorize" };
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


// post user
// route.post("/adduser", authorizeUser, async (req, res) => {
//   try {
//     console.log("add user.........");
//     const crtUser = await addUser(req.body);
//     res.status(crtUser?.statusCode).json(crtUser);
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "internal server error",
//       error: error.message,
//     });
//   }
// });
