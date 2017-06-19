const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/ariio';

var mongo = {

    db: null,

    collection: null,

    connect: function() {

      MongoClient.connect(url, function(err, db) {
          console.log("Connected to DB");
          mongo.db = db;
          mongo.collection = db.collection('data');
        });
    }
};

module.exports = mongo;
