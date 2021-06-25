import dbcn from '../db/indexdb.js';

/***********************************
 ********* MODEL FOR ITEM *********/
export async function displayItems() {
    const query = 'SELECT * FROM item;';
    try {
        const res = await dbcn.query(query);
        return res.rows;
    } catch (error) {
        console.log(error.stack);
    }    
}

export async function selectItemById(id) {
    const query = 'SELECT * FROM item WHERE itemid = $1;';
    const value = [id];
    let res;
    try {
        res = await dbcn.query(query, value);
        return res.rows[0];
    } catch (error) {
        console.log(error.stack);
    } 
}

export async function insertNewItem(item) {
    const query = `INSERT INTO item (itemid, itemname, item_unit_price)
                        VALUES ($1, $2, $3);`;
    const value = [item.id, item.name, item.unit_price];
    let res;
    try {
        res = await dbcn.query(query, value);
        return res;
    } catch (error) {
        // console.log('this is insertnewitem error: ', error.message);
        return error;
    }
}

export async function deleteItem(id) {
    const query = 'DELETE FROM item WHERE itemid = $1;';
    const value = [id];
    try {
        const res = await dbcn.query(query, value);
        return res;
    } catch (error) {
        console.log('deleteItem Error: ', error.stack);
    }
}

/*************************************
 ******** MODEL FOR EMPLOYEE *********/
 export async function selectAllEmployee(){
    const query = 'SELECT * FROM employee;';
    let res;
    try {
        res = await dbcn.query(query);
        console.log(res)
        return res;        
    } catch (error) {
        console.log('error employee selectAllEmployee', error);
    }
    
}

export async function selectEmployeeById(id){
    const query = 'SELECT * FROM employee WHERE employeeid = $1';
    const value = [id];
    let res;
    try {
        res = await dbcn.query(query, value);
        return res.rows[0];
    } catch (error) {
        console.log('error selectEmployeeById: ', error);
    }
}

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

/****************************************
 ********** MODEL FOR SUPPLIER **********/
export async function selectAllSuppliers() {
    const query = 'SELECT * FROM supplier;';
    let res;
    try {
        res = await dbcn.query(query);
        return res;
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