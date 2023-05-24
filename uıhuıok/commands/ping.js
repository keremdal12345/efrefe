module.exports = {
  name: "ping tay", // this is the command
  description: "ping", // this doesnt matter, its just for you
  execute(msg) {
    if (msg.member.roles.cache.find(role => role.name === "ʚ Bot Admin ɞ")) {
      const messages = [
        "Hi, <@316311307684937739> <a:7_ASevil:900003579115487282>",
        "You're the best! <:pepeballoon:911330315824406570>",
        "Yes yes, I'm alive <a:8900pepeleave:886907935454806017>",
        "Lazie is bot <@529828554775724078>",
        "How can I help? <:pepesad:886903839872139274>",
        "Tay is lazy! <:AG_KekPat:914608334315880458>",
        "Work, work, work! Tay's watching!"
      ];

      const randomMessage =
        messages[Math.floor(Math.random() * messages.length)];

      msg.channel.send(randomMessage);
    } else {
      msg.channel.send("Only ʚ Bot Admin ɞ can use this command!");
    }
  }
};
