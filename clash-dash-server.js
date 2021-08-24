const express = require("express")
const axios = require("axios")
const app = express();
const cors = require('cors'); 

function clashData(tag,url) {
  // create a promise for the axios request
  tag = tag.replace("#", "")
  const promise = axios.get('https://api.clashroyale.com/v1/players/%23'+tag+'/'+url, {
    headers: {
        "Accept":"application/json", "authorization":"Bearer _key"
    },
    params: {
      "limit":5
    }
  })

  // using .then, create a new promise which extracts the data
  const dataPromise = promise.then((response) => response.data)

  // return it
  return dataPromise
}
function playerData(tag) {
  // create a promise for the axios request
  tag = tag.replace("#", "")
  const promise = axios.get('https://api.clashroyale.com/v1/players/%23'+tag+'/', {
    headers: {
        "Accept":"application/json", "authorization":"Bearer _key"
    },
    params: {
      "limit":5
    }
  })

  // using .then, create a new promise which extracts the data
  const dataPromise = promise.then((response) => response.data)

  // return it
  return dataPromise
}

let corsOptions = {
  origin: 'http://localhost:8080'
};
// now we can use that data from the outside!
app.get("/clash/:playerID/:url", function(req, res) {
  clashData(req.params.playerID, req.params.url)
  .then(data => {
      return res.send(data)
  })
  .catch(err => console.log(err))
})
// player data
app.get("/clash/:playerID/pi", function(req, res) {
  playerData(req.params.playerID, req.params.url)
  .then(data => {
      return res.send(data)
  })
  .catch(err => console.log(err))
})
// app.get('/clash/:playerID', (req, res) => {
//   return res.send('Received a GET HTTP method');
// });
 

app.listen(8081, function(err){
  console.log("Server listening on 8081");
})
