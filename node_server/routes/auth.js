const jwt = require('jsonwebtoken');
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
    // const pass           = atob(pass);
    // const pass_encrypted = cryptr.encrypt(pass);

    const email = req.body.email;
    const password = req.body.password;
    const sql = `SELECT * FROM arc_users WHERE user_email = '${email}' AND user_password= '${password}'`;
    let response;
    setTimeout(() => { 
        database.query(sql, function (err, results) {
            if (err) throw err;
            if (results != "") {
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
                        if (token) {
                            res.header();
                            response = {
                                status: "success",
                                statusMessage: '',
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
                                statusMessage: 'Could not create token',
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
                    statusMessage: 'User not found',
                    data: {}
                }
                res.send(response);
                res.end();
            }
        });
    }, 5000);
};


exports.register = function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    //handle sql injection
    //setTimeout(() => {
        const sql = `INSERT INTO arc_users (
        user_email ,
        user_password ,
        user_first_name ,
        user_last_name ,
        user_photo ,
        is_active ,       
        updated_on
        )
        VALUES (
        '${email}',  
        '${password}',  
        'fname',  
        'lname', 
        null,
        '1', 
        'NOW()'
        )`;
        console.log(sql);
        database.query(sql, function (err, results) {
            if (err) throw err;
            const response = {
                status: "success",
                statusMessage: '',
                data: results
            }
            res.send(response);
            res.end();
        });
    //}, 5000);
}