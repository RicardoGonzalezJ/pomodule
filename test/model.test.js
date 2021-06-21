import util from 'util';
import Chai from 'chai';
const assert = Chai.assert;
import { displayItems as itemTest } from '../src/model.js';

let itemListTest;

describe('Initialize', function () {
    this.timeout(100000);
    it('should successfully load the model', async function () {
        try {
            itemListTest = await itemTest();
            
        } catch (error) {
            console.log('test model error:', error);
            throw error;
        }
    })
})