import Chai from 'chai';
import chaiHttp from 'chai-http';
const expect = Chai.expect;
Chai.use(chaiHttp);
import app  from '../src/app.js';


describe('=====Testing POST /test=====', () => {

    it('Should redirect to getorderinfo', async () => {
        
        try {
            let res = await Chai
            .request(app)
            .post('/test')
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
                } 
        })
        // console.log(res);
        expect(res).to.have.status(200);
          
        } catch (error) {
            console.log('error on test post test: ', error.stack);
        }
        
    });
    /*it('should insert order into porder', async () => {
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
    });*/
});