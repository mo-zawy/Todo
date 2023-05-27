const express = require('express');
const router = express.Router();
const {getAllTodos , createTodo , getTodoById , deleteTodo ,updateTodo , addComment , deleteComment} = require('../controllers/todoController')

router.route('/').get(getAllTodos).post(createTodo)
router.route('/:id').get(getTodoById).delete(deleteTodo).patch(updateTodo)
router.route('/:id/comment').patch(addComment)
router.route('/:id/comment/:commentId').delete(deleteComment)

module.exports = router;