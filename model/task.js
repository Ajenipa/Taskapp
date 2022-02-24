const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
    name:{type:String, required:[true, "must provide name"],maxlength:200, trim:true },
    completed:{type:Boolean, default:false}
})
module.exports = mongoose.model('Taski', taskSchema)