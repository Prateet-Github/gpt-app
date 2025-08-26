import Chat from "../models/Chat.js";
import User from "../models/User.js";
import openai from "../configs/openai.js";
import imagekit from "../configs/imagekit.js";
import axios from "axios";


// Text message controller
export const textMessageController = async (req, res) => {
  try {
    const { chatId, prompt } = req.body;
    const userId = req.user._id;

    const chat = await Chat.findOne({ _id: chatId, userId });
    if (!chat) {
      return res.status(404).json({ success: false, message: "Chat not found" });
    }

    // Check credits
    if (req.user.credits < 1) {
      return res
        .status(403)
        .json({ success: false, message: "Insufficient credits" });
    }

    // Deduct credits first
    await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });

    // Push user message
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    // Gemini API call
    const response = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
    });

    const replyText =
      response.choices?.[0]?.message?.content ||
      response.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn’t generate a response.";

    const reply = {
      role: "assistant",
      content: replyText,
      timestamp: Date.now(),
      isImage: false,
    };

    // Push reply
    chat.messages.push(reply);
    await chat.save();

    res.status(200).json({ success: true, reply });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Image message controller
export const imageMessageController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { chatId, prompt, isPublished } = req.body;

    const chat = await Chat.findOne({ _id: chatId, userId });
    if (!chat) {
      return res.status(404).json({ success: false, message: "Chat not found" });
    }

    // Check credits
    if (req.user.credits < 2) {
      return res
        .status(403)
        .json({ success: false, message: "Insufficient credits" });
    }

    // Deduct credits first
    await User.updateOne({ _id: userId }, { $inc: { credits: -2 } });

    // Push user message
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    // Generate image
   const encodedPrompt = encodeURIComponent(prompt);
const generatedImageUrl = `https://ik.imagekit.io/xa7lgsjb8/ik-genimg-prompt/${encodedPrompt}/generated.png?tr=w-800,h-800`;

    const aiImageResponse = await axios.get(generatedImageUrl, {
      responseType: "arraybuffer",
    });

    const base64Image = `data:image/png;base64,${Buffer.from(
      aiImageResponse.data,
      "binary"
    ).toString("base64")}`;

    const uploadResponse = await imagekit.upload({
      file: base64Image,
      fileName: `gpt-image-${Date.now()}.png`,
      folder: "quickgpt",
    });

    const reply = {
      role: "assistant",
      content: uploadResponse.url,
      timestamp: Date.now(),
      isImage: true,
      isPublished: isPublished || false,
    };

    chat.messages.push(reply);
    await chat.save();

    res.status(200).json({ success: true, reply });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to get published images

export const getPublishedImages = async (req, res) => {
 try {

  const publishedImageMessages = await Chat.aggregate([
    { $unwind: "$messages" },
    { $match: { "messages.isImage": true, "messages.isPublished": true } },
    { $project: {
        _id: 0,
        username: "$username",
        imageUrl: "$messages.content",   
      }
    }
  ]);

  res.status(200).json({ success: true, images: publishedImageMessages.reverse() });
  
 } catch (error) {
  res.status(500).json({ success: false, message: error.message });
 }
}