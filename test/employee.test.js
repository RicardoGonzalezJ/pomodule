import Chai from 'chai';
import chaiHttp from 'chai-http';
const expect = Chai.expect;
Chai.use(chaiHttp);
import app  from '../src/app.js';
import { selectAllEmployee, selectEmployeeById } from '../src/employee.js';

describe('Testing for Employee Queries', () => {

    let employeeList;
    let employeeInfo;

    const employee = {
        id: 3,
        name: 'Fulanito Magno'
    }

    it('should retrieve all employee info from employee table', async () => {
        
        employeeList = await selectAllEmployee();
        expect(employeeList.rows).to.not.equal(null);
    });

    it('should retrieve info from employee with id: 3', async () => {

        
        employeeInfo = await selectEmployeeById(employee.id);
       
        expect(employeeInfo.employeeid).to.be.equal(employee.id);
        expect(employeeInfo.employeename).to.be.equal(employee.name);
        
    });

});
