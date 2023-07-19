const router = require('express').Router();
const { response } = require('express');
let Customer = require("../models/customer.model");

const {
    addCustomer,
    getCustomers,
    updateCustomer,
    getCustomerById,
    deleteCustomer,
   
  } = require("../controller/customer.controller");

  router.post("/", addCustomer);

  router.get("/", getCustomers);

  router.get("/:id", getCustomerById);

  router.put("/:id", updateCustomer);

  router.delete("/:id", deleteCustomer);

 

module.exports = router;