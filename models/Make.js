const mongoose = require("mongoose")
const Joi = require("joi")

const makeSchema = new mongoose.Schema({
  name: String,
  image: String,
})

const makeJoi = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  image: Joi.string().uri().min(1).required(),
})

const Make = mongoose.model("Make", makeSchema)

module.exports.Make = Make
module.exports.makeJoi = makeJoi
