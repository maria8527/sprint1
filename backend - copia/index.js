const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors()); 

app.use("/api/", require("./rutas/vehiculos"));

app.set("port", process.env.PORT);
app.listen(app.get("port"), () => {
  console.log(`el servidor esta corriendo en el puerto ${app.get("port")}`);
});
