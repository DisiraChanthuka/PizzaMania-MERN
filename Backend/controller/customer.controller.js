const Customer = require("../models/customer.model");

const addCustomer = async (req, res) => {
    const { fullName, email, contactNo, address } =
      req.body;
  
    const customer = new Customer({
        
        fullName,
        email,
        contactNo,
        address
    });
  
    await customer
      .save()
      .then(() => res.json('Customer added!'))
      .catch((error) => res.status(400).json("Error: " + error));
  };

  const getCustomers = async (req, res) => {
    try {
      const customer = await Customer.find();
      res.json(customer);
    } catch (error) {
      res.status(500).send("Server Error" + error);
    }
  };

  const getCustomerById = async (req, res) => {
    try {
      const customer = await Customer.findById(req.params.id);
      res.json(customer);
    } catch (error) {
      res.status(500).send("Server Error" + error);
    }
  };


  const updateCustomer = async (req, res) => {
    Customer.findByIdAndUpdate(req.params.id)
      .then((existingCustomer) => {
        existingCustomer.fullName = req.body.fullName;
        existingCustomer.email = req.body.email;
        existingCustomer.contactNo = req.body.contactNo;
        existingCustomer.address = req.body.address;
       
        
        existingCustomer
          .save()
          .then(() => res.json('Customer updated!'))
          .catch((error) => res.status(400).json("Error: " + error));
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };
  
  const deleteCustomer = async (req, res) => {
    Customer.findByIdAndDelete(req.params.id)
      .then((deletedCustomer) => {
        res.json('Customer deleted');
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };
  
  module.exports = {
    addCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
   
   
  }