const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const workingScheduleSchema = new Schema({
   
    empID : {type : String},
    date: {type :String, required : true},
    clockIn : {type : String},
    clockOut : {type : String},
    sTime : {type : String},
    eTime : {type : String},
    status: {type : String}
   
    
     
},{
        timestamps : true,
    
});


const workingSchedule = mongoose.model("workingSchedule", workingScheduleSchema);

module.exports = workingSchedule;