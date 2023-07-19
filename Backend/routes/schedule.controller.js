// const workingSchedule = require('../models/workingSchedule.model');

// module.exports = {

//     scheduleByEmployee: async (req,res) => {
//         const scheduleData = await workingSchedule.find({_id:req.body.schedule_id}).populate('empID');
    
//         res.send(scheduleData);
//     },

//     scheduleByEmployeeID: async (req,res) => {
//         const scheduleData = await workingSchedule.find({empID:req.body.employeeID});
    
//         res.send(scheduleData);
//     }

// }