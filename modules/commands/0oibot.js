const axios = require('axios');

const baseApiUrl = async () => {
  const base = await axios.get(`https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json`);
  return base.data.api;
};

module.exports.config = {
  name: "meta",
  version: "6.9.0",
  credits: "dipto",
  countDown: 0,
  hasPermission: 0,
  description: "better than all sim simi",
  commandCategory: "chat",
  Category: "chat",
  usePrefix: true,
  prefix: true,
  usages: `[anyMessage] OR\nteach [YourMessage] - [Reply1], [Reply2], [Reply3]... OR\nteach [react] [YourMessage] - [react1], [react2], [react3]... OR\nremove [YourMessage] OR\nrm [YourMessage] - [indexNumber] OR\nmsg [YourMessage] OR\nlist OR\nall OR\nedit [YourMessage] - [NewMessage]`,
};

module.exports.run = async function({ api, event, args, Users }) {
  try {
    const link = `${await baseApiUrl()}/baby`;
    const dipto = args.join(" ").toLowerCase();
    const uid = event.senderID;

    if (!args[0]) {
      const ran = ["Bolo baby", "hum", "type help baby", "type !baby hi"];
      const r = ran[Math.floor(Math.random() * ran.length)];
      return api.sendMessage(r, event.threadID, (error, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: event.senderID,
          type: "continue"
        });
      }, event.messageID);
    }

    const response = await axios.get(`${link}?text=${dipto}`);
    return api.sendMessage(response.data.reply, event.threadID, (error, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: event.senderID,
        type: "continue"
      });
    }, event.messageID);

  } catch (e) {
    console.error('Error in command execution:', e);
    return api.sendMessage(`error: ${e.message}`, event.threadID, event.messageID);
  }
};

module.exports.handleReply = async function ({ event, api, handleReply, Users }) {
  if (handleReply.type === "continue" && event.senderID === handleReply.author) {
    const message = event.body.toLowerCase();
    const link = `${await baseApiUrl()}/baby`;
    try {
      const response = await axios.get(`${link}?text=${message}`);
      return api.sendMessage(response.data.reply, event.threadID, (error, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: event.senderID,
          type: "continue"
        });
      }, event.messageID);
    } catch (error) {
      console.error("An error occurred:", error);
      api.sendMessage("Oops! Something went wrong.", event.threadID, event.messageID);
    }
  }
};
