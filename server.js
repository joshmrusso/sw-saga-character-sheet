var dbRequests = require('./db');

console.log('server is starting');

var express = require('express');
const cors = require("cors");

var app = express();

var server = app.listen(3001, listening);

const whitelist = ['http://localhost:3000', 'http://localhost:3001'];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORES"));
        }
    },
    credentials: true,
}
app.use(cors(corsOptions));

function listening() {
    console.log("listening. . . ");
}

app.use(express.static('website'));
app.use(express.json());

// app.get('/add/:word/:score?', addWord);

// function addWord(request, response) {
//     var data = request.params;
//     var word = data.word;
//     var score = Number(data.score);
//     if (!score) {
//         var reply = {
//             "word": word,
//             "score": score,
//             "status": "failure"
//         };
//         response.send(reply);
//     } else {
//         words[word] = score;
//         var data = JSON.stringify(words, null, 2);
//         fs.writeFile('words.json', data, finished);

//         function finished(err) {
//             // console.log('all set.');
//         }
//         var reply = {
//             "word": word,
//             "score": score,
//             "status": "success"
//         };
//         response.send(reply);
//     }
// }

// species requests for species types
app.get('/species/all', dbRequests.sendAllSpecies);
app.get('/species/:specie', dbRequests.findSpecies);

// classes searchs
app.get('/classes', dbRequests.sendAllClasses);

// character searchs
app.get('/characters/all/:latest', dbRequests.findLatestCharacters);
app.get('/characters', dbRequests.findAllCharacters);
app.get('/characters/:characterId', dbRequests.findCharacter);
app.post('/characters', dbRequests.addCharacter);
app.put('/characters/:characterId', dbRequests.updateCharacter);
app.delete('/characters/:characterId', dbRequests.deleteCharacter);

// app.get('/search/:word', searchWord);

// function searchWord(request, response) {
//     var word = request.params.word;
//     var reply = "";
//     if (words[word]) {
//         reply = {
//             "status": "found",
//             "word": word,
//             "score": words[word]
//         }
//     } else {
//         reply = {
//             "status": "not found",
//             "word": word
//         }
//     }
//     response.send(reply);
// }