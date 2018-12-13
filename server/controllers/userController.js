var User = require('../models/user')
var Todo = require('../models/todo')
const async = require('async')

exports.user_create_post = function(req, res, next) {
  res.render('hello')
}

// Display list of all Users.
exports.user_list = function(req, res, next) {
  User.find()
    .sort([['last_name', 'ascending']])
    .exec(function(err, list_users) {
      if (err) return next(err)
      res.render('user_list', { user_list: list_users })
    })
}

exports.user_detail = function(req, res, next) {
  async.parallel(
    {
      user: function(callback) {
        User.findById(req.params.id).exec(callback)
      },
      user_todos: function(callback) {
        Todo.find({ user: req.params.id }, 'text category').exec(callback)
      }
    },
    function(err, results) {
      if (err) return next(err)
      if (results.user == null) {
        let err = new Error('User not found')
        err.status = 404
        return next(err)
      }
      res.render('user_detail', {
        user: results.user,
        user_todos: results.user_todos
      })
    }
  )
}
