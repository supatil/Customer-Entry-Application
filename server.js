var express = require('express'),
    http = require('http'),
    path = require('path'),
    fs = require('fs'),
    bodyParser = require('body-parser');

var app = module.exports = express();
app.set('port', process.env.PORT || 1337);
app.use(express.static(path.join(__dirname, '/app')));
app.set('views', __dirname + '/app');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

var customerData = [], obj;
app.get('/customers', function (req, res) {

    if (fs.existsSync('data.json')) {
        fs.readFile('data.json', function (err, data) {
            if (err) throw err;
            obj = JSON.parse(data);
            customerData = obj;
            res.send(customerData);
        });

    }
});

app.get('/app', function (req, res) {
    res.render('index.html');
});

app.post('/customers', function (req, res) {
    var customers = [], newData;

    if (fs.existsSync('data.json')) {
        fs.readFile('data.json', function (err, data) {
            if (err) throw err;
            customers = JSON.parse(data);
            req.body.id = customers.length + 1;
            customers.push(req.body);
            newData = JSON.stringify(customers);
            fs.writeFile('data.json', newData);
        });

    } else {
        req.body.id = 1;
        var item = JSON.stringify(req.body);
        fs.writeFile('data.json', '[' + item + ']');
    }

    return res.send('/customers');

});

app.get('/customers/:id', function (req, res) {
    var customers;
    var id = parseInt(req.params.id, 10);

    fs.readFile('data.json', function (err, data) {
        if (err) throw err;
        customers = JSON.parse(data);
        for (var i = 0; i < customers.length; i++) {
            if (customers[i].id === id) {
                var result = customers[i];
            }
        }
        if (!result) {
            res.send("error");
        } else {
            res.send(result);
        }
    });
});


app.put('/customers/:id', function (req, res) {
    var id = parseInt(req.params.id, 10);
    var customerData = req.body;

    fs.readFile('data.json', function (err, data) {
        if (err) throw err;
        var customers = JSON.parse(data);
        for (var i = 0; i < customers.length; i++) {
            if (customers[i].id === id) {
                customers[i] = customerData;
            }
        }
        fs.writeFile('data.json', JSON.stringify(customers));
        if (!customerData) {
            res.send("error");
        } else {
            res.send(customers);
        }
    });
});

app.delete('/customers', function (req, res) {
    var customerData = req.body;

    fs.readFile('data.json', function (err, data) {
        if (err) throw err;
        var customers = JSON.parse(data);
        if (customerData.length > 1) {
            for (var i = 0; i < customers.length; i++) {
                customers = customerData;
            }
        } else {
            customers = customerData;
        }
        fs.writeFile('data.json', JSON.stringify(customers));
        if (!customerData) {
            res.send("error");
        } else {
            res.send(customers);
        }
    });
});