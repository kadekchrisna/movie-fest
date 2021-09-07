require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const Routes = require("./src/routes/routes");
const AdditionalDelivery = require("./src/delivery/v1/additional");

const app = express();
const port = process.env.SERVER_PORT || 3000;

const AdditionalHandler = new AdditionalDelivery();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(AdditionalHandler.errorHandler);
app.use("/api", Routes);
app.use(AdditionalHandler.notFound);

app.listen(port, () => {
    console.log("Server started at :", port)
});
