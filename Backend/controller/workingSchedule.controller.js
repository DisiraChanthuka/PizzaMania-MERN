const workingSchedule = require("../models/workingSchedule.model");

const addSchedule = async (req, res) => {
    const { empID, date, sTime,eTime,clockIn, clockOut, status } =
      req.body;
  
    const schedule = new workingSchedule({
        empID,
        date,
        sTime,
        eTime,
        clockIn,
        clockOut, 
        status
    });
  
    await schedule
      .save()
      .then(() => res.json('Schedule added!'))
      .catch((error) => res.status(400).json("Error: " + error));
  };

  const getSchedules = async (req, res) => {
    try {
      const schedule = await workingSchedule.find();
      res.json(schedule);
    } catch (error) {
      res.status(500).send("Server Error" + error);
    }
  };

  const getScheduleById = async (req, res) => {
    try {
      const schedule = await workingSchedule.findById(req.params.id);
      res.json(schedule);
    } catch (error) {
      res.status(500).send("Server Error" + error);
    }
  };

  const updateSchedule = async (req, res) => {
    workingSchedule.findByIdAndUpdate(req.params.id)
      .then((existingSchedule) => {
        existingSchedule.empID = req.body.empID;
        existingSchedule.date = req.body.date;
        existingSchedule.sTime = req.body.sTime;
        existingSchedule.eTime = req.body.eTime;
        existingSchedule.clockIn = req.body.clockIn;
        existingSchedule.clockOut = req.body.clockOut;
        existingSchedule.status = req.body.status;
        
        existingSchedule
          .save()
          .then(() => res.json('Schedule updated!'))
          .catch((error) => res.status(400).json("Error: " + error));
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };
  
  const deleteSchedule = async (req, res) => {
    workingSchedule.findByIdAndDelete(req.params.id)
      .then((deletedSchedule) => {
        res.json('Schedule deleted');
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };

  const updateScheduleStatusAndClockIn = async (req, res) => {
    workingSchedule.findByIdAndUpdate(req.params.id)
      .then((existingSchedule) => {
       
        existingSchedule.clockIn = req.body.clockIn;
        existingSchedule.status = req.body.status;
        
        existingSchedule
          .save()
          .then(() => res.json('Schedule Status updated!'))
          .catch((error) => res.status(400).json("Error: " + error));
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };

  const updateScheduleStatusAndClockOut = async (req, res) => {
    workingSchedule.findByIdAndUpdate(req.params.id)
      .then((existingSchedule) => {
       
        existingSchedule.clockOut = req.body.clockOut;
        existingSchedule.status = req.body.status;
        
        existingSchedule
          .save()
          .then(() => res.json('Schedule Status updated!'))
          .catch((error) => res.status(400).json("Error: " + error));
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };

  const updateStatus = async (req, res) => {
    workingSchedule.findByIdAndUpdate(req.params.id)
      .then((existingSchedule) => {
       
        
        existingSchedule.status = req.body.status;
        
        existingSchedule
          .save()
          .then(() => res.json('Schedule Status updated!'))
          .catch((error) => res.status(400).json("Error: " + error));
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };

  const updateExistingSchedule = async (req, res) => {
    workingSchedule.findByIdAndUpdate(req.params.id)
      .then((existingSchedule) => {
        existingSchedule.date = req.body.date;
        existingSchedule.sTime = req.body.sTime;
        existingSchedule.eTime = req.body.eTime;
        existingSchedule.status = req.body.status;
        
        existingSchedule
          .save()
          .then(() => res.json('Schedule updated!'))
          .catch((error) => res.status(400).json("Error: " + error));
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };
  

const scheduleWithEmployee = async (req,res) => {
  const scheduleData = await workingSchedule.find({_id:req.body.schedule_id}).populate('empID');

  res.send(scheduleData);
};
  
  module.exports = {
    addSchedule,
    getSchedules,
    updateSchedule,
    getScheduleById,
    deleteSchedule,
    updateScheduleStatusAndClockIn,
    updateScheduleStatusAndClockOut,
    updateStatus,
    updateExistingSchedule,
    // scheduleByEmployee
    scheduleWithEmployee
   
  }