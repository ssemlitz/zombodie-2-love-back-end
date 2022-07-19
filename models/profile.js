import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  email: { type: String, required: true, lowercase: true, unique: true },
  name: String,
  photo: { type: String },
  species: { type: String, enum: ['Human' , 'Halfbies', 'Zombie']},
  brains: Boolean,
  age: Number,
  height: Number,
  bio: String,
  swiped: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
  liked: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
