import Chai from 'chai';
import chaiHttp from 'chai-http';
const expect = Chai.expect;
Chai.use(chaiHttp);
import app  from '../src/app.js';
import { insertNewItem, deleteItem, selectItemById } from '../src/item.js';

describe('Testing Item Queries', () => {

    let itemToInsert;
    let errorDuplicateKey;
    let oneItem;

    const item = {
        id: 6,
        name: 'Product Test',
        unit_price: 30.00
    }

    it('should insert items to item relation', async () => {
        
        itemToInsert = await insertNewItem(item);
        expect(itemToInsert.command).to.be.equal('INSERT');
    });

    it('should retrieve info from item with id: 6', async () => {
        let unitPrice;
        oneItem = await selectItemById(item.id);

        // unit_price come as string from table item so need to be parse
        unitPrice = parseFloat(oneItem.item_unit_price.split('$')[1]);
       
        expect(oneItem.itemid).to.be.equal(item.id);
        expect(oneItem.itemname).to.be.equal(item.name);
        expect(unitPrice).to.be.equal(item.unit_price);
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


