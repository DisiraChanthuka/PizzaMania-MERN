const router = require('express').Router();
const { response } = require('express');
let Delivery = require("../models/delivery.model");

const {
    addDelivery,
    getDelivery,
    getDeliveryById,
    updateDelivery,
    deleteDelivery,
    updateDeliveryStatus
   
  } = require("../controller/delivery.controller");
  
  //@route  GET api/news/all
  //@desc   get all news
  //@access Public
  router.get("/", getDelivery);
  
//   //@route  GET api/news/:if
//   //@desc   get news by Id
//   //@access Public
  router.get("/:id", getDeliveryById);
  
  //@route  POST api/news
  //@desc   add news
  //@access Private
  router.post("/", addDelivery);
  
  //@route  PUT api/news
  //@desc   update news
  //@access Private
  router.put("/:id", updateDelivery);
  
//   //@route  DELETE api/news
//   //@desc   delete news
//   //@access Private
  router.delete("/:id", deleteDelivery);


  router.put("/status/:id", updateDeliveryStatus);

  
  
  module.exports = router;