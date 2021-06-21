import dbcn from '../db/indexdb.js';

export async function displayItems() {
    const query = 'SELECT * FROM item;';
    try {
        const res = await dbcn.query(query);
        return res.rows;
    } catch (error) {
        console.log(error.stack);
    }    
}
