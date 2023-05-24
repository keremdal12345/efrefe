var fs = require("fs");

module.exports = {
  name: "!d",
  description: "Deletes every msg in channel except pinned ones",
  execute(msg) {
    if (
      msg.channel.id === process.env.PW_SLOTS_7PM ||
      msg.channel.id === process.env.WAITLIST_7PM ||
      msg.channel.id === process.env.WAITLIST_11PM ||
      msg.channel.id === process.env.WAITLIST_4PM ||
      msg.channel.id === process.env.WAITLIST_11PM ||
      msg.channel.id === process.env.UNC_4PM ||
      msg.channel.id === process.env.UNC_7PM ||
      msg.channel.id === process.env.REG_7PM ||
      msg.channel.id === process.env.REG_11PM ||
      msg.channel.id === process.env.IDP_7PM ||
       msg.channel.id === process.env.PW_SLOTS_11PM ||
      msg.channel.id === process.env.HELP_4PM ||
      msg.channel.id === process.env.HELP_7PM ||
      msg.channel.id === process.env.IDPA_4PM ||
      msg.channel.id === process.env.FS_REG ||
      msg.channel.id === process.env.IDPA_FS ||
      msg.channel.id === process.env.UNC_FS ||
      msg.channel.id === process.env.HELP_FS ||
      msg.channel.id === "id"
    ) {
      if (msg.member.roles.cache.find(role => role.name === "ʚ Bot Admin ɞ")) {
        deleteAllMsgs(msg);
      } else {
        msg.reply("only ʚ Bot Admin ɞ can use this command");
      }
    }
  }
};

async function deleteAllMsgs(msg) {
  try {
    const fetched = await msg.channel.messages.fetch({ limit: 100 });
    const notPinned = fetched.filter(fetchedMsg => !fetchedMsg.pinned);

    await msg.channel.bulkDelete(notPinned, true);
  } catch (err) {
    console.error(err);
  }
}
