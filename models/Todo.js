const mongoose = require('mongoose')



const todo = new mongoose.Schema({
    id:String,
    text:String
})


module.exports = mongoose.model('Todo',todo)