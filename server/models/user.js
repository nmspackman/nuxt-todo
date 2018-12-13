const mongoose = require('mongoose')
let Schema = mongoose.Schema

let UserSchema = new Schema({
  first_name: { type: String, required: true, max: 100 },
  last_name: { type: String, required: true, max: 100 }
})

UserSchema.virtual('full_name').get(function() {
  return `${this.first_name} ${this.last_name}`
})

module.exports = mongoose.model('User', UserSchema)
