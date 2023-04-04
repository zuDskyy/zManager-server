const router = require('express').Router();
const ytdl = require('ytdl-core');





router.get('/' , async (req,res) => {
   try{
    const videoUrl = req.query.url;
    const videoInfo = await ytdl.getInfo(videoUrl);
    const audioFormats = ytdl.filterFormats(videoInfo.formats, 'audioonly');
    console.log(audioFormats);
    audioFormats.map((item) => {
        res.send({item : item.url});
    })

   }catch(error){
    res.status(error)
   }
  

     
})



module.exports = router;