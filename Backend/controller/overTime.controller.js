const overTime = require("../models/overTime.model");

const addOT = async (req, res) => {
    const { empID, date, sTime,eTime } =
      req.body;
  
    const schedule = new overTime({
        empID,
        date,
        sTime,
        eTime
    });
  
    await schedule
      .save()
      .then(() => res.json('Over Time added!'))
      .catch((error) => res.status(400).json("Error: " + error));
  };

  const getOT = async (req, res) => {
    try {
      const schedule = await overTime.find();
      res.json(schedule);
    } catch (error) {
      res.status(500).send("Server Error" + error);
    }
  };

  const getOTById = async (req, res) => {
    try {
      const ot = await overTime.findById(req.params.id);
      res.json(ot);
    } catch (error) {
      res.status(500).send("Server Error" + error);
    }
  };

  const updateOT = async (req, res) => {
    overTime.findByIdAndUpdate(req.params.id)
      .then((existingSchedule) => {
        existingSchedule.empID = req.body.empID;
        existingSchedule.date = req.body.date;
        existingSchedule.sTime = req.body.sTime;
        existingSchedule.eTime = req.body.eTime;
      
        
        existingSchedule
          .save()
          .then(() => res.json('Over Time updated!'))
          .catch((error) => res.status(400).json("Error: " + error));
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };
  
  const deleteOT = async (req, res) => {
    overTime.findByIdAndDelete(req.params.id)
      .then((deletedSchedule) => {
        res.json('Schedule deleted');
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };
  
  module.exports = {
    addOT,
    getOT,
    updateOT,
    getOTById,
    deleteOT,
   
  }