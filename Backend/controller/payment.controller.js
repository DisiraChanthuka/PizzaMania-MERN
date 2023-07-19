const Payment = require("../models/payment.model");

const addPayment = async (req, res) => {
    const { orderId, amount, givenAmount, change } =
      req.body;
  
    const payment = new Payment({
        orderId,
        amount,
        givenAmount,
        change
    });
  
    await payment
      .save()
      .then(() => res.json('Payment added!'))
      .catch((error) => res.status(400).json("Error: " + error));
  };

  const getPayments = async (req, res) => {
    try {
      const payment = await Payment.find();
      res.json(payment);
    } catch (error) {
      res.status(500).send("Server Error" + error);
    }
  };

  const getPaymentById = async (req, res) => {
    try {
      const payment = await Payment.findById(req.params.id);
      res.json(order);
    } catch (error) {
      res.status(500).send("Server Error" + error);
    }
  };

  const updatePayment = async (req, res) => {
    Payment.findByIdAndUpdate(req.params.id)
      .then((existingPayment) => {
        existingPayment.orderId = req.body.orderId;
        existingPayment.amount = req.body.amount;
        existingPayment.givenAmount = req.body.givenAmount;
        existingPayment.change = req.body.change;
      
        
        existingPayment
          .save()
          .then(() => res.json('Payment updated!'))
          .catch((error) => res.status(400).json("Error: " + error));
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };

//   const updatePaymentStatus = async (req, res) => {
//     Order.findByIdAndUpdate(req.params.id)
//       .then((existingPayment) => {
       
//         existingPayment.orderStatus = req.body.orderStatus;
        
//         existingOrder
//           .save()
//           .then(() => res.json('Order Status updated!'))
//           .catch((error) => res.status(400).json("Error: " + error));
//       })
//       .catch((error) => res.status(400).json("Error: " + error));
//   };
  
  const deletePayment = async (req, res) => {
    Payment.findByIdAndDelete(req.params.id)
      .then((deletedOrder) => {
        res.json('Payment deleted');
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };
  
  module.exports = {
    addPayment,
    getPayments,
    getPaymentById,
    updatePayment,
    deletePayment,
   
   
  }