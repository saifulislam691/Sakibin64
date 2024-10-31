const axios = require('axios');

module.exports.config = {
  name: "gptx",
  version: "2.1.3",
  hasPermission: 0,
  credits: "sakibin",
  description: "",
  commandCategory: "ai",
  usages: "( Model-v3 Demo GPT-4 )",
  cooldowns: 3,
};

module.exports.handleEvent = async function ({ api, event, args, Threads, Users }) {
  if (!(event.body.startsWith("Bot") || event.body.startsWith("bot") ||  event.body.startsWith("gpt") || event.body.startsWith("Gpt"))) return;

  const { threadID, messageID, type, messageReply, body } = event;
  const userName = await Users.getNameUser(event.senderID);

  const tl = ["এত ডাকাডাকি করো কেনো", "তুমারে রাইতে ভালোবাসি🥺", "I Love You Baby😘", "BOT is made by Sakibin!", "হ্যা বলো জান শুনতেচি☺️","Ki hoise jaan😒", "/call can add admin!", "Jaaan tumi onek cute🫣","Ask amr mon vlo nei🥲","Hmm jan ummah😘😘","/report can nok owner!","Ato dako kno lojja lage to..","How can I assist you today!","/help to see helplist!"];
  var randrepl = tl[Math.floor(Math.random() * tl.length)];

  let question = '';
  let hasImage = false;

  if (type === 'message_reply') {
    if (messageReply?.attachments[0]?.type === 'photo') {
      hasImage = true;
      // Skipping image processing since no axios
      api.sendMessage('❗ Image processing is currently unavailable.', threadID, messageID);
      return;
    } else {
      question = messageReply?.body?.trim() || '';
    }
  } else { 
    question = body.slice(4).trim();
  }

  if (!question) {
    api.sendMessage(`👤 | ${userName}\n💌 | ${randrepl}`, event.threadID);
    return;
  }

  try {
    const response = await axios.get(`https://hercai.onrender.com/v3/hercai?question=${encodeURIComponent(question)}`);
    const reply = response.data.reply || "I'm here but couldn't understand your question.";
    api.sendMessage(reply, event.threadID);
  } catch (error) {
    console.error(error);
    api.sendMessage("Error: Unable to process your request.", event.threadID);
  }
};

module.exports.run = async function ({ api, event }) {};
