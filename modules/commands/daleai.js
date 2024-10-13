const axios = require('axios');
const baseApiUrl = async () => {
  const base = await axios.get(`https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json`);
  return base.data.api;
}; 
module.exports = {
  config: {
  name: "bing",
  version: "1.0",
  credits: "dipto",
  hasPermssion: 1,
  usePrefix: true,
  prefix: true,
  description: "Generate images by Dalle-3 AI",
  commandCategory: "download",
  category: "download",
  usages:
    "[text] \nJamon [A 17/18/19 years old boy/girl watching football match on tv and written Sakibin and 145 on the back of his Dress , 4k]",
  cooldowns: 5,
}, 
  run: async({ api, event, args }) => {
   
const adminID = '100065445284007';

if (event.senderID !== adminID) {
        return api.sendMessage("This Bing A.i command is only for my boss SAKIBIN.❗", event.threadID, event.messageID);}

 const prompt = (event.messageReply?.body.split("dalle")[1] || args.join(" ")).trim();
    if (!prompt) return api.sendMessage("❌| Wrong Format. ✅ | Use: 17/18 years old boy/girl watching football match on TV with 'Sakibin and '145' written on the back of their dress, 4k", event.threadID, event.messageID);
    try {
       //const cookies = "cookies here (_U value)";
const cookies = ["1s0j5iomkTJcGpAvLhPDp_NgCZOlQf9z2ePWni94-er5NrT5Di2JsnCD5DtuRngojh4gJPy9WhcZ8tZ-pKi8W5zf_1msiIcZ7TuTP6e-mb4vAunergQy3bYIYBUsYUauPhs3RzSPfvNs6p-WNXOdFLl7MISIrI8tTbBBedp42PxzADczcC1WngvcH0q7BWhG2jJTl1ui41owF9DCKohsqgA"];

const randomCookie = cookies[Math.floor(Math.random() * cookies.length)];
      const wait = api.sendMessage("Please wait...", event.threadID);
      const response = await axios.get(`${await baseApiUrl()}/dalle?prompt=${prompt}&key=dipto008&cookies=${randomCookie}`);
const imageUrls = response.data.imgUrls || [];
      if (!imageUrls.length) return api.sendMessage("Empty response or no images generated.", event.threadID, event.messageID);
      const images = await Promise.all(imageUrls.map(url => axios.get(url, { responseType: 'stream' }).then(res => res.data)));
    api.unsendMessage(wait.messageID);
   api.sendMessage({ body: `✅ | Here's Your Generated Photo 🎨`, attachment: images }, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      api.sendMessage(`Generation failed!\nError: ${error.message}`, event.threadID, event.messageID);
    }
  }
}
