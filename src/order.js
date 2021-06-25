import dbcon from '../db/indexdb.js';

/****************************************
 ************ MODEL FOR ORDER ***********/
export async function saveNewOrder(order) {
    const query = `INSERT INTO porder (storeid, ordernumber, orderdate, supplierid,
                                        orderdelyvery, orderpayment, employeeid, ordertotal)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING storeid, ordernumber;`;
    const values = [order.storeid, order.number, order.supplierid, order.delivery, order.payment,
                    order.employeeid, order.total];

    let res;
    try {
        res = await dbcon.query(query, values);
        return res;
    } catch (error) {
        console.log('Error saveNewOrder: ', error);
    }
}

