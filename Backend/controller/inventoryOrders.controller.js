const InventoryOrders = require("../models/InventoryOrders.model");

const addInventoryOrders = async (req, res) => {
    const { orderId,productID, productName, productCategory, availableQuantity, requestedQuantity,status } =
      req.body;
  
    const inventoryOrders = new InventoryOrders({
      orderId,
        productID,
        productName,
        productCategory,
        availableQuantity,
        requestedQuantity,
        status
    });
  
    await inventoryOrders
      .save()
      .then(() => res.json('Inventory Order added!'))
      .catch((error) => res.status(400).json("Error: " + error));
  };

  const getInventoryOrders = async (req, res) => {
    try {
      const inventoryOrders = await InventoryOrders.find();
      res.json(inventoryOrders);
    } catch (error) {
      res.status(500).send("Server Error" + error);
    }
  };

  const getInventoryOrdersById = async (req, res) => {
    try {
      const inventoryOrders = await InventoryOrders.findById(req.params.id);
      res.json(inventoryOrders);
    } catch (error) {
      res.status(500).send("Server Error" + error);
    }
  };

  const updateInventoryOrders = async (req, res) => {
    InventoryOrders.findByIdAndUpdate(req.params.id)
      .then((existingInventoryOrders) => {
        existingInventoryOrders.orderId = req.body.orderId;
        existingInventoryOrders.productID = req.body.productID;
        existingInventoryOrders.productName = req.body.productName;
        existingInventoryOrders.productCategory = req.body.productCategory;
        existingInventoryOrders.availableQuantity = req.body.availableQuantity;
        existingInventoryOrders.requestedQuantity = req.body.requestedQuantity;
        existingInventoryOrders.status = req.body.status;
        
        existingInventoryOrders
          .save()
          .then(() => res.json('Inventory Order updated!'))
          .catch((error) => res.status(400).json("Error: " + error));
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };
  
  const deleteInventoryOrder = async (req, res) => {
    InventoryOrders.findByIdAndDelete(req.params.id)
      .then((deletedInventoryOrder) => {
        res.json('Inventory Order deleted');
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };

  const updateStatus = async (req, res) => {
    InventoryOrders.findByIdAndUpdate(req.params.id)
      .then((existingInventoryOrders) => {
       
        existingInventoryOrders.status = req.body.status;
        
        existingInventoryOrders
          .save()
          .then(() => res.json('Inventory Order updated!'))
          .catch((error) => res.status(400).json("Error: " + error));
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };
  
  module.exports = {
    addInventoryOrders,
    getInventoryOrders,
    getInventoryOrdersById,
    updateInventoryOrders,
    deleteInventoryOrder,
    updateStatus
   
  }