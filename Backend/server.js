const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

//mongo db connection
const uri = process.env.ATLAS_URI;
mongoose.connect (uri, { useNewUrlParser : true, useUnifiedTopology : true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Mongo DB connection established successfully");
})

const employeeRouter = require('./routes/employee');
const workingScheduleRouter = require('./routes/workingSchedule');
const customerRouter = require('./routes/customer');
const feedbackRouter = require('./routes/feedback');
const OrderRouter = require('./routes/order');
const InventoryRouter = require('./routes/inventory');
const InventoryOrdersRouter = require('./routes/inventoryOrders');
const ProductRouter = require('./routes/product');
const DeliveryRouter = require('./routes/delivery');
const SalaryRouter = require('./routes/salary');
const UserRouter = require('./routes/user');
const scheduleRequest = require('./routes/scheduleRequest');
const OTRouter = require('./routes/overTime');
const PaymentRouter = require('./routes/payment');


app.use('/employee', employeeRouter);
app.use('/workingSchedule', workingScheduleRouter);
app.use('/customer', customerRouter);
app.use('/feedback', feedbackRouter);
app.use('/order', OrderRouter);
app.use('/inventory', InventoryRouter);
app.use('/inventoryOrders', InventoryOrdersRouter);
app.use('/product', ProductRouter);
app.use('/delivery', DeliveryRouter);
app.use('/salary', SalaryRouter);
app.use('/user', UserRouter);
app.use('/scheduleRequest',scheduleRequest);
app.use('/ot',OTRouter);
app.use('/payment',PaymentRouter);

app.listen(port, () => {
    console.log(`Server is running on port:-${port}`);
});