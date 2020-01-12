var express = require('express');
//var MongoClient = require('mongodb').MongoClient;
//var ObjectId    = require('mongodb').ObjectID;

var mysql = require('mysql');
var sql = require("mssql");
var cors = require('cors')


var bodyParser = require('body-parser');
var app = express();
var user_collection = '';
app.use(express.static('app'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors())

const users_columnIndexMapping = ["user_first_name", "user_last_name", "user_email", "is_active", "created_on", "updated_on"]
// mysql
var con = mysql.createConnection({ 
  host: "localhost", 
  user: "root", 
  password: "", 
  database: "angular_architecture",
});
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
  });

});

var base = "/app"
app.post('/userList', function (req, res) {
  const orderByColIndex = typeof req.body.orderBy !== 'undefined' && req.body.orderBy != '' ? req.body.orderBy : 0;
  const orderBy = users_columnIndexMapping[orderByColIndex];

  const orderType = req.body.orderType ? req.body.orderType : 'DESC';
  let sql = `
  SELECT * FROM arc_users 
  ORDER BY ${orderBy} ${orderType}
  `;
 
  con.query(sql, (err, rows) => {
    if (err) throw err;
    let resp = {
      status: "success",
      statusMessage: "",
      data: rows
    }
    //console.log(resp)
    res.send(resp);
  });
})

app.post('/users/status', function (req, res) {
  console.log(req.body)
  const user_ids = req.body.ids.join();
  const status = req.body.status == 'activate'?1:0
  let sql = `UPDATE arc_users SET is_active='${status}' WHERE user_id IN(${user_ids})`;
  console.log(sql)
  con.query(sql, (err, rows) => {
    if (err) throw err;
    let resp = {
      status: "success",
      statusMessage: "",
      data: rows
    }
    //console.log(resp)
    res.send(resp);
  });
})

app.post('/users/delete', function (req, res) {
  const user_ids = req.body.join();
  let sql = `DELETE FROM arc_users WHERE user_id IN(${user_ids})`;
  console.log(sql)
  con.query(sql, (err, rows) => {
    if (err) throw err;
    let resp = {
      status: "success",
      statusMessage: "",
      data: rows
    }
    //console.log(resp)
    res.send(resp);
  });
})

// app.post('/saveUser', function (req, res) {

//   if(req.body._id) {
//     user_collection.update(
//       {_id: ObjectId(req.body._id)}, 
//       {$set: 
//         {'name': req.body.name, 'password':req.body.password, 'profession':req.body.profession}
//       }, 
//       {w: 1}, 
//       function(err, records){
//         if(err == null) {
//           res.end(JSON.stringify({'status':'success'}));
//         } else {
//           res.end(JSON.stringify({'status':'error','err':err}));
//         }
//       }
//     );
//   } else {
//     user_collection.insert(req.body, {w: 1}, function(err, records){
//       if(err == null) {
//         //console.log("Record added as "+ JSON.stringify(records) );
//         res.end(JSON.stringify({'status':'success'}));
//       } else {
//         res.end(JSON.stringify({'status':'error','err':err}));
//       }
//     });
//   }
// })


// app.get('/user/:id', function (req, res) {
//    user_collection.find({_id: ObjectId(req.params.id)}).toArray(function(err, results){
//     res.end(JSON.stringify( results[0] ));
//   });
// })

app.put('/user/:id', function (req, res) {
  let set = '';
  const where = `user_id = ${req.params.id}`;
  for(let i in req.body) {
    if(set != '') {
      set += `, ${i} = ${req.body[i]}`;
    } else {
      set += `${i} = ${req.body[i]}`;
    }
  }

  let sql = `UPDATE arc_users SET ${set} WHERE ${where} AND updated_on = NOW()`;
  console.log(sql)
  con.query(sql, (err, rows) => {
    if (err) throw err;
    let resp = {
      status: "success",
      statusMessage: "",
      data: rows
    }
    //console.log(resp)
    res.send(resp);
  });

})

app.delete('/user/:id', function (req, res) {
    let id = req.params.id;
    let sql = `DELETE FROM arc_users WHERE user_id = ${id}`;
  console.log(sql)
  con.query(sql, (err, rows) => {
    if (err) throw err;
    let resp = {
      status: "success",
      statusMessage: "",
      data: rows
    }
    //console.log(resp)
    res.send(resp);
  });
});

// app.get('/*.html', function (req, res) {	
//    res.sendFile( __dirname + base +  "/" + req.params[0] + '.html' );
// });
// app.get('/', function (req, res) {
//    res.sendFile( __dirname +  "/" + 'index.html' );
// })



// MongoClient.connect("mongodb://localhost:27017/mystore", function(err, db) {
//   if(err) { return console.dir(err); }
//   user_collection = db.collection('mystore_users');

//   var server = app.listen(8081, function () {
//      var host = server.address().address
//      var port = server.address().port

//      console.log("Example app listening at http://%s:%s", host, port)
//   });
// });