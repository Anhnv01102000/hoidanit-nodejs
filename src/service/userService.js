import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';


var salt = bcrypt.genSaltSync(10);
const hashUserPassword = (userPassword) => {
    let hassPassword = bcrypt.hashSync(userPassword, salt);
    return hassPassword
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password)
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'hoidanit-nodejs', Promise: bluebird });
    try {
        const [rows, fields] =
            await connection.execute('INSERT INTO users(email, password, username) VALUES (?,?,?)',
                [email, hashPass, username]);
    } catch (error) {
        console.log(">>>Check error: ", error);
    }
}

const getListUser = async () => {
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'hoidanit-nodejs', Promise: bluebird });

    let users = []

    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users');
        return rows
    } catch (error) {
        console.log(">>> Check error: ", error);
    }
}

const deleteUser = async (id) => {
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'hoidanit-nodejs', Promise: bluebird });

    try {
        const [rows, fields] = await connection.execute('DELETE FROM users WHERE id=?', [id]);
    } catch (error) {
        console.log(">>> Check error: ", error);
    }
}

const getUserById = async (id) => {
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'hoidanit-nodejs', Promise: bluebird });

    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users WHERE id=?', [id]);
        return rows
    } catch (error) {
        console.log(">>> Check error: ", error);
    }
}

const updateUser = async (email, username, id) => {
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'hoidanit-nodejs', Promise: bluebird });
    try {
        const [rows, fields] =
            await connection.execute('UPDATE users SET email=?, username=? WHERE id=?',
                [email, username, id]);
    } catch (error) {
        console.log(">>>Check error: ", error);
    }
}

module.exports = {
    createNewUser, getListUser, deleteUser, getUserById, updateUser
}

