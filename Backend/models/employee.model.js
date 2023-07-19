const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    empID : {type : String, unique : true,required : true},
    fullName: {type :String, required : true},
    contactNo : {type : String, required : true},
    email: {type :String, required : true},
    address: {type :String, required : true},
    position : {type : String, required : true},
    
     
},{
        timestamps : true,
    
});


const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;