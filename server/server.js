const express = require('express');
const pg = require("pg");
const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var conString = 'postgres://prweb:admin@localhost:5432/prweb';
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/listAuctions', function (req, res) {
    var tableReq = 'SELECT item.*,name FROM item LEFT OUTER JOIN Category ON(item.category_id=category.id) ORDER BY item.id';
    var values = [];
    listAll(req, res, tableReq, values);
});

app.get('/listCategories', function (req, res) {
    var tableReq = 'SELECT distinct name from category where name is not null';
    var values = [];
    listAll(req, res, tableReq, values);
});

app.get('/getCategory/:id', function (req, res) {
    var tableReq = 'SELECT * FROM Category WHERE id=$1';
    var values = [req.params.id];
    listAll(req, res, tableReq, values);
});

function listAll(req, res, tableReq, values) {
    var client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) { // cannot connect
            console.error('could not connect ot postgres', err);
            res.status(500).end('Database connect error!');
        }
        else {
            client.query(tableReq, values, function (err, result) {
                if (err) {
                    // Request fails
                    console.error('bad request', err);
                    res.status(500).end('Bad request error');
                } else {
                    // Build result
                    var items = [];
                    for (var ind in result.rows) {
                        items.push(result.rows[ind]);
                    }
                    jsonString = JSON.stringify(items);
                    res.setHeader('Content-Type', 'application/json');
                    res.send(jsonString);
                }
                client.end();
            });
        }

    })
}

app.post('/addAuctions', function (req, res) {
    var title = req.body.title;
    var author = req.body.author;
    var body = req.body.body;
    var category = req.body.category;
    
});

function addAuction(req, res, tableReq, values) {
    var client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            console.error('could not connect ot postgres', err);
            res.status(500).end('Database connect error!');
        } else {
            // INSERT data and get id in return
            var theQuery;
            var values;
            if (category > 0) {
                theQuery = 'INSERT INTO item(title, author, body, category_id) VALUES ($1, $2, $3, $4) RETURNING id';
                values = [title, author, body, category];
            } else {
                theQuery = 'INSERT INTO item(title, author, body) VALUES ($1, $2, $3) RETURNING id';
                values = [title, author, body];
            }
            client.query(theQuery, values, function (err, result) {
                if (err) {
                    // Request fails
                    console.error('bad request', err);
                    res.status(500).end('Bad request error');
                } else {
                    var id = result.rows[0]['id'];
                    var tableReq = 'SELECT item.*,name FROM item LEFT OUTER JOIN Category ON(item.category_id=category.id) WHERE item.id=$1';
                    var values = [id];
                    listAll(req, res, tableReq, values);
                }
            });
        }
    });
}


app.listen(8000, () => {
    console.log('Server started !')
});

