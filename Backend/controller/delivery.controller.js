const Delivery = require("../models/delivery.model");

const addDelivery = async (req, res) => {
    const { deliveryId,orderId, customer, item1, quantity1, item2, quantity2,item3, quantity3, deliveryAddress,amount, orderStatus, assignedEmp } =
      req.body;
  
    const delivery = new Delivery({
      deliveryId,
        orderId,
        customer,
        item1,
        quantity1,
        item2,
        quantity2,
        item3,
        quantity3,
        deliveryAddress,
        amount,
        orderStatus,
        assignedEmp
    });
  
    await delivery
      .save()
      .then(() => res.json(delivery._id))
      .catch((error) => res.status(400).json("Error: " + error));
  };

  const getDelivery = async (req, res) => {
    try {
      const delivery = await Delivery.find();
      res.json(delivery);
    } catch (error) {
      res.status(500).send("Server Error" + error);
    }
  };

  const getDeliveryById = async (req, res) => {
    try {
      const delivery = await Delivery.findById(req.params.id);
      res.json(delivery);
    } catch (error) {
      res.status(500).send("Server Error" + error);
    }
  };

  const updateDelivery = async (req, res) => {
    Delivery.findByIdAndUpdate(req.params.id)
      .then((existingDelivery) => {
        existingDelivery.deliveryId = req.body.deliveryId;
        existingDelivery.orderId = req.body.orderId;
        existingDelivery.customer = req.body.customer;
        existingDelivery.item1 = req.body.item1;
        existingDelivery.quantity1 = req.body.quantity1;
        existingDelivery.item2 = req.body.item2;
        existingDelivery.quantity2 = req.body.quantity2;
        existingDelivery.item3 = req.body.iteme3;
        existingDelivery.quantity3 = req.body.quantity3;
        existingDelivery.deliveryAddress = req.body.deliveryAddress;
        existingDelivery.amount = req.body.amount;
        existingDelivery.orderStatus = req.body.orderStatus;
        existingDelivery.assignedEmp = req.body.assignedEmp;
        
        existingDelivery
          .save()
          .then(() => res.json('Delivery updated!'))
          .catch((error) => res.status(400).json("Error: " + error));
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };
  
  const deleteDelivery = async (req, res) => {
    Delivery.findByIdAndDelete(req.params.id)
      .then((deletedDelivery) => {
        res.json('Delivery deleted');
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };

  const updateDeliveryStatus = async (req, res) => {
    Delivery.findByIdAndUpdate(req.params.id)
      .then((existingDelivery) => {
       
        existingDelivery.orderStatus = req.body.orderStatus;
        
        existingDelivery
          .save()
          .then(() => res.json('Delivery Status updated!'))
          .catch((error) => res.status(400).json("Error: " + error));
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };
  
  module.exports = {
    addDelivery,
    getDelivery,
    getDeliveryById,
    updateDelivery,
    deleteDelivery,
    updateDeliveryStatus
   
  }