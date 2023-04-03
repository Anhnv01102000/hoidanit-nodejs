import bcrypt from 'bcryptjs';
import mysql from 'mysql2';

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'hoidanit-nodejs'
});

var salt = bcrypt.genSaltSync(10);
const hashUserPassword = (userPassword) => {
    let hassPassword = bcrypt.hashSync(userPassword, salt);
    return hassPassword
}

const createNewUser = (email, password, username) => {
    let hashPass = hashUserPassword(password)
    // simple query
    connection.query(
        'INSERT INTO users(email, password, username) VALUES (?,?,?)', [email, hashPass, username],
        function (err, results, fields) {
            if (err) {
                console.log(err);
            }
        }
    );
}

const getListUser = () => {
    let users = []
    connection.query(
        'SELECT*FROM users',
        function (err, results, fields) {
            if (err) {
                console.log(err);
            }
            console.log("Check result: ", results);
        }
    );
}

module.exports = {
    createNewUser, getListUser
}

