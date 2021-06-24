import Chai from 'chai';
import chaiHttp from 'chai-http';
const expect = Chai.expect;
Chai.use(chaiHttp);
import app  from '../src/app.js';
import { insertNewItem, deleteItem } from '../src/model.js';

describe('Testing Item Queries', () => {

    let itemToInsert;
    let errorDuplicateKey;
    const item = {
        id: 6,
        name: 'Product Test',
        unit_price: 30.00
    }

    it('should insert items to item relation', async () => {
        
        itemToInsert = await insertNewItem(item);
        expect(itemToInsert.command).to.be.equal('INSERT');
    });

    it('should fail with duplicate key value violates unique constraint "item_pkey"', async () => {
        errorDuplicateKey = await insertNewItem(item);
        expect(errorDuplicateKey.message).to.be.equal('duplicate key value violates unique constraint "item_pkey"');
        
    });

    after(async () => {
        await deleteItem(item.id);
    });
});

describe('GET /itemlist', () => {
    it('should return status 200', async () => {
        let res = await Chai
        .request(app)
        .get('/itemlist')
        
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
    });

});


