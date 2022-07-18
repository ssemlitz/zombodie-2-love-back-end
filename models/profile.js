import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, unique: true },
  name: {type: String},
  photo: { type: String },
  species: { type: String, enum: ['human', 'zombie', 'halfbies']},
  brains:{type: Boolean},
  age: {type: Number},
  height: {type: Number},
  bio: {type: String},
  owner:{type: mongoose.Schema.Types.ObjectId, ref: "Profile"}
  // swiped: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
  // liked: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
