import Chai from 'chai';
import chaiHttp from 'chai-http';
const expect = Chai.expect;
Chai.use(chaiHttp);
import app  from '../src/app.js';
import { displayItems } from '../src/item.js';
import { saveNewOrder, saveOrderDetails, deleteOrder, deleteOrderDetail } from '../src/order.js';
import { totalOfTheOrder } from '../src/helpers.js';


describe('=====Testing order queries=====', () => {

    let totalArray;

    const order = {
        storeid: 1,
        number: 1,
        date: '2021-06-29',
        supplierid: 1,
        delivery: 'by sea',
        payment: 'CC',
        employeeid: 2,
        total: null
    }

    const orderDetail = [
        {
            storeid: 1,
            ordernumber: 1,
            itemid: 1,
            qty: 3,
            unit_price: 10.00,
            subtotal: null
         },
         {
            storeid: 1,
            ordernumber: 1,
            itemid: 2,
            qty: 5,
            unit_price: 10.00,
            subtotal: null
         }
    ]

    let subtotal1 = orderDetail[0].subtotal = orderDetail[0].qty * orderDetail[0].unit_price;
    let subtotal2 = orderDetail[1].subtotal = orderDetail[1].qty * orderDetail[1].unit_price;

    it('should insert order into porder', async () => {
        totalArray = [subtotal1, subtotal2];
        order.total = await totalOfTheOrder(totalArray);
        await saveNewOrder(order);
        
    });

    it('should insert order details into order_details table', async () => {
            
          orderDetail.forEach(async (item) => {
              await saveOrderDetails(item);
          });
        
    });

    it('should do nothing', async () => {
        
        
    });

    after(async () => {
        orderDetail.forEach(async (item) => {
            await deleteOrderDetail(item.storeid, item.ordernumber);
        });
        await deleteOrder(order.storeid, order.number);
    });
});