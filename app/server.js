var app = require('express')();
var http = require('http').Server(app);
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var PouchDB = require('PouchDB');
PouchDB.plugin(require('pouchdb-find'));
var db = new PouchDB('http://localhost:5984/NoteProject');
app.use(bodyParser.json());

app.get('/', function (req, res) {
    app.use(express.static(__dirname + '/../webapp/extjs'));
    res.sendFile(path.join(__dirname, '/../webapp/extjs', 'app.html'));
});
app.post('/savedata/online', function (req, res, param) {
    var doc2 = {
        "_id": req.body.noteName,
        "userId": req.body.userId,
        "name": req.body.noteName,
        "timeStamp": req.body.timeStamp,
        "dataStore": req.body.dataStore,
    };
    db.put(doc2).then(function () {
        return db.get(req.body.userId.toString() + req.body.timeStamp.toString());
    }).then(function (doc) {
        console.log(JSON.stringify(doc));

        //res.send('Data Save Sucessfully .');
    }).catch(function (err) {
        console.log(err);
        res.send(err.error);
    });
    res.send('Data Save Sucessfully .');

});
app.get('/viewdata', function (req, res) {
    var userId = req.query.userId;
    db.get(userId, function (error, doc23) {
        if (error) {
            console.log('oh noes! we got an error' + error.error);
        } else {
            console.log(JSON.stringify(doc23));
            res.send(JSON.stringify(doc23));
            // okay, doc contains our document
        }
    });
    // res.send(anObject);
    //res.sendFile(path.join(__dirname, '/../webapp/extjs', 'app.html'));
});
app.get('/loaddata', function (req, res) {
    var userId = req.query.userId;
    db.createIndex({
        index: {fields: ["userId"]},
    }).then(function () {
        return db.find({
            selector: {userId: userId},
        });
    }).then(function (result) {
        // handle result
        console.log(JSON.stringify(result));
        res.send(JSON.stringify(result));
    }).catch(function (err) {
        console.log(err);
    });
});
app.get('/deletedata', function (req, res) {
    var userId = req.query.userId;
    var _id=req.query._id;
    db.get(_id).then(function(doc) {
        return db.remove(doc);
    }).then(function (result) {
        res.send('Deleted successfully');
    }).catch(function (err) {
        console.log(err);
    });
});
app.get('/about', function (req, res) {
    res.sendFile(path.join(__dirname + '/about.html'));
});

app.get('/sitemap', function (req, res) {

    res.sendFile(path.join(__dirname + '/sitemap.html'));
});

app.listen(3000);

console.log("Running at Port 3000");
