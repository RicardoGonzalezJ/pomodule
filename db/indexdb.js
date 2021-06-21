import  { default as pg }  from 'pg';
const { Pool } = pg;

const pool = new Pool({
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});

(async () => {
    try {
        const client = await pool.connect();
        console.log(`connected to ${client.database}`);
        client.release();
    } catch (error) {
        console.log(error);
    }
    
})();

export default pool;