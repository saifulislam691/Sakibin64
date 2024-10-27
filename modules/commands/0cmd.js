module.exports.config = {
  usePrefix: true,
  name: "help",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Sakibin",
  description: "Command Category",
  commandCategory: "guide",
  usages: "group/ai/media/fun/love/canvas/admin/system/meme",
  cooldowns: 2,
};

module.exports.run = async function ({ api, event, args }) {  
  const senderID = "100065445284007";  // Replace this with the desired user ID
  const category = args[0];

  // If no category is provided, send the general command list
  if (!category) {
    return api.shareContact(`Here is your group related Commands👥\n✧ /call (call owner)\n✧ /help\n✧ /antiout on/off\n✧ /group\n✧ /tid\n✧ /uid\n✧ /rank\n✧ /uid2 @mention\n✧ /pp @mention\n✧ /top user/money\n✧ /balance @mention\n✧ /bank register/check/trade\n✧ /supportgc (join)\n\n» Next page: /help 2`, senderID, event.threadID, (err, data) => {
      if (err) console.log(err);
    });
  }

  // Group-related commands (category 1)
  if (category === '1') {
    return api.shareContact(`➣ Here is all group-related Commands✨\n\n✧ /call (call owner)\n✧ /help\n✧ /antiout on/off\n✧ /group\n✧ /tid\n✧ /uid\n✧ /rank\n✧ /uid2 @mention\n✧ /pp @mention\n✧ /top user/money\n✧ /balance @mention\n✧ /bank register/check/trade\n\n» Next page: /help 2`, senderID, event.threadID, (err, data) => {
      if (err) console.log(err);
    });
  }

  // Fun commands (category 2)
  if (category === '2') {
    return api.shareContact(`➣ Commands for fun😁\n\n✧ /point @mention\n✧ /jail @mention\n✧ /chor @mention\n✧ /hack @mention\n✧ /wanted @mention\n✧ /trash @mention\n✧ /slap @mention\n✧ /pair\n✧ /pairv2\n✧ /pairv3\n✧ /pairv4\n✧ /pairv5\n\n» Next page: /help 3`, senderID, event.threadID, (err, data) => {
      if (err) console.log(err);
    });
  }

  // Love commands (category 3)
  if (category === '3') {
    return api.shareContact(`➣ Some lovely commands😚\n\n✧ /kiss @mention\n✧ /hug @mention\n✧ /hugv2 @mention\n✧ /hugv3 @mention\n✧ /married @mention\n✧ /marriedv2 @mention\n✧ /marriedv3 @mention\n✧ /marriedv4 @mention\n✧ /marriedv5 @mention\n✧ /confess @mention\n✧ /couple @mention\n\n» Next page: /help 4`, senderID, event.threadID, (err, data) => {
      if (err) console.log(err);
    });
  }

  // Admin commands (category 4)
  if (category === '4') {
    return api.shareContact(`✧ /self list 1\n✧ /user ban/unban\n✧ /out\n✧ /listbox\n✧ /wps (onlyadminbox)\n✧ /linux (cmd execute)\n✧ /shell\n✧ /accept\n✧ /bday\n✧ /info\n\n» Next page: /help 5`, senderID, event.threadID, (err, data) => {
      if (err) console.log(err);
    });
  }

  // AI-related commands (category 5)
  if (category === '5') {
    return api.shareContact(`➣ (A.i) or useful tools✨\n\n✧ /removebg (reply pic)\n✧ /meta hi (sim)\n✧ meta hi (gpt-4)\n✧ /xl a cat\n✧ /poli a dragon\n✧ /art (reply pic)\n✧ hd (reply pic)\n✧ /teach question => Answer\n✧ /weather (city name)\n✧ /ip (ip address)\n✧ /wiki en (search?)\n✧ /screenshot (url?)\n\n» Next page: /help 6`, senderID, event.threadID, (err, data) => {
      if (err) console.log(err);
    });
  }

  // Media commands (category 6)
  if (category === '6') {
    return api.shareContact(`➣ Media Related commands🌆🎵\n\n🎶 | Audio:\n✧ /spotify (musicname?)\n✧ /sing (musicname)\n✧ /x hi\n✧ /h hi\n✧ /say hi\n\n🖼️ | images\n✧ /pint Naruto - 9\n✧ /allpic\n✧ /cdp\n✧ /emojimix 👻 | 😱\n✧ /cover\n\n» Next page: /help 7`, senderID, event.threadID, (err, data) => {
      if (err) console.log(err);
    });
  }

  // System commands (category 7)
  if (category === '7') {
    return api.shareContact(`➣ System handle ⚙️⚡\n\n✧ /uptime\n✧ /setprefix (prefix?)\n✧ /prefix\n✧ /restart\n✧ /flash\n✧ /config\n✧ /speedtest\n\n» Next page: /help 8`, senderID, event.threadID, (err, data) => {
      if (err) console.log(err);
    });
  }

  // Canvas commands (category 8)
  if (category === '8') {
    return api.shareContact(`➣ Canvas Related commands🌆🪄\nMention or reply to a pic.\n\n✧ /triggered @Mlmention\n✧ /delete @mention\n✧ /blur @mention\n✧ /circle @mention\n✧ /darkness @mention\n✧ /facepalm @mention\n✧ /invert @mention\n✧ /pixelate @mention\n✧ /rainbow @mention\n✧ /wasted @mention\n\n» Next page: /help 9`, senderID, event.threadID, (err, data) => {
      if (err) console.log(err);
    });
  }

  // Meme commands (category 9)
  if (category === '9') {
    return api.shareContact(`➣ Make your own memes via text 📝\n\n✧ /trump text\n✧ /fblite text\n✧ /einstein text\n✧ /mia text\n✧ /mark text\n✧ /zuck text\n✧ /leone text\n✧ /fact text\n✧ /khabylame text1 | text2\n✧ /cheems text1 | text2`, senderID, event.threadID, (err, data) => {
      if (err) console.log(err);
    });
  }
};
