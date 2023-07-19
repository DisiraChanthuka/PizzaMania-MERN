const Product = require("../models/product.model");

const addProduct = async (req, res) => {
    const { productID, productName, productCategory, productSize, price,discount, availability } =
      req.body;
  
    const product = new Product({
      productID,
      productName,
      productCategory,
      productSize,
      price,
      discount, 
      availability
    });
  
    await product
      .save()
      .then(() => res.json('Product added!'))
      .catch((error) => res.status(400).json("Error: " + error));
  };

  const getProducts = async (req, res) => {
    try {
      const product = await Product.find();
      res.json(product);
    } catch (error) {
      res.status(500).send("Server Error" + error);
    }
  };

  const getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.json(product);
    } catch (error) {
      res.status(500).send("Server Error" + error);
    }
  };

  const updateProduct = async (req, res) => {
    Product.findByIdAndUpdate(req.params.id)
      .then((existingProduct) => {
        existingProduct.productID = req.body.productID;
        existingProduct.productName = req.body.productName;
        existingProduct.productCategory = req.body.productCategory;
        existingProduct.productSize = req.body.productSize;
        existingProduct.price = req.body.price;
        existingProduct.discount = req.body.discount;
        existingProduct.availability = req.body.availability;
       
        
        existingProduct
          .save()
          .then(() => res.json('Product updated!'))
          .catch((error) => res.status(400).json("Error: " + error));
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };
  
  const deleteProduct = async (req, res) => {
    Product.findByIdAndDelete(req.params.id)
      .then((deletedProduct) => {
        res.json('Product deleted');
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };
  
  module.exports = {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
   
  }