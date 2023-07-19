const router = require('express').Router();
const { response } = require('express');
let Product = require("../models/product.model");

const {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
   
  } = require("../controller/product.controller");
  
  //@route  GET api/news/all
  //@desc   get all news
  //@access Public
  router.get("/", getProducts);
  
//   //@route  GET api/news/:if
//   //@desc   get news by Id
//   //@access Public
  router.get("/:id", getProductById);
  
  //@route  POST api/news
  //@desc   add news
  //@access Private
  router.post("/", addProduct);
  
  //@route  PUT api/news
  //@desc   update news
  //@access Private
  router.put("/:id", updateProduct);
  
//   //@route  DELETE api/news
//   //@desc   delete news
//   //@access Private
  router.delete("/:id", deleteProduct);

  
  
  module.exports = router;