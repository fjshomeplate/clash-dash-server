const express = require("express")
const axios = require("axios")
const app = express();
const cors = require('cors'); 

function clashData(tag,url) {
  // create a promise for the axios request
  tag = tag.replace("#", "")
  const promise = axios.get('https://api.clashroyale.com/v1/players/%23'+tag+'/'+url, {
    headers: {
        "Accept":"application/json", "authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjdjMWZjODE0LWIxZWItNDJmNy1iZmI0LTk0MGVjYjNiYWFlOSIsImlhdCI6MTYyODQ0ODYzMCwic3ViIjoiZGV2ZWxvcGVyLzFjZWQ4NmZiLTAwZmUtNGE4ZC0yMzAxLWZlMWQ2MTg4NjVjZiIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIyNC45MS45MC4yMDEiXSwidHlwZSI6ImNsaWVudCJ9XX0.R7WzAGXdQvlSufemAyTJ7dCsC-Fj6Ka4Gy9amnH_SU94jmIzMmHdx5ixK_EeP4Wvs-T4BR0OepG7VhSvq0mkSQ"
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
// app.get('/clash/:playerID', (req, res) => {
//   return res.send('Received a GET HTTP method');
// });
 

app.listen(8081, function(err){
  console.log("Server listening on 8081");
})
