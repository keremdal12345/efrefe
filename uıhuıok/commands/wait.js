module.exports = {
  name: "wait", 
  description: "for ID PW managers", 
  execute(msg) {
    if (msg.channel.id === process.env.HELP_4PM)
    {
      if (msg.member.roles.cache.find(role => role.name === "4PM ID PW L-A")) 
      {
        msg.channel.send("Please wait 4PM Lobby A, maximum 1 minute only. <@&839508508949217321>")};
      
      if (msg.member.roles.cache.find(role => role.name === "4PM ID PW L-B")) 
      {
       msg.channel.send("Please wait 4PM Lobby B, maximum 1 minute only. <@&839508508949217321>")};
    }

    if (msg.channel.id === process.env.HELP_7PM)
    {

       if (msg.member.roles.cache.find(role => role.name === "7PM ID PW L-1")) 
      {
        msg.channel.send("Please wait 7PM Lobby 1, maximum 1 minute only. <@&839508508949217321>")}
    
  //let str = 'Wait';
  //str = s.toLowerCase();
  //System.out.println(lowercasestr);
  




    
  
    }
  }
}

