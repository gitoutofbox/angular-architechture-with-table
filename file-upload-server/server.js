var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser');
var app = express();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })


app.use(express.static('app'));
// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors())



var server = app.listen(8082, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("File upload app listening at http://%s:%s", host, port)
});


app.post('/upload',upload.single('avatar'),  (req, res) => {
  conso(req);
})

