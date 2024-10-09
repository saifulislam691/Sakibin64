const chalk = require('chalk');
module.exports.config = { 
    usePrefix: true,
    name: "mygroup",
    version: "1.0.1",
    hasPermission: 0,
    credits: "SAKIBIN",
    description: "Automatically adds user to a predefined group",
    commandCategory: "group",
    usages: "/mygroup",
    cooldowns: 5
};

module.exports.onLoad = () => {
  console.log(chalk.bold.hex("#00c300").bold("==== SUCCESSFULLY LOADED THE MYGROUP COMMAND ====="));
}

module.exports.run = async function({ api, event }) {
  var { threadID, messageID, senderID } = event;
  
  // Replace this with the group ID you want to automatically add the user to
  const myGroupID = "568304112847373"; 

  try {
    // Get group info to check if the user is already in the group
    var threadInfo = await api.getThreadInfo(myGroupID);
    var { participantIDs, approvalMode, adminIDs } = threadInfo;

    // Check if senderID (the user who invoked the command) is already in the group
    if (participantIDs && participantIDs.includes(senderID)) {
      return api.sendMessage(`You are already in the group ${threadInfo.threadName}.`, threadID, messageID);
    }

    // Add the user to the group
    await api.addUserToGroup(senderID, myGroupID);

    // Check if the group has approval mode enabled
    if (approvalMode && !adminIDs.some(item => item.id === api.getCurrentUserID())) {
      return api.sendMessage("You have been added to the group's approval list. Please wait for approval.", threadID, messageID);
    } else {
      return api.sendMessage(`You have been successfully added to the group ${threadInfo.threadName}.`, threadID, messageID);
    }
  } catch (error) {
    return api.sendMessage(`An error occurred while trying to add you to the group:\n\n${error}`, threadID, messageID);
  }
};
