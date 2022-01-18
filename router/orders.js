const express = require("express")
const router = express.Router()
const pdf = require("pdf-creator-node")
const nodemailer = require("nodemailer")
const fs = require("fs/promises")
const path = require("path")
const { User } = require("../models/User")
const { Car } = require("../models/Car")
const checkToken = require("../middleware/checkToken")
const { Order } = require("../models/Order")

// ------------------------------Order------------------------------//
router.post("/:carId", checkToken, async (req, res) => {
  try {
    const order = new Order({
      user: req.userId,
      car: req.params.carId,
    })
    await order.save()

    await User.findByIdAndUpdate(req.userId, { $push: { orders: order._id } })

    const html = await fs.readFile(path.join(__dirname, "..", "utils", "template.html"), "utf-8")
    const car = await Car.findById(req.params.carId).populate("make").populate("type").lean()
    const user = await User.findById(req.userId).lean()

    const document = {
      html,
      data: { car, user },
      path: "./utils/contract.pdf",
    }

    const options = {
      format: "Letter",
      orientation: "portrait",
    }

    const pdfFile = await pdf.create(document, options)

    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: "test2000test1420@gmail.com",
        pass: "lama1420",
      },
    })

    await transporter.sendMail({
      from: '"CARLA" <{test2000test1420@gmail.com}>',
      to: user.email,
      subject: "Contract",
      html: `Hello, plaese check the attached contract pdf.`,
      attachments: [
        {
          content: await fs.readFile(path.join(__dirname, "..", "utils", "contract.pdf")),
          filename: "contract.pdf",
          contentType: "application/pdf",
        },
      ],
    })
    res.send("order created please check your email for the contract")
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

router.get("/", async (req, res) => {
  const order = await Order.find().populate("user").populate("car")
  res.json(order)

  // const html = await fs.readFile(path.join(__dirname, "..", "utils", "template.html"), "utf-8")
  // const car = await Car.findById(req.params.carId)
  // const user = await User.findById(req.userId)

  // const document = {
  //   html,
  //   data: { car, user },
  //   path: "./utils/contract.pdf",
  // }

  // const options = {
  //   format: "Letter",
  //   orientation: "portrait",
  // }

  // const pdfFile = await pdf.create(document, options)
  // res.send(pdfFile)
})

module.exports = router
