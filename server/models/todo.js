const mongoose = require('mongoose')
let Schema = mongoose.Schema

let TodoSchema = new Schema({
  text: { type: String, required: true, max: 100 },
  category: { type: String, required: true, max: 100 },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})

module.exports = mongoose.model('Todo', TodoSchema)
