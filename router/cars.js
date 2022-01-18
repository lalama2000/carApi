const express = require("express")
const checkAdmin = require("../middleware/checkAdmin")
const checkId = require("../middleware/checkId")
const validateBody = require("../middleware/validateBody")
const validateid = require("../middleware/validateid")
const checkToken = require("../middleware/checkToken")
const { Car, carAddJoi, carEditJoi } = require("../models/Car")
const { User } = require("../models/User")
const router = express.Router()

//------------------------------get all cars------------------------------//
router.get("/", async (req, res) => {
  const cars = await Car.find().populate("make").populate("type")
  res.json(cars)
})

//------------------------------get one cars------------------------------//
router.get("/:id", checkId, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate("type").populate("make")

    if (!car) return res.status(404).send("car not found")

    res.json(car)
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message)
  }
})

//------------------------------post cars------------------------------//
router.post("/", checkAdmin, validateBody(carAddJoi), async (req, res) => {
  try {
    const {
      make,
      model,
      price,
      year,
      miles,
      photo360,
      body,
      cylinders,
      engine,
      horsePower,
      passengerCapacity,
      driveType,
      size,
      torque,
      transmission,
      remoteStart,
      powerWindows,
      powerLocks,
      powerSeats,
      powerMirrors,
      cruiseControl,
      type,
    } = req.body

    const car = new Car({
      make,
      model,
      price,
      year,
      miles,
      photo360,
      body,
      cylinders,
      engine,
      horsePower,
      passengerCapacity,
      driveType,
      size,
      torque,
      transmission,
      remoteStart,
      powerWindows,
      powerLocks,
      powerSeats,
      powerMirrors,
      cruiseControl,
      type,
    })
    await car.save()
    res.json(car)
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message)
  }
})

//------------------------------edit cars------------------------------//

router.put("/:id", checkAdmin, checkId, validateBody(carEditJoi), async (req, res) => {
  try {
    const {
      make,
      model,
      price,
      year,
      miles,
      photo360,
      body,
      cylinders,
      engine,
      horsePower,
      passengerCapacity,
      driveType,
      size,
      torque,
      transmission,
      remoteStart,
      powerWindows,
      powerLocks,
      powerSeats,
      powerMirrors,
      cruiseControl,
      type,
    } = req.body

    const car = await Car.findByIdAndUpdate(
      req.params.id,

      {
        $set: {
          make,
          model,
          price,
          year,
          miles,
          photo360,
          body,
          cylinders,
          engine,
          horsePower,
          passengerCapacity,
          driveType,
          size,
          torque,
          transmission,
          remoteStart,
          powerWindows,
          powerLocks,
          powerSeats,
          powerMirrors,
          cruiseControl,
          type,
        },
      },
      { new: true }
    )
    if (!car) return res.status(404).send("car not found")
    res.json(car)
  } catch (error) {
    console.log(error)
    res.status(300).send(error.message)
  }
})

//------------------------------delete car------------------------------//

router.delete("/:id", checkAdmin, checkId, async (req, res) => {
  try {
    const car = await Car.findByIdAndRemove(req.params.id)
    if (!car) return res.status(404).send("car not found")
    res.send("car is removed")
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

//------------------------------Likes------------------------------//
router.get("/:carId/likes", checkToken, validateid("carId"), async (req, res) => {
  try {
    const car = await Car.findById(req.params.carId)
    if (!car) return res.status(404).send("car not found")
    const userFound = car.likes.find(like => like == req.userId)
    if (userFound) {
      await Car.findByIdAndUpdate(req.params.carId, { $pull: { likes: req.userId } })
      await User.findByIdAndUpdate(req.userId, { $pull: { likes: req.params.carId } })

      res.send("remove like from car")
    } else {
      await Car.findByIdAndUpdate(req.params.carId, { $push: { likes: req.userId } })
      await User.findByIdAndUpdate(req.userId, { $push: { likes: req.params.carId } })
      res.send("car liked")
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message)
  }
})
module.exports = router
