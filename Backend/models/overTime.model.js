const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const overTimeSchema = new Schema({
   
    empID : {type : String},
    date: {type :String, required : true},
    sTime : {type : String},
    eTime : {type : String},
   
   
    
     
},{
        timestamps : true,
    
});


const overTime = mongoose.model("OverTime", overTimeSchema);

module.exports = overTime;