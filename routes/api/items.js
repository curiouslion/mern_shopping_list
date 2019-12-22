const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Item model
const Item = require("../../models/Item");

// @route GET api/items
// @desc Get all Items
// @access Public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route POST api/items
// @desc Create a Post
// @access Private

// not using async-await
router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.json(item));
});

// @route DELETE api/items
// @desc delete a Item
// @access Private
router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ sucess: true })))
    .catch(err => res.status(404).json({ sucess: false }));
});

// export default router // es6
module.exports = router;
