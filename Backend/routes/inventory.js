const router = require('express').Router();
const { response } = require('express');
let Inventory = require("../models/inventory.model");

const {
    addInventory,
    getInventorys,
    getInventoryById,
    updateInventory,
    deleteInventory,
   
  } = require("../controller/inventory.controller");
  
  //@route  GET api/news/all
  //@desc   get all news
  //@access Public
  router.get("/", getInventorys);
  
  //@route  GET api/news/:if
  //@desc   get news by Id
  //@access Public
  router.get("/:id", getInventoryById);
  
  //@route  POST api/news
  //@desc   add news
  //@access Private
  router.post("/", addInventory);
  
  //@route  PUT api/news
  //@desc   update news
  //@access Private
  router.put("/:id", updateInventory);
  
  //@route  DELETE api/news
  //@desc   delete news
  //@access Private
  router.delete("/:id", deleteInventory);

  
  
  module.exports = router;