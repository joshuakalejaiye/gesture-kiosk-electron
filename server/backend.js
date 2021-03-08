const express = require("express");
const pg_app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
pg_app.use(cors());
pg_app.use(express.json());

pg_app.listen(5000, () => {
  console.log("server has started on port 5000")
});

pg_app.get("/products", async(req, res) => {
try {
   const allProducts = await pool.query("SELECT * FROM product_info;"); 
   res.json(allProducts.rows);
} catch (error) {
 console.log(error.message);  
}
});

pg_app.get("/products/:category", async(req, res) => {
   try {
      const {category} = req.params;
      const allProducts = await pool.query("SELECT * FROM product_info WHERE category=$1",
      [category]); 
      res.json(allProducts.rows);
   } catch (error) {
    console.log(error.message);  
   }
});


pg_app.get("/products/:id", async(req, res) => {
   try {
      const {id} = req.params;
      const singleProduct = await pool.query("SELECT * FROM product_info WHERE product_id=$1",
      [id]); 
      res.json(singleProduct.rows);
   } catch (error) {
    console.log(error.message);  
   }
});

pg_app.post("/products", async(req, res) => {
 try {
   const values = req.body;
   const newProduct = await pool.query("INSERT INTO product_info (name, price, description, category) VALUES ($1, $2, $3, $4)", 
   [values.name, values.price, values.description, values.category]);

    res.json("Product created!");
 } catch (error) {
    console.log(error.message);
 }
});