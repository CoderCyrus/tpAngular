const express = require('express');
const pg = require("pg");
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var conString = 'postgres://prweb:admin@localhost:5432/database';

app.get('/',function(req, res) {
   var client = new pg.Client(conString);
   client.connect(function(err){
       if (err){ // cannot connect
        console.error('could not connect ot postgres',err);
        res.status(500).end('Database connect error!');}
        else {
            client.query('SELECT * FROM item ORDER BY id', function(err, result) {
                if(err) {
                // Request fails
                console.error('bad request',err);
                res.status(500).end('Bad request error');
                } else{
                    // Build result
                    var items = [];
                    for(var ind in result.rows){
                        items.push(result.rows[ind]);
                    }
                    jsonString = JSON.stringify(items);
                    res.setHeader('Content');
                }
            })
        }
      
   })
});

app.listen(8000, () => {
    console.log('Server started !')
});