# PO Module API 
PM is a simple app to create basic purchase orders.

## Getting Started
1. Install [nodeJS](https://nodejs.org/) (version >= 14.16.0)
2. Run `npm install` to install all dependencies
3. Run `npm start` to start the app on `http://localhost:3000`

## Database
1. Create a Database and named "pomodule" on postgresql (v10.5 preferred)
2. Run `database.sql` to create tables.
3. Create `.env` file in the root directory and change the env variables values to yours.

## Endpoints
In app.js there is two main endpoint: 
1. `/getinfotoaddneworder` return a json with the following values:
   - itemInfo
   - storeinfo
   - supplierInfo
   - employeeInfo

2. `/addneworder` create a new order into database:
    - this endpoint use a requestBody and should be an object:  
    {
        - storeid: `int`, 
        - onumber: `int`, 
        - orderDate: `string`, 
        - supplierid: `int`, 
        - delivery: `string`, 
        - payment: `string`, 
        - employeeid: `int`, 
        - total: `float`, 
        - item: {
            - itemid: `int`, 
            - qty: `float`, 
            - unit_price: `float`, 
            - subtotal: `float`  
            }    
    }  
    - item object represent order detail that means it could be more than one so identifier should be different e.g. item0: {}, item1: {} ... itemN: {}

    ## Run test
    - Run all test: `npm run test`
