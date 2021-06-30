import dbcn from '../db/indexdb.js';

/****************************************
 ********** MODEL FOR SUPPLIER **********/
 export async function selectAllSuppliers() {
    const query = 'SELECT * FROM supplier;';
    let res;
    try {
        res = await dbcn.query(query);
        return res.rows;
    } catch (error) {
        console.log('Error selectAllSuppliers: ', error);
    }
}

export async function selectSupplierById(id) {
    const query = 'SELECT * FROM supplier WHERE supplierid = $1;';
    const val = [id];
    let res;
    try {
        res = await dbcn.query(query, val);
        return res.rows[0];
    } catch (error) {
        console.log('Error selectSupplierById: ', error);
    }
}