require('http').createServer((req, res) => res.end('Hey Tay! MT Bot is alive!')).listen(3000);

// DONT CHANGE //
var fs = require("fs");
require("dotenv").config();

const db = require("./db.js");

const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.login(process.env.BOTTOKEN).catch(err => {
  console.error('smth wrong');
}); // here it gets bot token from .env on left

const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// DONT CHANGE //
client.on("ready", async () => {
  console.log(`MeiTuan bot is Ready!`); // this is just for logs to see when it started

  // await db.restartConfig('config_7pm');

  let config_7pm = await db.getConfig('config_7pm');

  console.log("\n----7pm scrims----\n");
  console.log(`Registration open: ` + config_7pm.registrationsOpen);
  console.log(`Waitlist open: ` + config_7pm.waitlist);
  console.log(`Number of teams: ` + config_7pm.numberOfTeams);

  // await db.restartConfig('config_11pm');

  let config_11pm = await db.getConfig('config_11pm');

  console.log("\n----11pm scrims----\n");
  console.log(`Registration open: ` + config_11pm.registrationsOpen);
  console.log(`Waitlist open: ` + config_11pm.waitlist);
  console.log(`Number of teams: ` + config_11pm.numberOfTeams);

  const schedule = require("node-schedule");

  const rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [1, 2, 3, 4, 5, 6];
  rule.hour = 15;
  rule.minute = 0;
  rule.tz = "Europe/Belgrade";

  const job = schedule.scheduleJob(rule, function() {
    console.log("The answer to life, the universe, and everything!");
    client.channels.fetch(process.env.REG_7PM).then(channel => {
      channel.send("!r");
    });
  });

  const ruleWaitlist = new schedule.RecurrenceRule();
  ruleWaitlist.dayOfWeek = [1, 2, 3, 4, 5, 6];
  ruleWaitlist.hour = 18;
  ruleWaitlist.minute = 30;
  ruleWaitlist.tz = "Europe/Belgrade";

  const jobWaitlist = schedule.scheduleJob(ruleWaitlist, function() {
    if (config_7pm.numberOfTeams < 20) {
      client.channels.fetch(process.env.WAITLIST_7PM).then(channel => {
        channel.send("!w7");
      });
    } else {
      client.channels.fetch(process.env.WAITLIST_7PM).then(channel => {
        channel.send("No free slots.");
      });
      client.channels.fetch(process.env.REG_7PM).then(channel => {
        channel.send("!lk");
      });
    }
  });

  // 23:00 scrims

//   const rule11 = new schedule.RecurrenceRule();
//   rule11.dayOfWeek = [1, 2, 3, 4, 5, 6];
//   rule11.hour = 17;
//   rule11.minute = 0;
//   rule11.tz = "Europe/Belgrade";

//   const job11 = schedule.scheduleJob(rule11, function() {
//     console.log("The answer to life, the universe, and everything!");
//     client.channels.fetch(process.env.REG_11PM).then(channel => {
//       channel.send("!r");
//     });
//   });

//   const ruleWaitlist11 = new schedule.RecurrenceRule();
//   ruleWaitlist11.dayOfWeek = [1, 2, 3, 4, 5, 6];
//   ruleWaitlist11.hour = 22;
//   ruleWaitlist11.minute = 30;
//   ruleWaitlist11.tz = "Europe/Belgrade";

//   const jobWaitlist11 = schedule.scheduleJob(ruleWaitlist11, function() {
//     if (config_11pm.numberOfTeams < 20) {
//       client.channels.fetch(process.env.WAITLIST_11PM).then(channel => {
//         channel.send("!w");
//       });
//     } else {
//       client.channels.fetch(process.env.WAITLIST_11PM).then(channel => {
//         channel.send("No free slots.");
//       });
//       client.channels.fetch(process.env.REG_11PM).then(channel => {
//         channel.send("!lk");
//       });
//     }
//   });
});

client.on("message", async msg => {
  let command = msg.content; // gets msg from anywhere in channel

  if (msg.channel.id === process.env.BAN) {
    command = "!ban";
  }

  if (msg.content.startsWith("%register")) {
    command = "%register";
  }

  if (msg.content.startsWith("!c")) {
    command = "!c";
  }

  if (msg.content.toLowerCase().includes("wait")) {
    command = "wait";
  }

  if (!client.commands.has(command)) {
    // checks if msg is one of your commands
    return; // if its not command then it skips execution
  }

  let cfg = '';
  try {
    if (msg.channel.id === process.env.REG_7PM || msg.channel.id === process.env.WAITLIST_7PM || msg.channel.id === process.env.PW_SLOTS_7PM) {
      cfg = 'config_7pm';
    } 
    else if (msg.channel.id === process.env.REG_11PM || msg.channel.id === process.env.WAITLIST_11PM || msg.channel.id === process.env.PW_SLOTS_11PM) {
      cfg = 'config_11pm';
    } 

    await client.commands.get(command).execute(msg, cfg, client);
  } catch (error) {
    console.error(error);
  }
});
