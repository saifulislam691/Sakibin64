const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports = {
  config: {
    name: "gen",
    version: "1.0",
    credits: "Mahi--",
    hasPermssion: 1,
    usePrefix: true,
    prefix: true,
    description: "Generate an image based on a prompt.",
    commandCategory: "ai",
    category: "ai",
    usages: "{p}gen <prompt>",
    cooldowns: 20,
  },
  run: async({ api, event, args }) => {
    // Obfuscated author name check
    const obfuscatedAuthor = String.fromCharCode(77, 97, 104, 105, 45, 45);
    if (this.config.credits !== obfuscatedAuthor) {
      return api.sendMessage("You are not authorized to change the author name.", event.threadID, event.messageID);
    }

    const prompt = args.join(" ");
    if (!prompt) {
      return api.sendMessage("❌ | You need to provide a prompt.", event.threadID, event.messageID);
    }

    api.sendMessage("Please wait, we're making your picture...", event.threadID, event.messageID);

    try {
      const mrgenApiUrl = `https://hopelessmahi.onrender.com/api/image?prompt=${encodeURIComponent(prompt)}`;

      const mrgenResponse = await axios.get(mrgenApiUrl, {
        responseType: "arraybuffer"
      });

      const cacheFolderPath = path.join(__dirname, "cache");
      if (!fs.existsSync(cacheFolderPath)) {
        fs.mkdirSync(cacheFolderPath);
      }

      const imagePath = path.join(cacheFolderPath, `${Date.now()}_generated_image.png`);
      fs.writeFileSync(imagePath, Buffer.from(mrgenResponse.data, "binary"));

      const stream = fs.createReadStream(imagePath);
      api.sendMessage({ body: "", attachment: stream }, event.threadID, event.messageID);

    } catch (error) {
      console.error("Error:", error);
      api.sendMessage("❌ | An error occurred. Please try again later.", event.threadID, event.messageID);
    }
  }
};
