const express = require("express")
const checkAdmin = require("../middleware/checkAdmin")
const checkId = require("../middleware/checkId")
const validateBody = require("../middleware/validateBody")
const { Type, typeJoi } = require("../models/Type")
const router = express.Router()
//------------------------------get all type------------------------------//
router.get("/", async (req, res) => {
  const types = await Type.find()
  res.json(types)
})
//------------------------------post all type------------------------------//
router.post("/", checkAdmin, validateBody(typeJoi), async (req, res) => {
  try {
    const { name, image } = req.body
    const type = new Type({
      name,
      image,
    })
    await type.save()

    res.json(type)
  } catch (error) {
    res.status(500).send(error.message)
    console.log(error)
  }
})

//------------------------------edit type------------------------------//
router.put("/:id", checkAdmin, checkId, validateBody(typeJoi), async (req, res) => {
  try {
    const { name, image } = req.body

    const type = await Type.findByIdAndUpdate(req.params.id, { $set: { name, image } }, { new: true })
    if (!type) return res.status(404).send("type not found")
    res.json(type)
  } catch (error) {
    res.status(500).send(error)
  }
})

//------------------------------delete type------------------------------//
router.delete("/:id", checkAdmin, checkId, async (req, res) => {
  try {
    const type = await Type.findByIdAndRemove(req.params.id)
    if (!type) return res.status(404).send("type not found")
    res.send("type removed")
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router
