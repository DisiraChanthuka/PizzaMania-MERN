const router = require('express').Router();
const { response } = require('express');
let Order = require("../models/order.model");

const {
    addOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    updateOrderStatus
   
  } = require("../controller/order.controller");
  
  //@route  GET api/news/all
  //@desc   get all news
  //@access Public
  router.get("/", getOrders);
  
//   //@route  GET api/news/:if
//   //@desc   get news by Id
//   //@access Public
  router.get("/:id", getOrderById);
  
  //@route  POST api/news
  //@desc   add news
  //@access Private
  router.post("/", addOrder);
  
  //@route  PUT api/news
  //@desc   update news
  //@access Private
  router.put("/:id", updateOrder);
  
//   //@route  DELETE api/news
//   //@desc   delete news
//   //@access Private
  router.delete("/:id", deleteOrder);


  router.put("/status/:id", updateOrderStatus);

  
  
  module.exports = router;