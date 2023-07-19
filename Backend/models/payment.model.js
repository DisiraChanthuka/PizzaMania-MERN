const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    //order id is auto generated
    orderId : {type : String},
    amount : {type : String},
    givenAmount : {type : String},
    change : {type : String},
   
    
     
},{
        timestamps : true,
    
});


const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;