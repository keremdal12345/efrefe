module.exports = {
  name: "!s",
  description: "",
  async execute(msg, cfg, client) {
    if (msg.channel.id === process.env.PW_SLOTS_7PM || msg.channel.id === process.env.REG_7PM || msg.channel.id === process.env.WAITLIST_7PM || msg.channel.id === process.env.REG_11PM || msg.channel.id === process.env.PW_SLOTS_11PM || msg.channel.id === process.env.WAITLIST_11PM) {
      let text =
        " Slots:\n\nUnconfirm / Cancel your slot before **22:30 CET**!\n\n";

      if (msg.channel.id === process.env.PW_SLOTS_7PM || msg.channel.id === process.env.REG_7PM || msg.channel.id === process.env.WAITLIST_7PM) {
        text =
          " Slots:\n\nUnconfirm / Cancel your slot before **18:30 CET**!\n\n";
      }

      const db = require("../db.js");

      let config = await db.getConfig(cfg);

      let i = 1;
      if (config.slots.length > 0) {
        config.slots.forEach(team => {
          text =
            text +
            emojis[i - 1] +
            " `[" +
            team.teamTag +
            "]` " +
            team.teamName +
            " " +
            team.teamManager +
            "\n";
          i++;
        });
      }

      if (msg.channel.id === process.env.PW_SLOTS_7PM || msg.channel.id === process.env.WAITLIST_7PM || msg.channel.id === process.env.REG_7PM) {
        const guild = client.guilds.cache.get(msg.guild.id);
        const channel = guild.channels.cache.find(c => c.id === process.env.PW_SLOTS_7PM
          && c.type === 'text');

        channel.messages.fetch(`919280307843235860`).then(message => {
          message.edit(text);
        }).catch(err => {
          console.error(err);
        });

        client.channels.fetch(process.env.WAITLIST_7PM).then(channel => {
          channel.messages.fetch(`919338131348672572`).then(message => {
            message.edit("**__FREE SLOTS: " + (20 - config.numberOfTeams) + "__**");
          }).catch(err => {
            console.error(err);
          });
        });
      } else {
        const guild = client.guilds.cache.get(msg.guild.id);
        const channel = guild.channels.cache.find(c => c.id === process.env.PW_SLOTS_11PM
          && c.type === 'text');

        channel.messages.fetch(`927574994781868094`).then(message => {
          message.edit(text);
        }).catch(err => {
          console.error(err);
        });

      }

    }
  }
};

let emojis = [
  "<:mt5:882575132269359174>",
  "<:mt6:882575131384369152>",
  "<:mt7:882575131556319232>",
  "<:mt8:882575131480846346>",
  "<:mt9:882575131292102687>",
  "<:mt10:882575131254337556>",
  "<:mt11:882575131036237824>",
  "<:mt12:882575132130934834>",
  "<:mt13:882575130927194152>",
  "<:mt14:882575131938017320>",
  "<:mt15:882575130851684372>",
  "<:mt16:882575130730045450>",
  "<:mt17:882575130943959102>",
  "<:mt18:882575130541301810>",
  "<:mt19:882575130486788136>",
  "<:mt20:882575131040440342>",
  "<:mt21:882575130453217290>",
  "<:mt22:882575130314801173>",
  "<:mt23:882575130683928626>",
  "<:mt24:882575130478387220>"
];
