import dbcn from '../db/indexdb.js';

export async function selectAllEmployee(){
    const query = 'SELECT * FROM employee;';
    let res;
    try {
        res = await dbcn.query(query);
        return res.rows;        
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