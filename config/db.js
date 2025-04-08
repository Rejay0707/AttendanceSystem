// db.js
import pkg from 'pg';
const { Pool } = pkg;

// PostgreSQL connection
const pool = new Pool({
    user: 'postgres', //PostgreSQL username
    host: 'localhost',
    database: 'attendanceDB', //database name
    password: 'Rejaysobis@7397702155', //PostgreSQL password
    port: 5432,
});

export default pool;