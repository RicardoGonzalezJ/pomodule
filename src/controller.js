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

export async function getDataToAddNewOrder(_req, res) {
    try {
        const itemInfo = await displayItems();
        const storeInfo = await selectAllStore();
        const supplierInfo = await selectAllSuppliers();
        const employeeInfo = await selectAllEmployee();
        res.status(200).json({itemInfo, storeInfo, supplierInfo, employeeInfo});
    } catch (error) {
        console.log('getdatatoaddneworder: ', error.stack);
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
            await saveOrderDetails(order.storeid, order.onumber, item);
        });
    
        res.redirect(200, '/getdatatoaddneworder');    
    } catch (error) {
        res.status(404).send(error.stack)
        console.log('message from addNewOrder: ', error.stack);
    }
    
}
