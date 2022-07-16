import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  conversationId: {type: String},
  sender: {type: String},
  text: {type: String}
})

const conversationSchema = new mongoose.Schema({
  participants: {type: Array},
  messages: [messageSchema],
}, {
  timestamps: true
}
)



const Conversation = mongoose.model('Conversation', conversationSchema)

export { Conversation }