const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Item = require('../../model/Item');

//@Route GET api/items
//@desc get all items
//@acess Public

router.get('/', (req, res) => {
    Item.find()
    .sort ({ date: -1})
    .then(items => res.json(items));
});

//@Route post api/items
//@desc create post
//@acess Public

router.post('/', (req, res) => {
   const newItem = new Item({
       name: req.body.name
   }); // based on model
   newItem.save().then(item => res.json(item));
   
});

//@Route delete/items/:id
//@desc delete item
//@acess Public

router
  .delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ sucess: true })))
    .catch(err => res.status(404).json({ sucess: false }));
 });
 

module.exports = router;
