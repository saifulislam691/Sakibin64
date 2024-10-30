const axios = require("axios");

module.exports = {
  config: {
    name: "art",
    version: "1.0",
    credits: "rehat--",
    description: "Text to Image with customizable styles and presets",
    commandCategory: "ai",
    cooldowns: 5,
    usages: "{pn} <prompt> --ar [ratio], [preset], [style] or reply to an image",
    hasPermission: 0,
  },

  run: async function({ api, event, args, message }) {
    try {
      let prompt = "";
      let style = "";
      let imageUrl = "";
      let preset = "";
      let aspectRatio = "";

      const styleIndex = args.indexOf("--style");
      if (styleIndex !== -1 && args.length > styleIndex + 1) {
        style = args[styleIndex + 1];
        args.splice(styleIndex, 2);
      }

      const presetIndex = args.indexOf("--preset");
      if (presetIndex !== -1 && args.length > presetIndex + 1) {
        preset = args[presetIndex + 1];
        args.splice(presetIndex, 2);
      }

      const aspectIndex = args.indexOf("--ar");
      if (aspectIndex !== -1 && args.length > aspectIndex + 1) {
        aspectRatio = args[aspectIndex + 1];
        args.splice(aspectIndex, 2);
      }

      if (event.type === "message_reply" && event.messageReply?.attachments?.length > 0) {
        imageUrl = encodeURIComponent(event.messageReply.attachments[0].url);
      } else if (args.length === 0) {
        return api.sendMessage("Please provide a prompt or reply to an image.", event.threadID, event.messageID);
      }

      if (args.length > 0) {
        prompt = args.join(" ");
      }

      let apiUrl = `https://rehatdesu.xyz/api/imagine/niji?prompt=${encodeURIComponent(prompt)}&aspectRatio=${aspectRatio}&style=${style}&preset=${preset}&apikey=sumu`;
      if (imageUrl) {
        apiUrl += `&imageUrl=${imageUrl}`;
      }

      const processingMessage = await api.sendMessage("Please wait...⏳", event.threadID, event.messageID);

      const response = await axios.post(apiUrl);
      const img = response.data.url;

      await api.unsendMessage(processingMessage.messageID);
      const imageStream = await axios.get(img, { responseType: 'stream' });

      await api.sendMessage({
        body: `Here’s your artful transformation! 🎨`,
        attachment: imageStream.data
      }, event.threadID, event.messageID);

    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred.", event.threadID, event.messageID);
    }
  }
};
