require('dotenv').config()
const connectMongo=require('./Mongo');
connectMongo();
const express = require('express')
const cors=require('cors')
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));
app.listen(process.env.PORT, () => {
  console.log(`Notes App started`)
})