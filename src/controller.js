import { displayItems } from './item.js';
import { selectAllStore } from './store.js';
import { selectAllSuppliers } from './supplier.js';
import { selectAllEmployee } from './employee.js';
import { saveNewOrder, saveOrderDetails } from './order.js';
import { totalOfTheOrder } from './helpers.js';

export async function itemList(req, res) {
    try {
        const dispItems = await displayItems();
        res.json({dispItems});
    } catch (error) {
        console.error(error);
    }
}

export async function getOrderInfo(req, res) {
    try {
        const itemInfo = await displayItems();
        const storeInfo = await selectAllStore();
        const supplierInfo = await selectAllSuppliers();
        const employeeInfo = await selectAllEmployee();
        // res.status(200).json({itemInfo, storeInfo, supplierInfo, employeeInfo})
        res.send(`<html>
                    <head>
                     <title>Test</title>
                    </head>
                    <body>
                     <h2>Create Order Test</h2>
                     <form action="/test" method="POST">
                        <h3>Order Data</h3>
                            <input type="number" name="storeid" placeholder="storeid">
                            <input type="number" name="onumber" placeholder="ordernumber">
                            <input type="date" name="orderDate">
                            <input type="number" name="supplierid" placeholder="supplier id">
                            <input type="text" name="delivery" placeholder="delivery">
                            <input type="text" name="payment" placeholder="payment">
                            <input type="number" name="employeeid" placeholder="employee id">
                        <hr/>
                        <h3>Order Details</h3>
                            <input type="number" name="orderD0[itemid]" placeholder="itemid">
                            <input type="number" name="orderD0[qty]" placeholder="quantity">
                            <input type="number" name="orderD0[unit_price]" placeholder="unit_price">
                            <input type="number" name="orderD0[subtotal]" placeholder="subtotal">
                            <br/>
                            <br/>
                            <input type="number" name="orderD1[itemid]" placeholder="itemid">
                            <input type="number" name="orderD1[qty]" placeholder="quantity">
                            <input type="number" name="orderD1[unit_price]" placeholder="unit_price">
                            <input type="number" name="orderD1[subtotal]" placeholder="subtotal">
                            <br/>
                            <br/>
                        <input type="submit" value="submit">
                    </form>
                    </body>
                </html>`)
    } catch (error) {
        console.log('getOrderInfo: ', error.stack);
    }
}

export async function addNewOrder(req, res) {
    try {
        let orderDetails = [];
        let subtotals = [];
        
        const { storeid, onumber, orderDate, supplierid, 
                delivery, payment, employeeid, total } = req.body;

        const order = {
            storeid,
            onumber,
            orderDate,
            supplierid,
            delivery,
            payment,
            employeeid,
            total
        };
        
        for (const props in req.body) {
            if (typeof req.body[props] === 'object') {
                if (req.body[props] !== null) {
                    req.body[props].subtotal = req.body[props].qty * req.body[props].unit_price;
                    orderDetails.push(req.body[props]);
                    subtotals.push(req.body[props].subtotal);
                }
            }      
        }
        order.total = await totalOfTheOrder(subtotals);
        await saveNewOrder(order);
        orderDetails.forEach( async (item) => {
            console.log(item)
            await saveOrderDetails(order.storeid, order.onumber, item);
        });
        
        console.log('odetail ',orderDetails);
        console.log('osubtotals ', subtotals, 'total', order.total);
        res.redirect(303, '/getorderinfo');
        // res.status(200).send('Done');    
    } catch (error) {
        res.status(404).send(error.stack)
        console.log('message from addNewOrder: ', error.stack);
    }
    
}
