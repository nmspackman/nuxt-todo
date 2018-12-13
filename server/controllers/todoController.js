let Todo = require('../models/todo')

exports.todo_list = function(req, res, next) {
  Todo.find({}, 'text category')
    .populate('user')
    .exec(function(err, list_todos) {
      if (err) return next(err)
      res.render('todo_list', { todo_list: list_todos })
    })
}
