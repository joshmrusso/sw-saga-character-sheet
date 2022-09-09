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

function findCharacter(request, response) {
    var characterName = request.params.characterId;
    var reply = "";
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        dbo = client.db("swSaga");
        dbo.collection("characters").find({ _id: mongodb.ObjectId(characterName) }, { projection: {_id: 1, 'character-name': 2, abilities: 3, specie: 4, speed: 5, 'class-level': 6} }).toArray(function (findErr, result) {
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

function addCharacter(request, response) {
    let data = request.body;
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        dbo = client.db("swSaga");
        dbo.collection("characters").insertOne(data, function(err, db) {
            if (err) throw err;
            var reply = {
                "response": "success",
                "data": data,
                "id": db.insertedId
            };
            response.json(reply);
            client.close();
        });
    });
}

function updateCharacter(request, response) {
    let data = request.body;
    let searchId = data['_id'];
    delete data['_id'];
    // console.log(data);
    // var reply = "update data";
    // response.json(data);
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        dbo = client.db("swSaga");
        dbo.collection("characters").replaceOne({ "_id": mongodb.ObjectId(searchId) }, data, function(err, db) {
            if (err) throw err;
            var reply = {
                "response": "success",
                "data": data,
                "id": searchId
            };
            response.json(reply);
            client.close();
        });
    });
}

function deleteCharacter(request, response) {
    var characterId = request.params.characterId;
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        dbo = client.db("swSaga");
        dbo.collection("characters").deleteOne({ "_id": mongodb.ObjectId(characterId) }, function(err, db) {
            if (err) throw err;
            var reply = {
                "response": "success",
                "id": characterId
            };
            response.json(reply);
            client.close();
        });
    });
}

function findLatestCharacters(request, response) {
    var numReturned = parseInt(request.params.latest);
    var reply = "";
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        dbo = client.db("swSaga");
        dbo.collection("characters").find({ }, { projection: {_id: 1, 'character-name': 2} }).sort({_id: -1}).limit(numReturned).toArray(function (findErr, result) {
            if (findErr) throw findErr;
            reply = result;
            response.json(reply);
            client.close();
        });
    });
    console.log("getting last few characters");
}

exports.findSpecies = findSpecies;
exports.sendAllSpecies = sendAllSpecies;
exports.findAllCharacters = findAllCharacters;
exports.findCharacter = findCharacter;
exports.addCharacter = addCharacter;
exports.updateCharacter = updateCharacter;
exports.deleteCharacter = deleteCharacter;
exports.findLatestCharacters = findLatestCharacters;