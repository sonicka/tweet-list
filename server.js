
let express = require('express');
let cors = require('cors');
let app = express();
/*
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
*/

app.get('/', function (request, response) {
    let html = '<h1>hello</h1>';
    response.send(html);
});

let PORT = 3000;
app.listen(PORT, function () {
    console.log('http://localhost:' + PORT);
});