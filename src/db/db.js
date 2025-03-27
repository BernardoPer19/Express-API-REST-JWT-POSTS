import pg from 'pg';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from '../confing.js';


const pool = new pg.Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_DATABASE,
    password: DB_PASSWORD,
    port: DB_PORT,
});

export const connectDB = async () => {
    try {
        await pool.connect();
        console.log("Connected to the database successfully!");
    } catch (error) {
        console.error("Failed to connect to the database:", error.message);
    }
};

export default pool;