const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
    name: "sing",
    version: "1.1.0",
    hasPermssion: 0,
    credits: "Hridoy",
    description: "Generate a song using the provided text and send the audio file.",
    commandCategory: "sing",
    usages: "[Song Name]",
    cooldowns: 10,
    dependencies: {
        "axios": ""
    }
};

module.exports.run = async function({ api, event, args }) {
    const { threadID, messageID } = event;

    if (args.length === 0) {
        return api.sendMessage('⚡️Please provide a song name to generate!', threadID, messageID);
    }

    const songName = args.join(" ");

    try {
        // Send the initial message and then delete it
        const sentMessage = await api.sendMessage('🎧 Downloading the music for you... Please wait a moment!', threadID);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for a moment before deleting
        await api.unsendMessage(sentMessage.messageID);

        // Fetch the song data from the new API
        const response = await axios.get(`http://ekotapay.xyz:2243/sing=${encodeURIComponent(songName)}`);
       // https://api.elianabot.xyz/tools/ytmp3.php?music
        
        // Log the response to check the structure
        console.log("API Response:", response.data);

        // Check if the response data has the expected structure
        if (!response.data || !response.data.audio_url) {
            return api.sendMessage('⚡️An error occurred while generating the song. The API response was unexpected.', threadID, messageID);
        }

        const { audio_url, title } = response.data;

        // Download the MP3 file
        const audioResponse = await axios({
            url: audio_url,
            method: 'GET',
            responseType: 'stream'
        });

        // Save the audio file temporarily
        const filePath = path.resolve(__dirname, 'cache', `${title.replace(/[^a-z0-9]/gi, '_')}.mp3`);
        const writer = fs.createWriteStream(filePath);
        audioResponse.data.pipe(writer);

        writer.on('finish', () => {
            api.sendMessage({
                body: `🎶 Here is your song: ${title}\nEnjoy the music!`,
                attachment: fs.createReadStream(filePath)
            }, threadID, () => fs.unlinkSync(filePath), messageID);
        });

        writer.on('error', (err) => {
            console.error(err);
            api.sendMessage("⚡️An error occurred while downloading the song. Please try again later.", threadID, messageID);
        });

    } catch (error) {
        console.error("Error generating the song:", error);
        api.sendMessage("⚡️An error occurred while generating the song. Please try again later.", threadID, messageID);
    }
};
