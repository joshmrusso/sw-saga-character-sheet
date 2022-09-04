var dbRequests = require('./db');

console.log('server is starting');

var express = require('express');

var app = express();

var server = app.listen(3000, listening);

function listening() {
    console.log("listening. . . ");
}

app.use(express.static('website'));

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

app.get('/search/species/:specie', dbRequests.findSpecies);

app.get('/species/all', dbRequests.sendAllSpecies);

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