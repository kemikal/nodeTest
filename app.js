const express = require('express');

const app = express();
const port=process.env.PORT || 3000;
const fs = require('fs');

app.use(express.static('static'));

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/info', (req, res) => res.send('Info page'));

app.get("/countrys", (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        
            fs.readFile('countrys.json', (err, json) => {
                    let obj = JSON.parse(json);
                    res.json(obj);
                    //res.json();
            });
   });

   app.get("/citys", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
        fs.readFile('citys.json', (err, json) => {
                let obj = JSON.parse(json);
                res.json(obj);
                //res.json();
        });
});

app.get('*', function(req, res){
    res.sendFile('static/404.html', { root: __dirname });
  }); 

app.listen(port, () => console.log(`Example app listening on port ${port}!`));