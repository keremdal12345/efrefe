const Database = require("@replit/database");
const db = new Database();

module.exports = { getConfig, saveConfig, restartConfig };

async function saveConfig(key, config) {
  try {
    await db.set(key, config);
    console.log("Saved: " + key);
  }
  catch (error) {
    return "Error while saving " + key;
  }
}

async function getConfig(key) {
  let config = await db.get(key);
  console.log("\nFetched " + key + "\n");
  return config;
}

async function restartConfig(key) {
  try {
    await db.set(key, {
      "registrationsOpen": false,
      "waitlist": false,
      "numberOfTeams": 0,
      "slots": [
        {
          "teamName": "",
          "teamTag": "",
          "teamManager": ""
        },
        {
          "teamName": "",
          "teamTag": "",
          "teamManager": ""
        },
        {
          "teamName": "",
          "teamTag": "",
          "teamManager": ""
        },
        {
          "teamName": "",
          "teamTag": "",
          "teamManager": ""
        },
        {
          "teamName": "",
          "teamTag": "",
          "teamManager": ""
        },
        {
          "teamName": "",
          "teamTag": "",
          "teamManager": ""
        },
        {
          "teamName": "",
          "teamTag": "",
          "teamManager": ""
        },
        {
          "teamName": "",
          "teamTag": "",
          "teamManager": ""
        },
        {
          "teamName": "",
          "teamTag": "",
          "teamManager": ""
        },
        {
          "teamName": "",
          "teamTag": "",
          "teamManager": ""
        },
        {
          "teamName": "",
          "teamTag": "",
          "teamManager": ""
        },
        {
          "teamName": "",
          "teamTag": "",
          "teamManager": ""
        },
        {
          "teamName": "",
          "teamTag": "",
          "teamManager": ""
        },
        {
          "teamName": "",
          "teamTag": "",
          "teamManager": ""
        },
        {
          "teamName": "",
          "teamTag": "",
          "teamManager": ""
        },
        {
          "teamName": "",
          "teamTag": "",
          "teamManager": ""
        },
        {
          "teamName": "",
          "teamTag": "",
          "teamManager": ""
        },
        {
          "teamName": "",
          "teamTag": "",
          "teamManager": ""
        },
        {
          "teamName": "",
          "teamTag": "",
          "teamManager": ""
        },
        {
          "teamName": "",
          "teamTag": "",
          "teamManager": ""
        }
      ]
    }
    );
    return key + " restarted";
  }
  catch (error) {
    return "Error while restarting " + key;
  }

}
