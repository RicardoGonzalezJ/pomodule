import dbcn from '../db/indexdb.js';

/****************************************
 ************ MODEL FOR ORDER ***********/
export async function saveNewOrder(order) {
    const query = `INSERT INTO porder (storeid, ordernumber, orderdate, supplierid,
                                        orderdelyvery, orderpayment, employeeid, ordertotal)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING storeid, ordernumber;`;
    const values = [order.storeid, order.number, order.date, order.supplierid, order.delivery, order.payment,
                    order.employeeid, order.total];

    let res;
    try {
        res = await dbcn.query(query, values);
        return res;
    } catch (error) {
        console.log('Error saveNewOrder: ', error);
    }
}

export async function saveOrderDetails(details) {
    const query = `INSERT INTO order_detail (storeid, ordernumber, itemid, 
                                            itemqty, item_unit_price, itemsubtotal)
                    VALUES ($1, $2, $3, $4, $5, $6);`;
    const values = [details.storeid, details.ordernumber, details.itemid,
                    details.qty, details.unit_price, (details.qty * details.unit_price)];
    let res;
    try {
        res = await dbcn.query(query, values);
    } catch (error) {
        console.log('Error saveOrderDetails: ', error.stack);
    }
}

export async function deleteOrder(storeid, ordernumber) {
    const query = 'DELETE FROM porder WHERE storeid = $1 AND ordernumber = $2;';
    const value = [storeid, ordernumber];
    let res;
    try {
        res = await dbcn.query(query, value);
        return res;
    } catch (error) {
        console.log('error deleteOrder: ', error.stack);
    }
    
}

export async function deleteOrderDetail(storeid, ordernumber) {
    const query = 'DELETE FROM order_detail WHERE storeid = $1 AND ordernumber = $2;';
    const value = [storeid, ordernumber];
    let res;
    try {
        res = await dbcn.query(query, value);
        return res;
    } catch (error) {
        console.log('deleteOrderDetail: ', error.stack);
    }
}

