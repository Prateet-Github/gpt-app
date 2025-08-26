import Chat from "../models/Chat.js";

// API to create a new chat for a user

export const createChat = async (req, res) => {
  try {
    
    const userId = req.user._id;

    const chatData = {
      userId: userId,
      name: 'New Chat',
      username: req.user.username,
      messages: []
    };
    
    await Chat.create(chatData);
    res.status(201).json({ success: true, message: "Chat created successfully" });

  } catch (error) {
    console.error("Create Chat Error:", error.message);
    res.status(500).json({ success: false, message: error.message });

  }
}

// API to get all chats for a user

export const getChats = async (req, res) => {
  try {
    const userId = req.user._id;
    const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });
    res.status(200).json({ success: true, chats });
  } catch (error) {
    console.error("Get Chats Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

// API to delete a chat by ID

export const deleteChat = async (req, res) => {
  try {
    const chatId = req.params.id;
    const userId = req.user._id;

    const chat = await Chat.findOne({ _id: chatId, userId });
    if (!chat) {
      return res.status(404).json({ success: false, message: "Chat not found" });
    }

    await Chat.deleteOne({ _id: chatId });
    res.status(200).json({ success: true, message: "Chat deleted successfully" });
  } catch (error) {
    console.error("Delete Chat Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}