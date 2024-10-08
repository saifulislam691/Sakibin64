module.exports.config = { 
  usePrefix: true,
  name: "xl",
  version: "1.0.",
  hasPermssion: 1,
  credits: "Sakibin",
  description: "Sdxl",
  commandCategory: "image",
  usages: "text to image",
  cooldowns: 5,
};

module.exports.run = async ({api, event, args }) => {
  const axios = require('axios');
  const fs = require('fs-extra');
  let { threadID, messageID } = event;

  // Get prompt from user input
  let prompt = args.join(" ");
  if (!prompt) return api.sendMessage("Please enter a prompt❗", threadID, messageID);

  let path = __dirname + `/cache/imagine3.png`;

  try {
    // Fetch image data
    const response = await axios.get(`https://www.noobs-api.000.pe/dipto/flux?prompt=${prompt}`);
    const imageUrl = response.data.data;

    // Download image and save it to the local file
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    fs.writeFileSync(path, Buffer.from(imageResponse.data));

    // Send the image as an attachment
    api.sendMessage({
      body: `Here's your image 🌇`,
      attachment: fs.createReadStream(path)
    }, threadID, () => fs.unlinkSync(path), messageID);

  } catch (error) {
    api.sendMessage("An error occurred while generating the image. Please try again.", threadID, messageID);
    console.error(error);
  }
};
