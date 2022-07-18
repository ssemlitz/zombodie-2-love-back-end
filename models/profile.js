import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, unique: true },
  name: String,
  photo: { type: String },
  species: { type: String, enum: ['human', 'zombie', 'halfbies']},
  brains: Boolean,
  age: Number,
  height: Number,
  bio: String,
  // swiped: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
  // liked: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
