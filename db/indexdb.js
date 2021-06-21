import { default as util } from 'util';
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
    const client = await pool.connect();
    console.log(client);
    client.release();
})();

export default pool;