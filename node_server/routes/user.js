const auth = require('./auth')
const users_columnIndexMapping = ["user_first_name", "user_last_name", "user_email", "is_active", "created_on", "updated_on"];
exports.userList = function (req, res) {
    var token = req.body.authtoken || req.headers['authtoken'];
    if (!auth.verifyToken(token, SECRET_KEY)) {
        return res.status(401).send({
            status: "fail",
            statusMessage: "Invalid token",
            data: {}
        });
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
    database.query(sqlSelect, (err, rows) => {
        if (err) throw err;

        database.query(sqlCount, (err, countRows) => {
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

exports.emailCheck = function(req, res) {
    const email = req.body.email || req.headers['email'];
    const sql = `SELECT COUNT(*) AS total_row FROM arc_users where user_email ='${email}' `;
    console.log(sql);
    database.query(sql, (err, countRows) => {
        if (err) throw err;
        let resp = {
            status: "success",
            statusMessage: "",
            data: { 
                isDuplicate: countRows[0].total_row > 0 ? true : false
             }
        }
        res.send(resp);
    });
}