const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const deliverySchema = new Schema({
    //delivery id is auto generated
    deliveryId : {type : String, required : true},
    orderId : {type : String, required : true},
    customer : {type : String, required : true},
    item1 : {type : String,required : true},
    quantity1 : {type : String,required : true},
    item2: {type :String},
    quantity2 : {type : String},
    item3 : {type : String},
    quantity3 : {type : String},
    deliveryAddress : {type : String, required : true}, 
    amount : {type : String, required : true},
    orderStatus : {type : String,},
    assignedEmp : {type : String,}
    
     
},{
        timestamps : true,
    
});


const Delivery = mongoose.model("Delivery", deliverySchema);

module.exports = Delivery;