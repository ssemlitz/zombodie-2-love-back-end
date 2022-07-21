import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  email: { type: String, required: true, lowercase: true, unique: true },
  name: {type: String},
  photo: { type: String },
  species: { type: String, enum: ['Human', 'Zombie', 'Halfbie']},
  brains:{type: Boolean},
  prefersZombie: {type: Boolean},
  prefersHuman: {type: Boolean},
  prefersHalfbie: {type: Boolean},
  age: {type: Number},
  height: {type: Number},
  bio: {type: String},
  owner:{type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
  disliked: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
  liked: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
}, {
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
