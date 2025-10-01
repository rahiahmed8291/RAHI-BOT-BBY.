// dont change any line this file

module.exports = {
  config: {
    name: "Rahied",
    aliases: ["ed", "mybots", "links"],
    permission: 0,
    prefix: true,
    description: "Send all my bot links and tutorials",
    categories: "Utility",
    usages: [".allbots"],
    credit: "Developed by Mohammad Nayan"
  },

  start: async ({ api, event }) => {
    const { threadId, message } = event;

    const myNumber = "8801711209381";
    const msg = `🌟 *RAHI BOT COLLECTION* 🌟


🛠️ *Support Channel*
Link: https://chat.whatsapp.com/KuSent8x2rIIl93CD1aKBl?mode=ems_copy_c

📞 *Contact Me*: +${myNumber}`;

    await api.sendMessage(threadId, { text: msg }, { quoted: message });
  }
};
