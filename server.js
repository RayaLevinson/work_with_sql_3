require('dotenv').config();
const pool = require('./db/db');

// 1. מי קנה את המוצר היקר ביותר?
const query1 = `
  SELECT c.id, c.name FROM jbh_shop.customers AS c
  INNER JOIN jbh_shop.orders AS o
  ON c.id = o.customer_id
  INNER JOIN jbh_shop.orders_products AS op
  ON o.id = op.order_id
  INNER JOIN 
    (SELECT p.id FROM jbh_shop.products AS p
    ORDER BY price DESC
    LIMIT 1) AS expensive
  ON op.product_id = expensive.id;
  `;

pool.query({sql: query1,nestTables: true}, (err, res, fields) => {
  if(err) throw err;
  console.log(res);
});

// 2. כמה עולה המוצר הזול ביותר?
const query2 = `
  SELECT price FROM jbh_shop.products
  ORDER BY price
  LIMIT 1;
  `;

pool.query(query2, (err, res, fields) => {
  if(err) throw err;
  console.log(res);
});  

// 3. כמה הזמנות קיימות בחנות?
const query3 = `
  SELECT COUNT(*) FROM jbh_shop.orders;
  `;

pool.query(query3, (err, res, fields) => {
  if(err) throw err;
  console.log(res);
});  

// 4. מי לא הזמין כלום?
const query4 = `
  SELECT c.id, c.name FROM jbh_shop.customers AS c
  LEFT JOIN jbh_shop.orders AS o
  ON c.id = o.customer_id
  WHERE o.id IS NULL;
  `;
  
pool.query({sql: query4,nestTables: true}, (err, res, fields) => {
  if(err) throw err;
  console.log(res);
});  