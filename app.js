const express = require('express');

const app = express();
const port=process.env.PORT || 3000;
const fs = require('fs');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use(express.static('static'));

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/info', (req, res) => res.send('Info page'));

app.get("/countrys", (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        
            fs.readFile('countrys.json', (err, json) => {
                    let obj = JSON.parse(json);
                    res.json(obj);
            });
   });

   app.get("/citys", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
        fs.readFile('citys.json', (err, json) => {
                let obj = JSON.parse(json);
                res.json(obj);
        });
});

app.get("/customers", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
        fs.readFile('newCustomer.json', (err, json) => {
                let obj = JSON.parse(json);
                res.json(obj);
        });
});

app.get('/add', function(req, res){

    fs.readFile('newCustomer.json', (err, json) => {
        let customer = JSON.parse(json);
        //res.json(customer);

        const newCustomer = {
            name: "Newbie Co.",
            order_count: 0,
            address: "Po Box City",
        }

        customer.push(newCustomer);

        const jsonString = JSON.stringify(customer, null, 2)
        fs.writeFile('./newCustomer.json', jsonString, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })

    });

    res.send('New Add!');
  }); 

app.get('/form', function(req, res){
    res.sendFile('form.html', { root: __dirname });
  }); 

app.get('/newCustomer', function (req, res) {
    var html='';
    html +="<body>";
    html += "<form action='/addCustomer'  method='post' name='form1'>";
    html += "Name: <input type= 'text' name='name'><br/>";
    html += "Antal: <input type='text' name='antal'><br/>";
    html += "Address: <input type='text' name='address'><br/>";
    html += "<input type='submit' value='submit'><br/>";
    html += "</form>";
    html += "</body>";
    res.send(html);
  });
   
app.post('/addCustomer', urlencodedParser, function (req, res){

    fs.readFile('newCustomer.json', (err, json) => {
        let customer = JSON.parse(json);
        //res.json(customer);

        var reply='';
        reply += "<br/>Namm: " + req.body.name;
        reply += "<br/>Antal: " + req.body.antal; 
        reply += "<br/>Adress: " + req.body.address;
       // res.send(reply);

        const newCustomer = {
            name: req.body.name,
            order_count: Number(req.body.antal),
            address: req.body.address,
        }

        customer.push(newCustomer);

        const jsonString = JSON.stringify(customer, null, 2)
        fs.writeFile('./newCustomer.json', jsonString, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })

    });

    res.send('New Add!');
  }); 

app.get('/newCountry', function (req, res) {
    var html='';
    html +="<body>";
    html += "<form action='/addCountry'  method='post' name='form1'>";
    html += "Name: <input type= 'text' name='name'><br/>";
    html += "<input type='submit' value='submit'><br/>";
    html += "</form>";
    html += "</body>";
    res.send(html);
  });

app.post('/addCountry', urlencodedParser, function (req, res){

    fs.readFile('countrys.json', (err, json) => {
        let countrys = JSON.parse(json);
        //res.json(customer);

        var reply='';
        reply += "<br/>Namm: " + req.body.name;
       // res.send(reply);

        const newCountry = {
            id: countrys.length +1,
            name: req.body.name
        }

        countrys.push(newCountry);

        const jsonString = JSON.stringify(countrys, null, 2)
        fs.writeFile('countrys.json', jsonString, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })

    });

    res.send('New Add!');
  }); 

app.get('*', function(req, res){
    res.sendFile('static/404.html', { root: __dirname });
  }); 

app.listen(port, () => console.log(`Example app listening on port ${port}!`));