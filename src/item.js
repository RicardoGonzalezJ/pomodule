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

