import dbcn from '../db/indexdb.js';

/*************************************
 ********** MODEL FOR STORE **********/
 export async function selectAllStore() {
    const query = 'SELECT * FROM store;';
    let res;
    try {
        res = await dbcn.query(query);
        return res.rows;
    } catch (error) {
        console.log('Error selectAllStore: ', error);
    }
}

export async function selectStoreById(id) {
    const query = 'SELECT * FROM store WHERE storeid = $1;';
    const val = [id];
    let res;
    try {
        res = await dbcn.query(query, val);
        return res.rows[0];
    } catch (error) {
        console.log('Error selecStoreById:', error);
    }
}