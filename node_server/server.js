var express = require('express');
//var MongoClient = require('mongodb').MongoClient;
//var ObjectId    = require('mongodb').ObjectID;

var mysql = require('mysql');
var sql = require("mssql");
var cors = require('cors');
var multer = require('multer');
const DIR = '../public/images/users/'; 
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
  const orderByColumn   = users_columnIndexMapping[orderByColIndex];
  const orderType       = req.body.orderType ? req.body.orderType : 'DESC';
  //Pagination
  const currentPage = typeof req.body.currentPage !== 'undefined' && req.body.currentPage != '' ? req.body.currentPage : 1;
  const recordsPerPage = typeof req.body.recordsPerPage !== 'undefined' && req.body.recordsPerPage != '' ? req.body.recordsPerPage : 100;
  const searchText = typeof req.body.searchText !== 'undefined' && req.body.searchText != '' ? req.body.searchText : '';
  
  let whereArr = []; //       = `1 = 1`;
  if(searchText != '') {
    whereArr.push(`user_first_name LIKE '%${searchText}%' OR user_last_name LIKE '%${searchText}%'`)
  }
  let where = '1 = 1 ';
  if(whereArr.length) { where += 'AND ' + whereArr.join(' AND ');}
  const orderBy   = `ORDER BY ${orderByColumn} ${orderType}`;
  const limit     = `LIMIT ${(currentPage - 1) * recordsPerPage}, ${recordsPerPage}`;
  const sqlSelect = `SELECT * FROM arc_users WHERE ${where} ${orderBy} ${limit}`;
  const sqlCount   = `SELECT COUNT(*) as total_row FROM arc_users WHERE ${where}`;

  console.log(sqlSelect);
//  console.log(sqlCount);
  con.query(sqlSelect, (err, rows) => {
    if (err) throw err;

    con.query(sqlCount, (err, countRows) => {      
      if (err) throw err;
      let resp = {
        status: "success",
        statusMessage: "",
        data: {"rows": rows, "totalRows": countRows[0]['total_row']}
      }
      res.send(resp);
    });
  });
})


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    let fileName = file.originalname.toLowerCase().split(' ').join('-');
    fileName = fileName.replace(/(\.[\w\d_-]+)$/i, '_' + Date.now() + '_$1');
    cb(null, fileName)
  }
});
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

app.post('/user/add', upload.single('photo'), function (req, res) {
  const payload = req.body;
  const filename = req.file.filename;
  console.log(filename)
  const sql = `
  INSERT INTO arc_users (
    user_email ,
    user_password ,
    user_first_name ,
    user_last_name ,
    user_photo ,
    is_active ,
    created_on ,
    updated_on
  ) VALUES (
    '${payload.email}',
    '${payload.user_password}',
    '${payload.first_name}',
    '${payload.last_name}',
    '${filename}',
    ${payload.active ? 1 : 0},
    NOW(),
    NOW()
  )`;
  con.query(sql, (err, rows) => {
    if (err) throw err;
    let resp = {
      status: "success",
      statusMessage: "",
      data: rows
    }
    res.send(resp);
  });
})
app.post('/users/status', function (req, res) {
  console.log(req.body)
  const user_ids = req.body.ids.join();
  const status = req.body.status == 'activate'?1:0
  let sql = `UPDATE arc_users SET is_active='${status}' WHERE user_id IN(${user_ids})`;
  // console.log(sql)
  con.query(sql, (err, rows) => {
    if (err) throw err;
    let resp = {
      status: "success",
      statusMessage: "",
      data: rows
    }
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