var jwt = require('jsonwebtoken');
var atob = require('atob');
// var Cryptr = require('cryptr'),
//     cryptr = new Cryptr('myTotalySecretKey');
var express = require('express');
var router = express.Router();
const SECRET_KEY = 'mySecretKey'
const verifyToken = function (token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        return false;
    }
}

// app.use(function (err, req, res, next) {
//     if (err.name === 'UnauthorizedError') { 
//       res.send(401, 'invalid token...');
//     }
//   });

exports.login = function (req, res) {
    // var name=req.body.email;
    // var pass= req.body.password;
    // var dec_pass =atob(pass);
    // var encrypted_pass = cryptr.encrypt(dec_pass);

    const email = req.body.email;
    const password = req.body.password;
    const sql = `SELECT * FROM arc_users WHERE user_email = '${email}' AND user_password= '${password}'`;
    let response;
    db.query(sql, function (err, results) {
        if (err) throw err;
        if (results != "") {
            // console.log(JSON.stringify(results));
            var data = JSON.stringify(results);
            var secret = SECRET_KEY;
            var now = Math.floor(Date.now() / 1000),
                iat = (now - 10),
                expiresIn = 3600000,
                expr = (now + expiresIn),
                notBefore = (now - 10),
                jwtId = Math.random().toString(36).substring(7);
            var payload = {
                iat: iat,
                jwtid: jwtId,
                audience: 'TEST',
                data: data
            };
            jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: expiresIn }, function (err, token) {
                if (err) {
                    console.log('Error occurred while generating token');
                    console.log(err);
                    throw err;
                    //    return false;
                } else {
                    if (token != false) {
                        res.header();
                        response = {
                            status: "success",
                            statusMessage: ``,
                            data: {
                                userInfo: results[0],
                                authToken: token
                            }
                        }
                        res.send(response);
                        res.end();
                    }
                    else {
                        response = {
                            status: "fail",
                            statusMessage: `Could not create token`,
                            data: {}
                        }
                        res.send(response);
                        res.end();
                    }
                }
            });

        }
        else if (results == "") {
            response = {
                status: "fail",
                statusMessage: `User not found`,
                data: {}
            }
            res.send(response);
            res.end();
        }
    });
};




exports.userList = function (req, res) {
    var token = req.body.authtoken || req.headers['authtoken'];
    if (!verifyToken(token, SECRET_KEY)) {
        
        // res.send(401, 'missing authorization header');
    //   res.send(401);

        res.send({
            status: "fail",
            statusMessage: "Invalid token",
            data: {}
        });
        res.end();
    }
    const orderByColIndex = typeof req.body.orderBy !== 'undefined' && req.body.orderBy != '' ? req.body.orderBy : 0;
    const orderByColumn = users_columnIndexMapping[orderByColIndex];
    const orderType = req.body.orderType ? req.body.orderType : 'DESC';
    //Pagination
    const currentPage = typeof req.body.currentPage !== 'undefined' && req.body.currentPage != '' ? req.body.currentPage : 1;
    const recordsPerPage = typeof req.body.recordsPerPage !== 'undefined' && req.body.recordsPerPage != '' ? req.body.recordsPerPage : 100;
    const searchText = typeof req.body.searchText !== 'undefined' && req.body.searchText != '' ? req.body.searchText : '';

    let whereArr = []; //       = `1 = 1`;
    if (searchText != '') {
        whereArr.push(`user_first_name LIKE '%${searchText}%' OR user_last_name LIKE '%${searchText}%'`)
    }
    let where = '1 = 1 ';
    if (whereArr.length) { where += 'AND ' + whereArr.join(' AND '); }
    const orderBy = `ORDER BY ${orderByColumn} ${orderType}`;
    const limit = `LIMIT ${(currentPage - 1) * recordsPerPage}, ${recordsPerPage}`;
    const sqlSelect = `SELECT * FROM arc_users WHERE ${where} ${orderBy} ${limit}`;
    const sqlCount = `SELECT COUNT(*) as total_row FROM arc_users WHERE ${where}`;

    // console.log(sqlSelect);
    //  console.log(sqlCount);
    db.query(sqlSelect, (err, rows) => {
        if (err) throw err;

        db.query(sqlCount, (err, countRows) => {
            if (err) throw err;
            let resp = {
                status: "success",
                statusMessage: "",
                data: { "rows": rows, "totalRows": countRows[0]['total_row'] }
            }
            res.send(resp);
        });
    });
};