/***CREATE TABLES FOR POMODULE***/
DROP TABLE IF EXISTS store;
CREATE TABLE store (
    strowid SERIAL NOT NULL,
    storeid INTEGER PRIMARY KEY,
    storename VARCHAR(35) NOT NULL,
    straddress VARCHAR (100),
    contactphone VARCHAR (9),
    email VARCHAR (30),
    website VARCHAR (30)
);

DROP TABLE IF EXISTS supplier;
CREATE TABLE supplier (
    suprowid SERIAL NOT NULL,
    supplierid INTEGER PRIMARY KEY,
    suppliername VARCHAR(35) NOT NULL,
    supaddress VARCHAR(100),
    supcontacnum VARCHAR(9),
    supemail VARCHAR(30),
    supwebsite VARCHAR(30)

);

DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
    emrowid SERIAL NOT NULL,
    employeeid INTEGER PRIMARY KEY,
    employeename VARCHAR(50) NOT NULL
);

DROP TABLE IF EXISTS item;
CREATE TABLE item (
    irowid SERIAL NOT NULL,
    itemid INTEGER NOT NULL PRIMARY KEY,
    itemname VARCHAR(30) NOT NULL,
    item_unit_price MONEY NOT NULL
);

DROP TABLE IF EXISTS porder;
CREATE TABLE porder (
    orowid SERIAL NOT NULL,
    storeid INTEGER REFERENCES store(storeid) ON UPDATE CASCADE ON DELETE CASCADE,
    ordernumber INTEGER,
    orderdate DATE NOT NULL,
    supplierid INTEGER NOT NULL REFERENCES supplier(supplierid) ON UPDATE CASCADE ON DELETE CASCADE,
    orderdelyvery VARCHAR(30),
    orderpayment VARCHAR(10) NOT NULL,
    employeeid INTEGER NOT NULL REFERENCES employee(employeeid) ON UPDATE CASCADE ON DELETE CASCADE,
    ordertotal MONEY NOT NULL,
    PRIMARY KEY(storeid, ordernumber)  
);

DROP TABLE IF EXISTS order_detail;
CREATE TABLE order_detail (
    ordetrowid SERIAL NOT NULL,
    storeid INTEGER NOT NULL,
    ordernumber INTEGER NOT NULL,
    itemid INTEGER NOT NULL REFERENCES item(itemid) ON UPDATE CASCADE ON DELETE CASCADE,
    itemqty INTEGER NOT NULL,
    item_unit_price MONEY NOT NULL,
    itemsubtotal MONEY NOT NULL,
    FOREIGN KEY(storeid, ordernumber) REFERENCES porder(storeid, ordernumber),
    PRIMARY KEY(storeid, ordernumber, itemid)

);

/***DUMMY DATA FOR TABLES***/
INSERT INTO store(storeid, storename, straddress, contactphone, email, website)
   VALUES (1, 'fake store A', 'Down by the Bay', '456-09867', 'info@fakestorea.com', 'www.fakestorea.com'),
          (2, 'fake store B', 'In the next block', '567-09877', 'info@fakestoreb.com', 'www.fakestoreb.com'),
          (3, 'fake store C', 'It is near to you', '598-90876', 'info@fakestorec.com', 'www.fakestorec.com');

INSERT INTO supplier(supplierid, suppliername, supaddress, supcontacnum, supemail, supwebsite)
  VALUES (1, 'Company A', 'Far Far Away', '578-87690', 'info@campanya.com', 'www.companya.com'),
         (2, 'Company B', 'Far Far Away from A', '590-87654', 'info@campanyb.com', 'www.companyb.com'),
         (3, 'Company C', 'Far Far Away from B', '580-65430', 'info@campanyc.com', 'www.companyc.com');

INSERT INTO employee(employeeid, employeename)
  VALUES (1, 'Perencejo Perez'),
         (2, 'Pablo Barrio'),
         (3, 'Fulanito Magno');

INSERT INTO item (itemid, itemname, item_unit_price)
    VALUES (1, 'Product A', 10.00),
           (2, 'Product B', 40.00),
           (3, 'Product C', 150.00),
           (4, 'Product D', 200.00),
           (5, 'Product E', 50.00);