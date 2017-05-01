/**
 * Created by bhavesh on 29-04-2017.
 */
var PouchDB = require('pouchdb');
var db = new PouchDB('NoteProject');

var PouchDB = require('PouchDB');

//Creating the database object
var db = new PouchDB('http://localhost:5984/NoteProject');

//Database information
db.info(function(err, info) {
    if (err) {
        return console.log(err);
    } else {
        console.log(info);
    }
});