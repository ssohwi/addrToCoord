// DB Connect
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.OVS_DB_HOST,
    port: chkIntString(process.env.OVS_DB_PORT),
    user: process.env.OVS_DB_USER,
    name: process.env.OVS_DB_NAME,
    password: process.env.OVS_DB_PASSWORD,
    dateStrings:"date"
});

function chkIntString(val) {
    let iData = parseInt(val, 10)
    if (isNaN(iData)) {
        return val
    }
    if (iData >= 0) {
        return iData
    }
    return false
}
module.exports = pool;