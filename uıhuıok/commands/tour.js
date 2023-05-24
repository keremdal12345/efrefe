module.exports = {
  name: "tour", // this is the command
  description: "tour", // this doesnt matter, its just for you
  execute(msg) {
    if (msg.member.roles.cache.find(role => role.name === "ʚ Bot Admin ɞ")) {
      msg.channel.send("<a:p_warning:928906713803919360>All **__REGISTERED__** players per team must be present in our server.\n<a:p_warning:928906713803919360>Minimum **__THREE__** tags required.\n<a:p_warning:928906713803919360>**Edits Allowed** Up to 06.02.2022.\n\n**Registration closes: __6th February 15 CET__**\n\n<a:p_warning:928906713803919360>***NO Roster Change After Registration Close!***");
    } else {
      msg.channel.send("Only ʚ Bot Admin ɞ can use this command!");
    }
  }
};
      