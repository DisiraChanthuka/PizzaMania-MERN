const router = require('express').Router();
const { response } = require('express');
let InventoryOrders = require("../models/inventory.model");

const {
    addInventoryOrders,
    getInventoryOrders,
    getInventoryOrdersById,
    updateInventoryOrders,
    deleteInventoryOrder,
    updateStatus
   
  } = require("../controller/inventoryOrders.controller");
  
  //@route  GET api/news/all
  //@desc   get all news
  //@access Public
  router.get("/", getInventoryOrders);
  
  //@route  GET api/news/:if
  //@desc   get news by Id
  //@access Public
  router.get("/:id", getInventoryOrdersById);
  
  //@route  POST api/news
  //@desc   add news
  //@access Private
  router.post("/", addInventoryOrders);
  
  //@route  PUT api/news
  //@desc   update news
  //@access Private
  router.put("/:id", updateInventoryOrders);
  
  //@route  DELETE api/news
  //@desc   delete news
  //@access Private
  router.delete("/:id", deleteInventoryOrder);

  router.put("/status/:id", updateStatus);

  
  
  module.exports = router;