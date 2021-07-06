import Chai from 'chai';
import chaiHttp from 'chai-http';
const expect = Chai.expect;
Chai.use(chaiHttp);
import app  from '../src/app.js';
import { deleteOrder, deleteOrderDetail } from '../src/order.js';


describe('=====Testing POST /addNewOrder=====', () => {
    let orderDetails = [];
    it('Should redirect to /getdatatoaddneworder', async () => {
        
        try {
            let data;
            let res = await Chai
            .request(app)
            .post('/addneworder')
            .set('Content-Type', 'application/json')
            .send({ 
                storeid: 1,
                onumber: 1,
                orderDate: '2021-06-29',
                supplierid: 1,
                delivery: 'by sea',
                payment: 'CC',
                employeeid: 2,
                total: null,
                item1: {
                    itemid: 1,
                    qty: 3,
                    unit_price: 10.00,
                    subtotal: null
                },
                item2: {
                    itemid: 2,
                    qty: 5,
                    unit_price: 50.00,
                    subtotal: null
                },
                item3: {
                    itemid: 3,
                    qty: 4,
                    unit_price: 30.00,
                    subtotal: null
                },
                item4: {
                    itemid: 4,
                    qty: 3,
                    unit_price: 10.00,
                    subtotal: null
                }
        });
        
        data = res.request._data;
        for (const props in data) {
            if (typeof data[props] === 'object') {
                if (data[props] !== null) {
                    data[props].storeid = data.storeid;
                    data[props].onumber = data.onumber;
                    orderDetails.push(data[props]);
                }
            }      
        }
        
        expect(res).to.have.status(200);
          
        } catch (error) {
            console.log('error on test post test: ', error.stack);
        }
        
    });

    after(async () => {
        orderDetails.forEach( async (item) => {
            await deleteOrderDetail(item.storeid, item.onumber);
        });    
        await deleteOrder(1, 1);   
    });
});