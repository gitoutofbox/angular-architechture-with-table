var jwt = require('jsonwebtoken');
var atob = require('atob');
// var Cryptr = require('cryptr'), cryptr = new Cryptr('myTotalySecretKey');
var express = require('express');
var router = express.Router();
const SECRET_KEY = 'mySecretKey'
global.SECRET_KEY = SECRET_KEY;

exports.verifyToken = function (token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        return false;
    }
};

exports.login = function (req, res) {
    // var name=req.body.email;
    // var pass= req.body.password;
    // var dec_pass =atob(pass);
    // var encrypted_pass = cryptr.encrypt(dec_pass);

    const email = req.body.email;
    const password = req.body.password;
    const sql = `SELECT * FROM arc_users WHERE user_email = '${email}' AND user_password= '${password}'`;
    let response;
    database.query(sql, function (err, results) {
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
