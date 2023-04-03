import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';


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

const getListUser = async () => {
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'hoidanit-nodejs', Promise: bluebird });

    let users = []
    // return connection.query(
    //     'SELECT*FROM users',
    //     function (err, results, fields) {
    //         if (err) {
    //             console.log(err);
    //             return users
    //         }
    //         users = results
    //         return results
    //     }
    // );

    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users');
        return rows
    } catch (error) {
        console.log(">>> Check error: ", error);
    }

}

module.exports = {
    createNewUser, getListUser
}

