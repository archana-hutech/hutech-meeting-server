const express = require("express");
const route = express.Router();
const {addMedia, getMediaData, deleteMedia} = require('../utility/media');

route.post("/upload", async (req, res) => {
    try {
        console.log("-------------------------------------");
        // console.log(req.files);
      const mediaData  = req.files;
      if(Array.isArray(mediaData?.file)){ const crtMedia = await addMedia(mediaData?.file) 
        if(crtMedia){
            res.status(200).json({crtMedia, message:"file uploaded successfuly", success:true})
        }else{
          res.status(400).json({
         success: false,
         message: "failed to upload",
    });
        }
      }else{
 const crtMedia = await addMedia([mediaData?.file]) 
        if(crtMedia){
            res.status(200).json({crtMedia, message:"file uploaded successfuly", success:true})
        }else{
          res.status(400).json({
         success: false,
         message: "failed to upload",
    });
        }
      }
       
    } catch (error) {
        console.log(error);
         res.status(500).json({
         success: false,
         statusCode: 500,
         message: "Internal server error",
         error: error.message,
    });
    }
})

route.get("/", async(req, res) => {
    try {
      const channel = await getMediaData();  
      res.status(channel?.statusCode).json(channel);  
    } catch (error) {
        console.log(error);
         res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
    }
})

route.get("/:id", async(req, res) => {
   try {
        const channelDetails = await getMediaData(req?.params?.id);
        res.setHeader("Content-Length", channelDetails?.readMedia?.fileSize);
        res.write(channelDetails?.readMedia?.fileData, "binary");
        res.end();
   } catch (error) {
        console.log(error);
        res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
   }
})

route.delete("/:id", async(req, res) => {
    try {
        const removeMedia = await deleteMedia(req?.params?.id);
        res.status(removeMedia?.statusCode).json(removeMedia);
    } catch (error) {
        console.log(error);
        res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
    }
})

module.exports = route;