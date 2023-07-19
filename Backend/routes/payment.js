const router = require('express').Router();
const { response } = require('express');
let Payment = require("../models/payment.model");

const {
    addPayment,
    getPayments,
    getPaymentById,
    updatePayment,
    deletePayment
   
  } = require("../controller/payment.controller");
  
  //@route  GET api/news/all
  //@desc   get all news
  //@access Public
  router.get("/", getPayments);
  
//   //@route  GET api/news/:if
//   //@desc   get news by Id
//   //@access Public
  router.get("/:id", getPaymentById);
  
  //@route  POST api/news
  //@desc   add news
  //@access Private
  router.post("/", addPayment);
  
  //@route  PUT api/news
  //@desc   update news
  //@access Private
  router.put("/:id", updatePayment);
  
//   //@route  DELETE api/news
//   //@desc   delete news
//   //@access Private
  router.delete("/:id", deletePayment);

  
  module.exports = router;