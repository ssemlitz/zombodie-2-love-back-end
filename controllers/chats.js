import { Chat } from '../models/chat.js'

async function create(req, res) {

  const newChat = new Chat({
    members: [req.body.senderId, req.body.receiverId]
  })

  try {
    const response = await newChat.save()
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json(error)
  } 
}

async function show(req, res){
  try {
    const chat = await Chat.find({
      members: {$in: [req.user.profile]}
    })
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function findChat(req, res) {
  try {
    const chat = await Chat.findOne({
      members: {$all: [req.params.firstId, req.params.secondId]}
    })
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  create,
  show,
  findChat
}