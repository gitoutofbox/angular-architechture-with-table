var express = require('express');
//var MongoClient = require('mongodb').MongoClient;
//var ObjectId    = require('mongodb').ObjectID;

var mysql = require('mysql');
var sql = require("mssql");
var cors = require('cors');
var multer = require('multer');
const DIR = '../public/images/users/'; 
var bodyParser = require('body-parser');

let user = require('./routes/user')
var router=express.Router();
var app = express();
var user_collection = '';
app.use(express.static('app'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors())

const users_columnIndexMapping = ["user_first_name", "user_last_name", "user_email", "is_active", "created_on", "updated_on"]
global.users_columnIndexMapping = users_columnIndexMapping;
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
global.db = con;

// router.use(function(req,res,next){
//   var token= req.body.Authtoken || req.headers['Authtoken'];
//   console.log('token', token)
//   if(token){
//       jwt.verify(token,process.env.SECRET_KEY,function(err,ress){
//           if(err){
//               res.status(500).send('Token Invalid');
//           }else{
//               next();
//           }
//       })
//   }else{
//       res.send('Please send a token')
//   }
// })

app.post('/user/login', user.login);


app.post('/userList', user.userList);


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    let fileName = file.originalname.toLowerCase().split(' ').join('-');
    fileName = fileName.replace(/(\.[\w\d_-]+)$/i, '_' + Date.now() + '$1');
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
      req.fileTypeValidationError = 'Only .png, .jpg and .jpeg format allowed!'
      //cb(null, false);
      return cb(null, false, req.fileTypeValidationError);
    }
  }
});

app.post('/user/add', upload.single('photo'), function (req, res) {
  if(req.fileTypeValidationError) {
    let resp = {
      status: "fail",
      statusMessage: req.fileTypeValidationError,
      data: []
    }
    res.send(resp);
    return false;
  }
  
  const payload = req.body;
  const filename = req.file.filename;
  
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

app.get('/email/get/:text', function (req, res) {
  const text = req.params.text;
  setTimeout(()=>{
    //res.send({status: "succes"});
    const sql = `SELECT user_id, user_email FROM arc_users WHERE user_email LIKE '%${text}%'`;
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
    })
    }, 5000)
});
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
});

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