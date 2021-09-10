const express = require('express');
const router = express.Router();

const {
  getAllItems,
  createItem,
  updateItem,
  deleteItem
} = require('../controllers/item.controllers');

router.get('/getAllItems', getAllItems);
router.post('/createItem', createItem);
router.put('/updateItem', updateItem);
router.delete('/deleteItem', deleteItem);

module.exports = router;