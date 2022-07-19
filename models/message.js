import mongoose from "mongoose";

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  //   conversationId: {type: Schema.Types.ObjectId, ref: 'Conversation'},
  conversationId: { type: String },
  sender: { type: Schema.Types.ObjectId, ref: "Profile" },
  text: { type: String },
});

const Message = mongoose.model("Message", messageSchema);

export { Message };
