const db = require('../model/db');
const forum = db.Media;

async function addMedia(mediaData){
    try {
        // console.log({mediaData});
    const mediaInfo = await forum.create({
        mediaType: mediaData.mimetype,
        fileName: mediaData.name,
        fileType: mediaData.mimetype,
        fileExtension: mediaData.name,
        fileString: mediaData.data.toString('base64'),
    });
    //  console.log({mediaInfo});
    if (mediaData) {
      return {
        success: true,
        statusCode: 200,
        message: "media set successfully",
        channel: mediaInfo.get(),
      };
    } else {
      return {
        success: false,
        statusCode: 500,
        message: "No media added",
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


module.exports = { addMedia };