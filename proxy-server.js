const express = require('express');
const cors = require('cors');
const axios =require( 'axios');
const bodyParser = require('body-parser')
 

const app = express();
const port = 3000;


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.post('/data', (req, res) => {

try {
  const { url } = req.body;
  axios.get(url) .then(response => {
      res.send( response.data)
  })
} catch (error) {
  console.log(error);
}
   
});

app.post('/details', async(req, res) => {

  try {
    const { url,value } = req.body;
 
    const firstResponse = await axios.get(url+value,{ maxRedirects: 10 });
   
    if (firstResponse.status === 500) {
      // const secondResponse = await axios.get(url+firstResponse.data["search_id"]);
      // res.send(secondResponse.data);
      res.send({"msg":"poi oomb"});
    } else {
      res.send(firstResponse.data);
    }
  } catch (error) {
   
    res.send(error)
  }
     
  });








app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
