const router = require('express').Router();
const { response } = require('express');
let Employee = require("../models/employee.model");


const {
    addEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
   
  } = require("../controller/employee.controller");
  
  //@route  GET api/news/all
  //@desc   get all news
  //@access Public
  router.get("/", getEmployees);
  
  //@route  GET api/news/:if
  //@desc   get news by Id
  //@access Public
  router.get("/:id", getEmployeeById);
  
  //@route  POST api/news
  //@desc   add news
  //@access Private
  router.post("/", addEmployee);
  
  //@route  PUT api/news
  //@desc   update news
  //@access Private
  router.put("/:id", updateEmployee);
  
  //@route  DELETE api/news
  //@desc   delete news
  //@access Private
  router.delete("/:id", deleteEmployee);

  
  
  module.exports = router;