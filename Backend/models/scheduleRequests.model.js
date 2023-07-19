const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const scheduleRequestSchema = new Schema({
   
    scheduleID : {type:String},
    empID : {type : String},
    date: {type :String, required : true},
    sTime : {type : String, required : true},
    eTime : {type : String, required : true},
    changingScheduleID: {type:String, required : true},
    changingEmpID: {type:String, required : true},
    changingDate : {type:String, required : true},
    changingsTime:{type:String, required : true},
    changingeTime: {type:String, required : true},
    status: {type : String}
   
    
     
},{
        timestamps : true,
    
});


const scheduleRequest = mongoose.model("scheduleRequest", scheduleRequestSchema);

module.exports = scheduleRequest;