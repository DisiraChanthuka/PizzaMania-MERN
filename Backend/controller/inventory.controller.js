const Inventory = require("../models/inventory.model");

const addInventory = async (req, res) => {
    const { productID, productName, productCategory, quantity } =
      req.body;
  
    const inventory = new Inventory({
        productID,
        productName,
        productCategory,
        quantity
    });
  
    await inventory
      .save()
      .then(() => res.json('Inventory added!'))
      .catch((error) => res.status(400).json("Error: " + error));
  };

  const getInventorys = async (req, res) => {
    try {
      const inventory = await Inventory.find();
      res.json(inventory);
    } catch (error) {
      res.status(500).send("Server Error" + error);
    }
  };

  const getInventoryById = async (req, res) => {
    try {
      const inventory = await Inventory.findById(req.params.id);
      res.json(inventory);
    } catch (error) {
      res.status(500).send("Server Error" + error);
    }
  };

  const updateInventory = async (req, res) => {
    Inventory.findByIdAndUpdate(req.params.id)
      .then((existingInventory) => {
        existingInventory.productID = req.body.productID;
        existingInventory.productName = req.body.productName;
        existingInventory.productCategory = req.body.productCategory;
        existingInventory.quantity = req.body.quantity;
      
        
        existingInventory
          .save()
          .then(() => res.json('Inventory updated!'))
          .catch((error) => res.status(400).json("Error: " + error));
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };
  
  const deleteInventory = async (req, res) => {
    Inventory.findByIdAndDelete(req.params.id)
      .then((deletedInventory) => {
        res.json('Inventory deleted');
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };
  
  module.exports = {
    addInventory,
    getInventorys,
    getInventoryById,
    updateInventory,
    deleteInventory,
   
  }