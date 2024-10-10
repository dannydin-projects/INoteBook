require('dotenv').config()
const mongoose =require('mongoose');
const connectMongo = ()=>{
    mongoose.connect(process.env.MONGOURI)
    .then(console.log("Connected to MongoDB"))
    .catch(err=>console.log(err));
}
module.exports=connectMongo;
