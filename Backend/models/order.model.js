const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    //order id is auto generated
    orderId :{type : String, required : true},
    customer : {type : String, required : true},
    item1 : {type : String,required : true},
    size1 : {type : String,required : true},
    quantity1 : {type : String,required : true},
    item2: {type :String},
    size2 : {type : String},
    quantity2 : {type : String},
    item3 : {type : String},
    size3 : {type : String},
    quantity3 : {type : String},
    orderFor : {type : String, required : true}, //delivery, takeaway, dinein
    deliveryAddress : {type : String},
    amount : {type : String, required : true},
    orderStatus : {type : String,} //order taken, order processing, order delivering, order completed
    
     
},{
        timestamps : true,
    
});


const Order = mongoose.model("Order", orderSchema);

module.exports = Order;