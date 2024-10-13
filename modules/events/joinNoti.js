module.exports.config = {
	name: "joinNoti",
	eventType: ["log:subscribe"],
	version: "1.0.1",
	cooldowns: 200,
	credits: "CatalizCS", // fixing by Sakibin Sinha
	description: "Notify bot or group member by sharing contact",
	dependencies: {
		"fs-extra": "",
		"path": "",
		"pidusage": ""
	}
};

module.exports.onLoad = function () {
	const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
	const { join } = global.nodemodule["path"];

	const path = join(__dirname, "cache", "joinGif");
	if (!existsSync(path)) mkdirSync(path, { recursive: true });

	return;
};

module.exports.run = async function({ api, event }) {
	const { threadID } = event;

	// If bot is added to the thread
	if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
		api.changeNickname(`⪼ ${global.config.PREFIX} ⪻• ${global.config.BOTNAME || "bot"}`, threadID, api.getCurrentUserID());
		return api.sendMessage("Bot has been successfully added to the group!", threadID, () => {
			api.shareContact(`𝘾𝙤𝙣𝙣𝙚𝙘𝙩𝙚𝙙 𝙎𝙪𝙘𝙘𝙚𝙨𝙨𝙛𝙪𝙡\n───────────⭓\n│✵ Owner: 𝗦𝗮𝗸𝗶𝗯𝗶𝗻 𝗦𝗶𝗻𝗵𝗮\n│✵ Use /help to Continue\n│✵ Thanks Group Admin.\n│✵ No Spam!\n│✵ Prefix: /`, "100056475082077", threadID);
		});
	} 
	// If a new user is added to the thread
	else {
		try {
			let { threadName, participantIDs } = await api.getThreadInfo(threadID);
			const threadData = global.data.threadData.get(parseInt(threadID)) || {};

			let mentions = [], nameArray = [], memLength = [];
			
			for (let participant of event.logMessageData.addedParticipants) {
				const userName = participant.fullName;
				const userID = participant.userFbId;
				nameArray.push(userName);
				mentions.push({ tag: userName, id: userID });
				memLength.push(participantIDs.length);
			}
			
			memLength.sort((a, b) => a - b);

			let msg = threadData.customJoin || 
				`✧ Welcome to ${threadName}.\n✧ ${nameArray.join(', ')} You are member number ${memLength.join(', ')}!\n✧ Thanks for joining!`;
			
			// Send welcome message with shared contact
			return api.sendMessage(msg, threadID, () => {
				for (let participant of event.logMessageData.addedParticipants) {
					api.shareContact(msg, participant.userFbId, threadID);
				}
			});
		} catch (e) { 
			return console.log(e); 
		}
	}
};
