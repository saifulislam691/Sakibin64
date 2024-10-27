const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
    name: "videoDownloader",
    version: "1.0.0",
    hasPermission: 0,
    credits: "Sakibin",
    description: "Automatically downloads videos from TikTok, Facebook, and Instagram when a link is provided.",
    commandCategory: "utility",
    usages: "Send a TikTok, Facebook, or Instagram video link to download.",
    cooldowns: 3,
};

async function downloadVideo(videoUrl, threadID, api) {
    try {
        const response = await axios.get(`https://gpt-19zs.onrender.com/alldl?url=${encodeURIComponent(videoUrl)}`);
        if (response.data.status) {
            const videoData = response.data.data;
            const videoTitle = videoData.title;
            const videoDownloadUrl = videoData.low;
            const videoPath = path.resolve(__dirname, 'cache', `${videoTitle}.mp4`);

            // Send initial loading animation message
            const loadingMessages = [
                `Downloading...\n████▒▒▒▒▒▒ 31%`,
                `Downloading...\n██████▒▒▒▒ 59%`,
                `Downloading...\n███████▒▒▒ 73%`,
                `Downloading...\n█████████▒ 88%`,
`Download Done ✓\n██████████ 100%`
            ];

            let loadingMessageID;
            let currentStep = 0;

            const updateLoadingMessage = () => {
                if (currentStep < loadingMessages.length) {
                    api.editMessage(loadingMessages[currentStep], loadingMessageID, (err) => {
                        if (err) console.error("Error editing loading message:", err);
                    });
                    currentStep++;
                    setTimeout(updateLoadingMessage, 1000); // 1 second per loading step
                }
            };

            // Start loading animation and then download
            api.sendMessage("Starting download...", threadID, (err, info) => {
                if (err) return console.error("Error sending initial message:", err);
                loadingMessageID = info.messageID;
                setTimeout(updateLoadingMessage, 1000); // Start loading animation
            });

            // Start video download
            const videoStream = fs.createWriteStream(videoPath);
            const videoResponse = await axios({
                url: videoDownloadUrl,
                method: 'GET',
                responseType: 'stream',
            });

            videoResponse.data.pipe(videoStream);

            videoStream.on('finish', () => {
                // Remove loading message
                api.unsendMessage(loadingMessageID);

                // Send the downloaded video
                api.sendMessage({
                    body: `Here is your downloaded video: ${videoTitle}`,
                    attachment: fs.createReadStream(videoPath),
                }, threadID, () => {
                    fs.unlinkSync(videoPath); // Delete video file after sending
                });
            });
        } else {
            api.sendMessage("Unable to download the video. Please ensure the link is correct.", threadID);
        }
    } catch (error) {
        console.error("Download Error:", error);
        api.sendMessage("Error: Failed to download the video.", threadID);
    }
}

module.exports.handleReaction = async function({ api, event, handleReaction }) {
    try {
        if (event.userID != handleReaction.author) return;
        
        const { threadID } = event;

        // Start downloading the video after reaction
        await downloadVideo(handleReaction.videoUrl, threadID, api);

        // Remove the reaction handler from global data
        api.unsendMessage(handleReaction.messageID);
    } catch (e) {
        console.log(e);
    }
};

module.exports.handleEvent = async function({ api, event }) {
    const { threadID, body } = event;

    // Check if the message contains a TikTok, Facebook, or Instagram link
    const regex = /(https?:\/\/(?:[a-zA-Z0-9-]+\.)?(tiktok\.com|facebook\.com|instagram\.com)\/[^\s]+)/gi;
    const match = body.match(regex);

    if (match) {
        const videoUrl = match[0]; // Take the first matched URL

        // Notify the user and ask them to react to the message to start the download
        api.sendMessage("Video Link detected 🔗\nReact 👍 to start download", threadID, (error, messageInfo) => {
            if (error) return console.error(error);

            // Store the reaction handler data
            global.client.handleReaction.push({
                name: "videoDownloader",
                messageID: messageInfo.messageID,
                author: event.senderID,
                videoUrl: videoUrl
            });
        });
    }
};

module.exports.run = async function({ api, event }) {};
