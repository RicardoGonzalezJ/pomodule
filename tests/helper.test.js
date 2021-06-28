import Chai from 'chai';
import { multiplyQuantityPerUnitPrice, totalOfTheOrder } from '../src/helpers.js';
const expect = Chai.expect;

describe('=====Test for helper functions=====', () => {
    let quantity = [2, 4, 2, 1, 5];
    let unit_price = [10.00, 50.00, 30.00, 20.00, 150.00];
    let actual = [20.00, 200.00, 60.00, 20.00, 750.00];
    let expected;

    it('It should return a result: [20.00, 200.00, 60.00, 20.00, 750.00]', async () => {
        expected = await multiplyQuantityPerUnitPrice(quantity, unit_price);
        expect(expected).to.be.eql(actual);
    });

    it('should return the total of: $1050.00', async ()=> {
        let amounts = await multiplyQuantityPerUnitPrice(quantity, unit_price);
        expected = await totalOfTheOrder(amounts);
        expect(expected).to.be.equal(1050);
    });

});