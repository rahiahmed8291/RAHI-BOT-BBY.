const os = require('os');

module.exports = {
  config: {
    name: 'info',
    aliases: ['about', 'admininfo', 'serverinfo'],
    permission: 0,
    prefix: 'both',
    categorie: 'Utilities',
    credit: 'Developed by Mohammad 𝐑𝐚𝐡𝐢',
    usages: [`${global.config.PREFIX}info - Show admin and server information.`],
  },
  start: async ({ event, api, message }) => {
    try {
      const uptimeSeconds = process.uptime();
      const uptime = new Date(uptimeSeconds * 1000).toISOString().substr(11, 8);

      const adminListText =
        global.config.admin.length > 0
          ? global.config.admin
              .map((id, i) => `${i + 1}. @${id.split('@')[0]}`)
              .join('\n')
          : 'No admins found.';

      const infoMessage = `
--------------------------------------------
➥ 𝐇𝐞𝐲 𝐌𝐫/𝐦𝐢𝐬𝐬 
╭────《  ᴍʏ ꜱᴇʟꜰ 》────⊷
│ ╭──────✧❁✧──────◆
│ │ 🌸 ɴᴀᴍᴇ :- 『𝐌𝐨𝐡𝐚𝐦𝐦𝐚𝐝 𝐑𝐚𝐡𝐢  』
│ │ 🏡 ғʀᴏᴍ :- 『 𝐆𝐎𝐋𝐀𝐏𝐆𝐎𝐍𝐉 𝐒𝐘𝐋𝐇𝐄𝐓 』
│ │ 📘 ᴄʟᴀꜱs :- 『 』
│ │ 💖 ʀʟs :- 『 Sɪɴɢʟᴇ Uʟᴛᴀ Pʀᴏ Mᴀx 』
│ │ 🎯 ʜᴏʙʙʏ :- 『 Rɪᴅᴇ 』
│ │ ☎️ ɴᴜᴍʙᴇʀ :- 『 01760591972 』
│ │ ..ʏᴏᴜ ᴄᴀɴ ꜱᴇᴇ ᴍʏ ꜱᴛᴀᴛᴜꜱ..
│ ╰──────✧❁✧──────◆
╰══════════════════⊷
--------------------------------------------

--------------------------------------------
\`\`\`
🖥️ Server Info:
• Platform       : ${os.platform()}
• CPU            : ${os.cpus()[0].model}
• Node.js Version: ${process.version}
• Uptime         : ${uptime}
• Total Memory   : ${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB
• Free Memory    : ${(os.freemem() / (1024 ** 3)).toFixed(2)} GB
\`\`\``;

      await api.sendMessage(
            event.threadId,
            { image: { url: "https://i.postimg.cc/7hv5zWYQ/IMG-20250913-WA0082.jpg" }, caption: infoMessage || '' },
            { quoted: event.message }
          );;
    } catch (error) {
      console.error(error);
      await api.sendMessage(event.threadId, '❌ An error occurred while fetching info.', { quoted: event.message });
    }
  },
};
