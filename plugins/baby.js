const axios = require("axios");

module.exports = {
  config: {
    name: "baby",
    aliases: ["sim"],
    permission: 0,
    prefix: "babyh",
    categorie: "AI Chat",
    cooldowns: 5,
    credit: "Developed by Mohammad Rahi",
    usages: [
      `${global.config.PREFIX}bot <message> - Start a chat with the bot.`,
      `${global.config.PREFIX}bot - Receive a random greeting from the bot.`,
    ],
    description: "Engage in conversations with an AI-powered bot!",
  },

  start: async function ({ api, event, args }) {
    const { threadId, message, senderId } = event;
    const usermsg = args.join(" ");

    
    if (!usermsg) {
      const greetings = [
  "তুই ইগনোর আমাকে আমার সিয়াম বস বেবি বলতে পারবে শুধু 😎",
  "hum baby bolo",
  "বেবি বেবি খারি করছো কেন 😡",
  "কি ওইছে বলো বেবি খারি ডাকিও না আমি কাজ করতেছি🥱",
  "_^°°°^_{একজন কে ভালোবাসো ১০ জন লাগে নাকি তুমার বলো গোঁ জান-😅💔🙏",
  "হুম বেবি তোমার কি ওইছে তুমি আমার জন্নো পাগল নাকি 🤭",
  "বেবি i love you 🐱",
  "আরে বাবা, আমারে ডাকিছ না আমি বিজি আছি 😒 ",
  "হুম জান আমি তুমার মাজে তাকতে জাই 😭",
  "হুম জান বলো আমি তোমার লাগি কি করতে পারি বলো 😗",
  "জি জান আমি তোমার কাছে তো আছি ডাকো কেন বুঝলাম না 😒",
  "বাবু সুনা খাইছো তুমি 😀",
  "~আমাকে বেশি ডাকিস নাহ আমি S.S.C পরীক্ষা দিবো তাই খুব বেশি বেস্ত (busso)👺🖖🥭",
  "-হ্যালো bby, ডাকশো কেন কিসু কি হইসে আমাকে বলতে পারো গোঁ____🥺✨🙌",
  "- _আমাকে ডাকলে আমি কিন্তু তুমার টুট এ কিস করে দিবো---🙃😽🙊_",
  "বলো গো জান কি হইসে আদর দেয়া লাগবো নি তুমার_____🥹🥔",
  "যদি”আমার হয়ে থেকে জাও তা হলে, পৃথিবীর সবচেয়ে সুন্দরতম ভালোবাসা দেবো তোমায়...🥹🫀",
];

      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

      const greetingMessage = await api.sendMessage(threadId, {
        text: `@${senderId.split('@')[0]}, ${randomGreeting}`,
        mentions: [senderId],
      }, { quoted: message });

      
      global.client.handleReply.push({
        name: this.config.name,
        author: senderId,
        messageID: greetingMessage.key.id,
        type: "chat"
      });

      return;
    }

    
    try {
      const apis = await axios.get("https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json");
      const apiss = apis.data.api;

      const response = await axios.get(
        `${apiss}/sim?type=ask&ask=${encodeURIComponent(usermsg)}`
      );

      const replyText = response.data.data?.msg || "🤖 I'm not sure how to respond to that.";

      const sent = await api.sendMessage(threadId, { text: replyText }, { quoted: message });

      global.client.handleReply.push({
        name: this.config.name,
        author: senderId,
        messageID: sent.key.id,
        type: "chat"
      });

    } catch (err) {
      console.error("❌ Bot command error:", err);
      return api.sendMessage(threadId, { text: "❌ Something went wrong while talking with bot." }, { quoted: message });
    }
  },


  handleReply: async function ({ api, event, handleReply }) {
    
    const { threadId, message, body, senderId } = event;

    try {
      const apis = await axios.get("https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json");
      const apiss = apis.data.api;

      const response = await axios.get(
        `${apiss}/sim?type=ask&ask=${encodeURIComponent(body)}`
      );

      const replyText = response.data.data?.msg || "🤖 I'm not sure how to respond to that.";

      const sent = await api.sendMessage(threadId, { text: replyText }, { quoted: message });

      global.client.handleReply.push({
        name: this.config.name,
        author: senderId,
        messageID: sent.key.id,
        type: "chat"
      });

    } catch (err) {
      console.error("❌ Error in bot handleReply:", err);
      return api.sendMessage(threadId, { text: "❌ Failed to continue conversation." }, { quoted: message });
    }
  }
};

