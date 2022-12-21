const express = require("express");
const route = express.Router();
const {addMedia} = require('../utility/media');

route.post("/upload", async (req, res) => {
    try {
      const mediaData  = req.files.file
    //   console.log({mediaData});
        var d = mediaData.data.toString('base64');
        // console.log(d);
        const crtMedia = await addMedia(mediaData) 
        res.send({crtMedia})
    } catch (error) {
        console.log(error);
         res.status(500).json({
         success: false,
         statusCode: 500,
         message: "failed to upload",
         error: error.message,
    });
    }
})


module.exports = route;