const router = require('express').Router();
const { response } = require('express');
let User = require("../models/user.model");


const {
    addUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser
   
  } = require("../controller/user.controller");
  
  //@route  GET api/news/all
  //@desc   get all news
  //@access Public
  router.get("/", getUsers);
  
  //@route  GET api/news/:if
  //@desc   get news by Id
  //@access Public
  router.get("/:id", getUserById);
  
  //@route  POST api/news
  //@desc   add news
  //@access Private
  router.post("/", addUser);
  
  //@route  PUT api/news
  //@desc   update news
  //@access Private
  router.put("/:id", updateUser);
  
  //@route  DELETE api/news
  //@desc   delete news
  //@access Private
  router.delete("/:id", deleteUser);


  router.post("/login", loginUser);
  
  
  module.exports = router;