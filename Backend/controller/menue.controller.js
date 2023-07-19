const Menue = require("../models/menue.model");

const addMenue = async (req, res) => {
    const { itemCategory, itemName, size, price, onSale} =
      req.body;
  
    const menue = new Menue({
        itemCategory,
        itemName,
        size,
        price,
        onSale
    });
  
    await menue
      .save()
      .then(() => res.json('Menue added!'))
      .catch((error) => res.status(400).json("Error: " + error));
  };

//   const getEmployees = async (req, res) => {
//     try {
//       const employee = await Employee.find();
//       res.json(employee);
//     } catch (error) {
//       res.status(500).send("Server Error" + error);
//     }
//   };

//   const getEmployeeById = async (req, res) => {
//     try {
//       const employee = await Employee.findById(req.params.id);
//       res.json(employee);
//     } catch (error) {
//       res.status(500).send("Server Error" + error);
//     }
//   };

//   const updateEmployee = async (req, res) => {
//     Employee.findByIdAndUpdate(req.params.id)
//       .then((existingEmployee) => {
//         existingEmployee.empID = req.body.empID;
//         existingEmployee.fullName = req.body.fullName;
//         existingEmployee.contactNo = req.body.contactNo;
//         existingEmployee.position = req.body.position;
//         existingEmployee.salary = req.body.salary;
//         existingEmployee.holidays = req.body.holidays;
        
//         existingEmployee
//           .save()
//           .then(() => res.json('Employee updated!'))
//           .catch((error) => res.status(400).json("Error: " + error));
//       })
//       .catch((error) => res.status(400).json("Error: " + error));
//   };
  
//   const deleteEmployee = async (req, res) => {
//     Employee.findByIdAndDelete(req.params.id)
//       .then((deletedEmployee) => {
//         res.json('Employee deleted');
//       })
//       .catch((error) => res.status(400).json("Error: " + error));
//   };
  
  module.exports = {
    addMenue,
    // getEmployees,
    // getEmployeeById,
    // updateEmployee,
    // deleteEmployee,
   
  }