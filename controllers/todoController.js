const e = require('express')
const Todo = require('../models/todoModel')

// @desc Fetch all todos
// @route GET /api/todos
// @access public
const getAllTodos = async (req,res)=>{
    const todos = await Todo.find({})
    res.json(todos)
}

// @desc Create a todo
// @route POST /api/todos
// @access public
const createTodo = async (req,res)=>{
    const {title , description} = req.body;
    const todo = new Todo({ title , description})
    await todo.save()
    res.json(todo)
}

// @desc Fetch a todo
// @route GET /api/todos/:id
// @access public
const getTodoById = async (req,res)=>{
    const {id} = req.params;
    try{
        const todo = await Todo.findById(id)
        res.json(todo)
    }catch(error){
        res.status(404).json({message:'Todo not found'})
        console.log(error)
    }
}
// @desc Update a todo
// @route PUT /api/todos/:id
// @access public
const updateTodo = async (req,res)=>{
    const {id} = req.params;
    const {title , description , isDone} = req.body;
    try{
        const todo = await Todo.findById(id)
        if(todo){
            todo.title = title || todo.title;
            todo.description = description || todo.description;
            todo.isDone = isDone || todo.isDone;
            await todo.save()
            res.json(todo)
        }else{
            res.status(404).json({message:'Todo not found'})
        }
    }catch(error){
            res.status(404).json({message:'Todo not found'})
            console.log(error)
    }
}

// @desc add a comment to a todo
// @route POST /api/todos/:id/comment
// @access public
const addComment = async (req,res)=>{
    const {id} = req.params;
    const {comment} = req.body;
    try{
        const todo = await Todo.findById(id)
        if(todo){
            todo.Comments.push({Comment:comment})
            await todo.save()
            res.json(todo)
        }else{
            res.status(404).json({message:'Todo not found'})
        }
    }catch(error){
            res.status(404).json({message:'Todo not found'})
            console.log(error)
    }   

}

// @desc delete a comment from a todo
// @route DELETE /api/todos/:id/comment/:commentId
// @access public
const deleteComment = async (req,res)=>{
    const {id , commentId} = req.params;
    try{
        const todo = await Todo.findById(id)
        console.log(todo.Comments)
        if(todo){
            todo.Comments = todo.Comments.filter(Comment=>Comment._id != commentId)
            await todo.save()
            res.json(todo)
        }else{
            res.status(404).json({message:'Todo not found'})
        }
    }catch(error){
            res.status(404).json({message:'Comment not found'})
            console.log(error)
    }
}

// @desc Delete a todo
// @route DELETE /api/todos/:id
// @access public
const deleteTodo = async (req,res)=>{
    const {id} = req.params;
    try{
        await Todo.findByIdAndDelete(id);
        res.json({message:'Todo deleted'})
    }catch(error){
        res.status(404).json({message:'Todo not found'})
        console.log(error)
    }
}

module.exports = {getAllTodos , createTodo , getTodoById , deleteTodo , updateTodo , addComment , deleteComment}