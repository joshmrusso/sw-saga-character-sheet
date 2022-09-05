const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017";

function findSpecies(request, response) {
    var specie = request.params.specie;
    var reply = "";
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        dbo = client.db("swSaga");
        dbo.collection("species").find({ "specieName":specie }, { projection: {_id: 0, specieName: 1, displayName: 2} }).toArray(function (findErr, result) {
            if (findErr) throw findErr;
            reply = result;
            response.json(reply);
            client.close();
        });
    });
    console.log("searching for species");
}

function sendAllSpecies(request, response) {
    var reply = "";
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        dbo = client.db("swSaga");
        dbo.collection("species").find({ }, { projection: {_id: 0, specieName: 1, displayName: 2} }).toArray(function (findErr, result) {
            if (findErr) throw findErr;
            reply = result;
            response.json(reply);
            client.close();
        });
    });
}

function findAllCharacters(request, response) {
    var reply = "";
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        dbo = client.db("swSaga");
        dbo.collection("characters").find({ }, { projection: {_id: 1, 'character-name': 2, abilities: 3, specie: 4, speed: 5, 'class-level': 6} }).toArray(function (findErr, result) {
            if (findErr) throw findErr;
            reply = result;
            response.json(reply);
            client.close();
        });
    });
}

exports.findSpecies = findSpecies;
exports.sendAllSpecies = sendAllSpecies;
exports.findAllCharacters = findAllCharacters;