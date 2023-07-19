const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const inventoryOrdersSchema = new Schema({
    orderId :{type : String},
    productID : {type : String},
    productName: {type :String},
    productCategory : {type : String},
    availableQuantity : {type : String},
    requestedQuantity : {type : String},
    status:{type : String}
    
     
},{
        timestamps : true,
    
});


const InventoryOrders = mongoose.model("InventoryOrders1", inventoryOrdersSchema);

module.exports = InventoryOrders;