const router = require('express').Router();
const { response } = require('express');
let scheduleRequest = require("../models/scheduleRequests.model");
const scheduleRequestController = require("../controller/scheduleRequest.controller");

const {
    addScheduleRequest,
    getScheduleRequests,
    updateScheduleRequest,
    getScheduleRequestById,
    deleteScheduleRequest,
    updateStatus
  
   
  } = require("../controller/scheduleRequest.controller");

  router.post("/", addScheduleRequest);

  router.get("/", getScheduleRequests);

  router.put("/:id", updateScheduleRequest);

  router.put("/status/:id", updateStatus);

  router.get("/:id", getScheduleRequestById);

  router.delete("/:id", deleteScheduleRequest);

 

  module.exports = router;