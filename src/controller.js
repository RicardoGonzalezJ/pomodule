import { displayItems } from './item.js';
import { selectAllStore } from './store.js';
import { selectAllSuppliers } from './supplier.js';
import { selectAllEmployee } from './employee.js';
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
        res.status(200).json({itemInfo, storeInfo, supplierInfo, employeeInfo})
    } catch (error) {
        console.log('getOrderInfo: ', error.stack);
    }
}