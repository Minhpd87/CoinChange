const config = require("./configs/config");

const express = require("express");

const app = express();

const chalk = require("chalk");

const mongoose = require("mongoose");

const payRouter = require("./controllers/payRouter");
const dateRouter = require("./controllers/dateRouter");

//import middleware
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

//open mongoDB connection
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    reconnectTries: 30,
    reconnectInterval: 500,
    connectTimeoutMS: 5000
  })
  .then(() => {
    console.log(chalk.yellow(`Connected to MongoDB`));
  })
  .catch(error => {
    console.log(chalk.red(`Error connecting to MongoDB:`, error.message));
  });

//Fix for update data warning when using findByIdAndUpdate
mongoose.set("useFindAndModify", false);

app.use(express.static("build"));

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));

app.use("/api/paymentData", payRouter);
app.use("/api/dateData", dateRouter);

module.exports = app;
