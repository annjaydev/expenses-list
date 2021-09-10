const mongoose = require('mongoose');
const { Schema } = mongoose;

const setDate = () => {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth();
  const year = now.getFullYear();

  return `${day}.${month}.${year}`;
}

const itemSchema = new Schema({
    id: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    sum: {
      type: Number,
      required: true
    },
    date: { 
      type: String, 
      required: true, 
      default: setDate
    }
  });

const Item = mongoose.model('items', itemSchema);

module.exports = Item;