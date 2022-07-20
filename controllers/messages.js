import { Message } from "../models/message.js";

async function create(req, res) {
  const {chatId, senderId, text} = req.body
  const message = new Message({
    chatId,
    senderId,
    text
  })
  try {
    const result = await message.save()
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function show(req, res) {
  const {chatId} = req.params
  // 62d4bbc3cab99cacbaaf9db0
  try {
    const result = await Message.find({chatId: chatId})
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  create,
  show
}