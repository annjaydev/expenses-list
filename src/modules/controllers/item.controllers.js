const Item = require('../../db/models/item/index');
const { v4: uuidv4 } = require('uuid');

const getAllItems = async (req, res) => {
  const result = await Item.find();
  res.send(result);
};

const createItem = async (req, res) => {
  const body = req.body;
  
  const item = new Item({
    id : uuidv4(), 
    text: body.text, 
    sum: body.sum
  });

  await item.save();
  const result = await Item.find();
  
  res.send(result);
};

const updateItem = async (req, res) => {
  const body = req.body;
  
  const editedItem = await Item.findOne({id: body.id});

  editedItem.text = body.text;
  editedItem.sum = body.sum;

  await editedItem.save();
  const result = await Item.find();

  res.send(result);
};

const deleteItem = async (req, res) => {
  const id = req.query.id; 

  await Item.deleteOne({id: id});
  const result = await Item.find();

  res.send(result);
};

module.exports = {
  getAllItems,
  createItem,
  updateItem,
  deleteItem
};
