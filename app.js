const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const apiRoutes = require('./src/modules/routes/routes');

const app = express();
const PORT = 8000;

const URL = 'mongodb+srv://userOne:NotAStrongPassword@cluster0.uptqx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended : false})); 

app.use('/', apiRoutes);

app.listen(PORT, () =>{
  console.log(`Listening to port ${PORT}`);
});