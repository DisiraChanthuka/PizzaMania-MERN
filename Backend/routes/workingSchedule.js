const router = require('express').Router();
const { response } = require('express');
let workingSchedule = require("../models/workingSchedule.model");
const workingController = require("../controller/workingSchedule.controller");

const {
    addSchedule,
    getSchedules,
    updateSchedule,
    getScheduleById,
    deleteSchedule,
    scheduleWithEmployee,
    updateStatus,
    updateExistingSchedule,
    updateScheduleStatusAndClockIn,
    updateScheduleStatusAndClockOut
   
  } = require("../controller/workingSchedule.controller");

  router.post("/", addSchedule);

  router.get("/", getSchedules);

  router.put("/:id", updateSchedule);

  router.get("/:id", getScheduleById);

  router.delete("/:id", deleteSchedule);

  router.put("/clockIn/:id", updateScheduleStatusAndClockIn);

  router.put("/clockOut/:id", updateScheduleStatusAndClockOut);


  router.put("/updateExisting/:id", updateExistingSchedule);

  router.put("/status/:id", updateStatus);

  router.post('/getByEmployeeId', scheduleWithEmployee)

  module.exports = router;