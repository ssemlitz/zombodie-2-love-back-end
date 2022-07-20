import mongoose from 'mongoose'

const Schema = mongoose.Schema

const chatSchema = new Schema({
  members: [{type: Schema.Types.ObjectId, ref: 'Profile'}]
}, {
  timestamps: true
}
)


const Chat = mongoose.model('chat', chatSchema)

export { Chat }