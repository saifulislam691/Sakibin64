const axios = require('axios');

module.exports.config = {
    name: "ai",
    version: "1.0",
    credits: "Jonell Magallanes",
    description: "Ask questions and get responses from AI",
    hasPermission: 0,
    commandCategory: "ai",
    cooldowns: 6,
    usages: "ai2 [your question]"
};

module.exports.run = async ({ api, event, args }) => {
    const { threadID, messageID, senderID } = event;

    if (args.length === 0) {
        return api.sendMessage("Please provide your question.\n\nExample: ai2 what is the solar system?", threadID, messageID);
    }

    const question = args.join(" ");
    const apiUrl = `https://hercai.onrender.com/v3/hercai?question=${encodeURIComponent(question)}`;
    
    const processingMessage = await api.sendMessage("🔎 Searching for an answer. Please wait...", threadID, messageID);

    try {
        const response = await axios.get(apiUrl);
        const result = response.data.reply;

        await api.editMessage(`𝗔𝗜 𝗥𝗲𝘀𝗽𝗼𝗻𝘀𝗲\n━━━━━━━━━━━━━━━━━━\n${result}\n━━━━━━━━━━━━━━━━━━`, processingMessage.messageID);

        global.client.handleReply.push({
            name: this.config.name,
            messageID: processingMessage.messageID,
            author: senderID,
            type: "follow-up"
        });

    } catch (error) {
        console.error("An error occurred:", error);
        await api.editMessage("An error occurred while fetching the response.", processingMessage.messageID);
    }
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
    const { threadID, messageID, senderID, body } = event;

    if (handleReply.type === "follow-up" && senderID === handleReply.author) {
        const followUpQuestion = body;
        const followUpApiUrl = `https://hercai.onrender.com/v3/hercai?question=${encodeURIComponent(followUpQuestion)}`;

        api.setMessageReaction("⏱️", messageID, () => {}, true);

        try {
            const response = await axios.get(followUpApiUrl);
            const followUpResult = response.data.reply;

            api.setMessageReaction("✅", messageID, () => {}, true);
            await api.editMessage(`${followUpResult}`, handleReply.messageID);

            global.client.handleReply.push({
                name: this.config.name,
                messageID: handleReply.messageID,
                author: senderID,
                type: "follow-up"
            });

        } catch (error) {
            console.error("An error occurred:", error);
            await api.editMessage("An error occurred while fetching the follow-up response.", handleReply.messageID);
        }
    }
};
