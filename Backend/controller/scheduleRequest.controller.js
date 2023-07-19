const ScheduleRequest = require("../models/scheduleRequests.model");

const addScheduleRequest = async (req, res) => {
    const { scheduleID,empID, date, sTime,eTime, status, changingScheduleID,changingEmpID, changingDate, changingsTime,changingeTime } =
      req.body;
  
    const scheduleRequest = new ScheduleRequest({
        scheduleID,
        empID,
        date,
        sTime,
        eTime, 
        status,
        changingScheduleID,
        changingEmpID,
        changingDate,
        changingsTime,
        changingeTime
    });
  
    await scheduleRequest
      .save()
      .then(() => res.json('Schedule Request added!'))
      .catch((error) => res.status(400).json("Error: " + error));
  };

  const getScheduleRequests = async (req, res) => {
    try {
      const scheduleRequest = await ScheduleRequest.find();
      res.json(scheduleRequest);
    } catch (error) {
      res.status(500).send("Server Error" + error);
    }
  };

  const getScheduleRequestById = async (req, res) => {
    try {
      const scheduleRequest = await ScheduleRequest.findById(req.params.id);
      res.json(scheduleRequest);
    } catch (error) {
      res.status(500).send("Server Error" + error);
    }
  };

  const updateScheduleRequest = async (req, res) => {
    ScheduleRequest.findByIdAndUpdate(req.params.id)
      .then((existingScheduleRequest) => {
        existingScheduleRequest.scheduleID = req.body.scheduleID;
        existingScheduleRequest.empID = req.body.empID;
        existingScheduleRequest.date = req.body.date;
        existingScheduleRequest.sTime = req.body.sTime;
        existingScheduleRequest.eTime = req.body.eTime;
        existingScheduleRequest.changingScheduleID = req.body.changingScheduleID;
        existingScheduleRequest.changingEmpID = req.body.changingEmpID;
        existingScheduleRequest.changingDate = req.body.changingDate;
        existingScheduleRequest.changingsTime = req.body.changingsTime;
        existingScheduleRequest.changingeTime = req.body.changingeTime;
        existingScheduleRequest.status = req.body.status;
        
        existingScheduleRequest
          .save()
          .then(() => res.json('Schedule Request updated!'))
          .catch((error) => res.status(400).json("Error: " + error));
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };
  
  const deleteScheduleRequest = async (req, res) => {
    ScheduleRequest.findByIdAndDelete(req.params.id)
      .then((deletedSchedule) => {
        res.json('Schedule Request deleted');
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };

  const updateStatus = async (req, res) => {
    ScheduleRequest.findByIdAndUpdate(req.params.id)
      .then((existingSchedule) => {
       
       
        existingSchedule.status = req.body.status;
        
        existingSchedule
          .save()
          .then(() => res.json('Schedule RequestStatus updated!'))
          .catch((error) => res.status(400).json("Error: " + error));
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };
  
  module.exports = {
    addScheduleRequest,
    getScheduleRequests,
    updateScheduleRequest,
    getScheduleRequestById,
    deleteScheduleRequest,
    updateStatus
   
  }