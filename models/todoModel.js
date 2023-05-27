const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    Comment:{ type : String, required:true},
},{
    timestamps:true
})
const todoSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    isDone:{
        type:Boolean,
        default:false
    },
    Comments:[commentSchema],
},{
    timestamps:true
})

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;