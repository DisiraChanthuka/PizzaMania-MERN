const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const salarySchema = new Schema({
    empId: { type: String, required: true },
    basicSalary: { type: String, required: true },
    otRate: { type: String, required: true },
});

const Salary = mongoose.model('Salary', salarySchema);

module.exports = Salary;