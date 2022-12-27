const db = require('../model/db');
const forum = db.Media;

async function addMedia(mediaData=[]){
    try {
      //1) using map create bulk object for model [{},{}]
      let  bulkMediaObj = mediaData?.map(media=>({
          mediaType: media.mimetype,
          fileName: media.name,
          fileSize: media?.size,
          fileType: media.mimetype,
          fileExtension: media.name,
          fileData: media.data.toString('binary'),
          fileString: media.data.toString('base64'),
      }))

     if(bulkMediaObj?.length>0){
      //2) bulk create'
      const mediaAdded=await forum.bulkCreate(bulkMediaObj)
      // console.log(mediaAdded);
      // return mediaAdded
       return {
         sucess:true,
         statusCode: 200,
         message: "media uploaded success",
         way: mediaAdded,
         };
     }else{
       return {
             sucess: true,
             statusCode:400,
             message:"media failed to upload",
         }
     }

      //return response

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

async function getMediaData(id = null) {
  try {
    const InfoChannel = await forum.findAll({where: id ? { id } : {} });
    if(InfoChannel.length > 0){
      return {
         sucess:true,
         statusCode: 200,
         message: "read media details",
         readMedia:id ? InfoChannel[0] : InfoChannel,
         };
    } else {
      return {
             sucess: true,
             statusCode:400,
             message: "media not found",
         }
    }
  } catch (error) {
    console.log(error);
        return({ sucess:false, statusCode: 500, message:"Internal server error", error: error.message });
     }
}

async function deleteMedia(id){
   try {
    const deleteMedia = await forum.destroy({ where: { id } });
    return {
      success: true,
      statusCode: 200,
      message: "media deleted successfully",
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

module.exports = { addMedia, getMediaData, deleteMedia };