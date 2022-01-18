const express = require("express")
const checkAdmin = require("../middleware/checkAdmin")
const checkId = require("../middleware/checkId")
const validateBody = require("../middleware/validateBody")
const { Make, makeJoi } = require("../models/Make")
const router = express.Router()
//------------------------------get all make------------------------------//

router.get("/", async (req, res) => {
  const makes = await Make.find()
  res.json(makes)
})
//------------------------------post make------------------------------//

router.post("/", checkAdmin, validateBody(makeJoi), async (req, res) => {
  try {
    const { name, image } = req.body

    const make = new Make({
      name,
      image,
    })
    await make.save()

    res.json(make)
  } catch (error) {
    res.status(500).send(error.message)
    console.log(error)
  }
})
//------------------------------edit make------------------------------//

router.put("/:id", checkAdmin, checkId, validateBody(makeJoi), async (req, res) => {
  try {
    const { name, image } = req.body

    const make = await Make.findByIdAndUpdate(req.params.id, { $set: { name, image } }, { new: true })
    if (!make) return res.status(404).send("make not found")
    res.json(make)
  } catch (error) {
    res.status(500).send(error)
  }
})
//------------------------------delete make------------------------------//

router.delete("/:id", checkAdmin, checkId, async (req, res) => {
  try {
    const makes = await Make.findByIdAndRemove(req.params.id)
    if (!makes) return res.status(404).send("make not found")

    res.send("make removed")
  } catch (error) {
    res.status(500).send(error)
  }
})
module.exports = router
