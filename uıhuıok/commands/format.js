module.exports = {
  name: "format", // this is the command
  description: "format", // this doesnt matter, its just for you
  execute(msg) {
    if (msg.member.roles.cache.find(role => role.name === "ʚ Bot Admin ɞ")) {
      msg.channel.send("𝙍𝙚𝙜𝙞𝙨𝙩𝙚𝙧 𝙩𝙝𝙚 𝙩𝙤***u***𝙧 𝙬𝙞𝙩𝙝 𝙩𝙝𝙞𝙨 𝙛𝙤𝙧𝙢𝙖𝙩 <a:pinkdown:895285069101555712>\nTeam Name: xxx\nTeam Tag: xxx\nTeam Manager: @Discord_ID\n\nPlayer 1: IGN @Discord_ID\nCharacter ID:\n\nPlayer 2: IGN @Discord_ID\nCharacter ID:\n\nPlayer 3: IGN @Discord_ID\nCharacter ID:\n\nPlayer 4: IGN @Discord_ID\nCharacter ID:\n\n(Optional Section)\nSubstitute 1: IGN @Discord_ID\nCharacter ID:\n\nSubstitute 2: IGN @Discord_ID\nCharacter ID:");
    } else {
      msg.channel.send("Only ʚ Bot Admin ɞ can use this command!");
    }
  }
};
      