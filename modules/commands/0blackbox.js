const axios = require("axios");
const API = global.config.ApiUrl;

module.exports.config = {
    name: "miuki",
    version: "1.0",
    hasPermission: 0,
    credits: "Sakibin",
    description: "ask banglish",
    usages: "Message",
    commandCategory: "ai",
    cooldowns: 0
};

module.exports.run = async ({ api, event, args }) => {
    try {
        let message = args.join(" ");
        if (!message) {
            return api.sendMessage(`⭓ Hi, I'm Meta 2.0⚡\n⭓ My official Database created by @Sakibin Sinha 🚀`, event.threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "continue"
                });
            }, event.messageID);
        }

        // Initial placeholder message while the response is being fetched
        api.sendMessage("Miuki is Thinking...", event.threadID, (error, info) => {
            const botMessageID = info.messageID;  // Capture the bot's message ID

            // Fetch the response from the API
            axios.get(`${API}/sim?type=ask&ask=${message}`)
                .then((response) => {
                    const respond = response.data.answer;

                    // Edit the bot's message with the actual response
                    api.editMessage(respond, botMessageID, (err) => {
                        if (err) console.log(err);

                        global.client.handleReply.push({
                            name: this.config.name,
                            messageID: botMessageID,
                            author: event.senderID,
                            type: "continue"
                        });
                    });
                })
                .catch((error) => {
                    console.error("An error occurred:", error);
                    api.editMessage("Oops! Something went wrong.", botMessageID);
                });
        });
    } catch (error) {
        console.error("An error occurred:", error);
        api.sendMessage("Oops! Something went wrong.", event.threadID, event.messageID);
    }
};

module.exports.handleReply = async function ({ event, api, handleReply }) {
    if (handleReply.type === "continue" && event.senderID === handleReply.author) {
        const message = event.body;

        try {
            const response = await axios.get(`${API}/sim?type=ask&ask=${message}`);
            const respond = response.data.answer;

            // Edit the previous bot message with the new response
            api.editMessage(respond, handleReply.messageID, (error) => {
                if (error) console.log(error);

                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: handleReply.messageID,
                    author: event.senderID,
                    type: "continue"
                });
            });
        } catch (error) {
            console.error("An error occurred:", error);
            api.editMessage("Oops! Something went wrong.", handleReply.messageID);
        }
    }
};
