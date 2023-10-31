const mysql = require('mysql2/promise');

console.log(process.env.DB_HOST,process.env.DB_USER,process.env.DB_PASSWORD,process.env.DB_NAME, "totem")

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const query = async (sql, values) => {
    const connection = await pool.getConnection();

    try {
        const [results] = await connection.query(sql, values);
        return results;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

module.exports = { query };