const router = require("express").Router();
const axios = require('axios');


router.get('/:query', async(req,res,cb) => {
    var query = req.params.query
       
  
          
    var params = {
        q: query,
        part:'snippet',
        maxResults: 30,
        key: process.env.APP_KEY3
      }


    
     var searchParams = new URLSearchParams(params)

    console.log(params)
    axios.get('https://www.googleapis.com/youtube/v3/search?' + searchParams)
    .then(function (response) {
      var result = response.data
    
      var findings = result.items.map(function (item) {
        var link = ''
        var id = ''
        switch (item.id.kind) {
          case 'youtube#channel':
            link = 'https://www.youtube.com/channel/' + item.id.channelId
            id = item.id.channelId
            break
          case 'youtube#playlist':
            link = 'https://www.youtube.com/playlist?list=' + item.id.playlistId
            id = item.id.playlistId
            break
          default:
            link = 'https://www.youtube.com/watch?v=' + item.id.videoId
            id = item.id.videoId
            break
        }

        return { 
          id: id,
          link: link,
          kind: item.id.kind,
          channelId: item.snippet.channelId,
          channelTitle: item.snippet.channelTitle,
          title: item.snippet.title,
          artwork: item.snippet.thumbnails
        }
      })
          
      
      res.status(200).json(findings);
    })
    .catch(function (err) {
      return cb(err)
    })

  

})

module.exports = router