const Salary = require("../models/salary.model");

const addSalary = async (req, res) => {
    const { empId, basicSalary,otRate} =
      req.body;
  
    const newsalary = new Salary({
        empId,
        basicSalary,
        otRate
    });
  
    await newsalary
      .save()
      .then(() => res.json('Salary added!'))
      .catch((error) => res.status(400).json("Error: " + error));
  };

  const getSalary = async (req, res) => {
    try {
      const salary = await Salary.find();
      res.json(salary);
    } catch (error) {
      res.status(500).send("Server Error" + error);
    }
  };

  const getSalaryById = async (req, res) => {
    try {
      const salary = await Salary.findById(req.params.id);
      res.json(salary);
    } catch (error) {
      res.status(500).send("Server Error" + error);
    }
  };

  const updateSalary = async (req, res) => {
    Salary.findByIdAndUpdate(req.params.id)
      .then((existingSalary) => {
        existingSalary.empId = req.body.empId;
        existingSalary.basicSalary = req.body.basicSalary;
        existingSalary.otRate = req.body.otRate;
        
        
        existingSalary
          .save()
          .then(() => res.json('Salary updated!'))
          .catch((error) => res.status(400).json("Error: " + error));
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };
  
  const deleteSalary = async (req, res) => {
    Salary.findByIdAndDelete(req.params.id)
      .then((deletedSalary) => {
        res.json('Salary deleted');
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };
  
  module.exports = {
    addSalary,
    getSalary,
    getSalaryById,
    updateSalary,
    deleteSalary,
  

   
  }