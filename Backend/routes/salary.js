const router = require('express').Router();
const { response } = require('express');
let Salary = require("../models/salary.model");


const {
    addSalary,
    getSalary,
    getSalaryById,
    updateSalary,
    deleteSalary,
    // calculateSalary,
    // getAndCalcSalary
   
  } = require("../controller/salary.controller");
  
  //@route  GET api/news/all
  //@desc   get all news
  //@access Public
  router.get("/", getSalary);
  
  //@route  GET api/news/:if
  //@desc   get news by Id
  //@access Public
  router.get("/:id", getSalaryById);
  
  //@route  POST api/news
  //@desc   add news
  //@access Private
  router.post("/", addSalary);
  
  //@route  PUT api/news
  //@desc   update news
  //@access Private
  router.put("/:id", updateSalary);
  
  //@route  DELETE api/news
  //@desc   delete news
  //@access Private
  router.delete("/:id", deleteSalary);

  
  
  module.exports = router;