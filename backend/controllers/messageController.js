import Chat from "../models/Chat.js";
import User from "../models/User.js";
import openai from "../configs/openai.js";
import imagekit from "../configs/imagekit.js";
import axios from "axios";


// Text message controller
export const textMessageController = async (req, res) => {
  try {
   
   const userId = req.user._id;

     // Check credits
    if (req.user.credits < 1) {
      return res
        .status(403)
        .json({ success: false, message: "Insufficient credits" });
    }

   const { chatId, prompt } = req.body;

    const chat = await Chat.findOne({ _id: chatId, userId });

     // Push user message
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    // Gemini API call
    const {choices} = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
    });

      const reply = {
      ...choices[0].message,
      timestamp: Date.now(),
      isImage: false,
    };

    res.status(200).json({ success: true, reply });
  

    // Push reply
    chat.messages.push(reply);
    await chat.save();

     // Deduct credits 
    await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });


    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Image message controller
export const imageMessageController = async (req, res) => {
  try {
    console.log("=== IMAGE ENDPOINT DEBUG ===");
    console.log("1. Request body:", req.body);
    console.log("2. User:", req.user?.username, "Credits:", req.user?.credits);

    const userId = req.user._id;

    // Check credits
    if (req.user.credits < 2) {
      return res.status(403).json({ success: false, message: "Insufficient credits" });
    }

    const { chatId, prompt, isPublished } = req.body;

    const chat = await Chat.findOne({ _id: chatId, userId });
    if (!chat) {
      return res.status(404).json({ success: false, message: "Chat not found" });
    }

    console.log("3. Adding user message...");
    // Push user message
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    console.log("4. Generating image URL...");
    const encodedPrompt = encodeURIComponent(prompt);
    const generatedImageUrl = `https://ik.imagekit.io/xa7lgsjb8/ik-genimg-prompt-${encodedPrompt}/quickgpt/${Date.now()}.png?tr=w-800,h-800`;
    
    console.log("5. Generated URL:", generatedImageUrl);
    console.log("6. Creating reply (image will generate on first access)...");
    
    const reply = {
      role: "assistant",
      content: generatedImageUrl,
      timestamp: Date.now(),
      isImage: true, 
      isPublished: isPublished || false
    };

    console.log("7. Saving to database...");
    chat.messages.push(reply);
    await chat.save();

    console.log("8. Deducting credits...");
    await User.updateOne({ _id: userId }, { $inc: { credits: -2 } });

    console.log("9. Success! Sending response...");
    res.status(200).json({ success: true, reply });

  } catch (error) {
    console.log("=== ERROR ===");
    console.log("Error:", error.message);

    res.status(500).json({ 
      success: false, 
      message: error?.message || "Server error" 
    });
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