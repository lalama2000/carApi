const mongoose = require("mongoose")
const Joi = require("joi")
const orderSchema = new mongoose.Schema(
  {
    car: String,
    user: String,
  },
  { timestamps: true }
  // creates a createdAt and updatedAt field while your inserting documents in the document itself
)

const orderJoi = Joi.object({
  car: Joi.string().min(2).max(100).required(),
  user: Joi.string().min(1).max(100).required(),
})

const Order = mongoose.model("Order", orderSchema)

module.exports.Order = Order
module.exports.orderJoi = orderJoi
