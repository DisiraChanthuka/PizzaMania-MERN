const router = require('express').Router();
const { response } = require('express');
let overTime = require("../models/overTime.model");
const overTimeController = require("../controller/overTime.controller");

const {
    addOT,
    getOT,
    updateOT,
    getOTById,
    deleteOT
   
  } = require("../controller/overTime.controller");

  router.post("/", addOT);

  router.get("/", getOT);

  router.put("/:id", updateOT);

  router.get("/:id", getOTById);

  router.delete("/:id", deleteOT);


  module.exports = router;