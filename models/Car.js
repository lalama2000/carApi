const mongoose = require("mongoose")
const Joi = require("joi")
const carSchema = new mongoose.Schema({
  make: {
    type: mongoose.Types.ObjectId,
    ref: "Make",
  },
  model: String,
  price: Number,
  year: Number,
  miles: Number,
  photo360: [String],
  body: String,
  cylinders: Number,
  engine: String,
  horsePower: Number,
  passengerCapacity: Number,
  driveType: String,
  size: Number,
  torque: Number,
  transmission: String,
  remoteStart: {
    type: Boolean,
    default: false,
  },
  powerWindows: {
    type: Boolean,
    default: false,
  },
  powerLocks: {
    type: Boolean,
    default: false,
  },
  powerSeats: {
    type: Boolean,
    default: false,
  },
  powerMirrors: {
    type: Boolean,
    default: false,
  },
  cruiseControl: {
    type: Boolean,
    default: false,
  },
  type: {
    type: mongoose.Types.ObjectId,
    ref: "Type",
  },

  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
})
const carAddJoi = Joi.object({
  make: Joi.string().min(1).max(200),
  model: Joi.string().min(1).max(200),
  price: Joi.number().min(1),
  miles: Joi.number().min(1),
  year: Joi.number().min(1800),
  photo360: Joi.array().items(Joi.string().uri()).min(1),
  body: Joi.string().min(1).max(1000),
  cylinders: Joi.number().min(1).max(100),
  engine: Joi.string().min(1).max(200),
  horsePower: Joi.number().min(1),
  passengerCapacity: Joi.number().min(1).max(100),
  driveType: Joi.string().min(1).max(100),
  size: Joi.number().min(1).max(100),
  torque: Joi.number().min(1),
  transmission: Joi.string().min(1).max(1000),
  remoteStart: Joi.boolean(),
  powerWindows: Joi.boolean(),
  powerLocks: Joi.boolean(),
  powerSeats: Joi.boolean(),
  powerMirrors: Joi.boolean(),
  cruiseControl: Joi.boolean(),
  type: Joi.string().min(1).max(200),
})
const carEditJoi = Joi.object({
  make: Joi.string().min(1).max(200),
  model: Joi.string().min(1).max(200),
  price: Joi.number().min(1),
  miles: Joi.number().min(1),
  year: Joi.number().min(1800),
  photo360: Joi.array().items(Joi.string().uri()).min(1),
  body: Joi.string().min(1).max(1000),
  cylinders: Joi.number().min(1).max(100),
  engine: Joi.string().min(1).max(200),
  horsePower: Joi.number().min(1),
  passengerCapacity: Joi.number().min(1).max(100),
  driveType: Joi.string().min(1).max(100),
  size: Joi.number().min(1).max(100),
  torque: Joi.number().min(1),
  transmission: Joi.string().min(1).max(1000),
  remoteStart: Joi.boolean(),
  powerWindows: Joi.boolean(),
  powerLocks: Joi.boolean(),
  powerSeats: Joi.boolean(),
  powerMirrors: Joi.boolean(),
  cruiseControl: Joi.boolean(),
  type: Joi.string().min(1).max(200),
})

const Car = mongoose.model("Car ", carSchema)

module.exports.Car = Car
module.exports.carAddJoi = carAddJoi
module.exports.carEditJoi = carEditJoi
