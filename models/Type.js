const mongoose = require("mongoose")
const Joi = require("joi")

const typeSchema = new mongoose.Schema({
  name: String,
  image: String,
})

const typeJoi = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  image: Joi.string().uri().min(1).required(),
})

const Type = mongoose.model("Type", typeSchema)

module.exports.Type = Type
module.exports.typeJoi = typeJoi
