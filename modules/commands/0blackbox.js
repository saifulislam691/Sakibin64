const axios = require("axios");
const APIKEY = "SAKI-BIN-SWT56X";

module.exports.config = {
    name: "black",
    version: "0.4.1",
    hasPermssion: 0,
    credits: "Sakibin",
    description: "Blackbox A.i",
    usages: "(your question?)",
    commandCategory: "ai",
    cooldowns: 0
};

module.exports.run = async ({ api, event, args }) => {
    try {
        let prompt = args.join("");
        if (!prompt) {
            return api.sendMessage(`➤ Hi, I'm MR. Black from Sakibin D-Base..🎩`, event.threadID, event.messageID);
        }

        const response = await axios.get(`https://xakibin.onrender.com/api/blackbox?prompt=${prompt}&apikey=SAKIBIN-FREE-SY6B4X`);
        const { message: result } = response.data;

        const responseMessage = `𝗖𝗛𝗔𝗧𝗚𝗣𝗧\n━━━━━━━━━━━━━━━━━━\n${result}\n━━━━━━━━━━━━━━━━━━`;
        api.editMessage(responseMessage, event.threadID, event.messageID);
    } catch (error) {
        console.error("An error occurred:", error);

        const errorMessage = `𝗖𝗛𝗔𝗧𝗚𝗣𝗧\n━━━━━━━━━━━━━━━━━━\nOops! Something went wrong.\n━━━━━━━━━━━━━━━━━━`;
        api.editMessage(errorMessage, event.threadID, event.messageID);
    }
};
