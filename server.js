const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const items = require('./routes/api/items')

const app = express()

//BodyParser middleware
app.use(bodyParser.json())

// Connect to Mongo
mongoose.connect('mongodb://localhost/mern_shopping_list',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

//  Use routes
app.use('/api/items', items)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));