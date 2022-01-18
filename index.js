const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const Joi = require("joi")
const JoiObjectId = require("joi-objectid")
Joi.ObjectId = JoiObjectId(Joi)
const users = require("./router/users")
const cars = require("./router/cars")
const makes = require("./router/makes")
const types = require("./router/types")
const orders = require("./router/orders")

mongoose
  .connect(
    `mongodb+srv://lama-2000:${process.env.MONGODB_PASSWORD}@cluster0.hfgau.mongodb.net/carlaDB?retryWrites=true&w=majority`
  )

  .then(() => console.log("conect to ManogoDB"))
  .catch(error => console.log("Erorr concting to ManogoDB", error))

const app = express()
app.use(express.json())

app.use(cors())
app.use("/api/auth", users)
app.use("/api/cars", cars)
app.use("/api/makes", makes)
app.use("/api/types", types)
app.use("/api/orders", orders)

const port = process.en.PORT || 3020
app.listen(port, () => console.log("sever is listing", port))
