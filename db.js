
var express = require('express')
var app = express()
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var bodyparser = require('body-parser');
var obj = require('./public/js/product');
mongoose.connect('mongodb://localhost:27017/flikart');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    'extended': false
}));
app.use(express.static(__dirname + '/public'));
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
app.get('/', function (req, res) {
    res.sendFile(__dirname  + '/public/navigation.html');
});

app.post('/data', function (req, res) {

    var data = {
        name :req.body.name,
        type: req.body.type,
        cost : req.body.cost,
        supplier : req.body.supplier,
        avail : req.body.avail


    }
obj.addDonor(data, function(err, data) {
        if (data) {
           response ="Data inserted succesfully"
            
            res.send(response);
        } else {
           error = {
                "error": "Sorry insertion failed"
            }
            res.json(error);
            console.log(err);
        }
    });

});
    
app.post('/retrieve', function (req, res) {

var ret=req.body.name;

obj.getDonorByField(ret, function(err, ret) {
        if (ret) {
           response = "Data retrieved succesfully"
            res.send(ret);
        } else {
           error = {
                "error": "Sorry retrieve failed"
            }
            res.json(error);
            console.log(err);
        }
    });

});

app.post('/delete', function(req, res) {
    var name = req.body.name;
    obj.removeDonor(name, function(err, name) {
        if (name) {
            response ="Student Record has been deleted!"
            
            res.send(response);
        } else {
            error = {
                "error": "Please check entered ID"
            }
            res.json(error);
            console.log(err);
        }
    });
});
app.post('/update', function(req, res) {
    var name = req.body.name;
    var data = ({
        name :req.body.name,
        type: req.body.type,
        cost : req.body.cost,
        supplier : req.body.supplier,
        avail : req.body.avail
    });
    //Calls the function from student.js model
    obj.updateDonor(name,data, {}, function(err, product) {
        if (product) {
          response = "Product Details have been updated!"
            res.send(response);
            console.log(data);
        } else {
          error = "Sorry update failed"
            
            res.json(error);
        }
        
            console.log(err);
    });
});

app.post('/entiredata', function(req, res) {
    obj.getDetails(function(err,dt) {
        console.log(dt);
        if (dt) {
           response = {
                "result": dt
            }
            res.send(dt);
        } else {
           error = {
                "error": "Sorry retrieve failed"
            }
            res.json(error);
        }
    });
});

app.listen(3000);
