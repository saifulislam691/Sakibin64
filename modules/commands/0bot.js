module.exports.config = {
    name: "supportgc",
    version: "1.0",
    hasPermission: 0,
    credits: "Sakibin.Imtiaz",
    description: "Send support group links",
    usages: "/supportgc",
    commandCategory: "group",
    cooldowns: 5
};
 
module.exports.run = async ({ api, event }) => {
    try {
        // Define the support group links here
        const supportLink1 = "https://m.me/j/AbbHIMrqGdGG8ZK7/"; // Replace with your actual group link
        const supportLink2 = "https://www.facebook.com/groups/418505760810575"; // Replace with your actual group link

        // Message to send with the links
        const message = `🔗 Here are the support group links:\n\n1. Messanger Group:\n${supportLink1}\n2. Community Group:\n${supportLink2}\n\nFeel free to join for any help or queries!`;

        // Send the message with the links
        api.sendMessage(message, event.threadID, event.messageID);
    } catch (error) {
        console.error("An error occurred:", error);
        api.sendMessage("Oops! Something went wrong.", event.threadID, event.messageID);
    }
};
