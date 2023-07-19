const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    
    productID : {type : String, required : true, unique : true},
    productName : {type : String,required : true},
    productCategory : {type : String,required : true},
    productSize: {type :String}, //small or large
    price : {type : String},
    discount : {type : Number},
    availability : {type : String},

},{
        timestamps : true,
    
});


const Product = mongoose.model("Product", productSchema);

module.exports = Product;