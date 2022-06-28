import mongoose from "mongoose";

const userSchema: mongoose.Schema = new mongoose.Schema({
  id: {type: String},
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  birthDate: {type: Date, required: true}
}, {
  versionKey: false
})

const users = mongoose.model('users', userSchema);

export default users;