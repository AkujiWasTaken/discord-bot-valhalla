const fs = require('node:fs'); // fs is a native module and is used to read the commands directory to identify our command files
const path = require('node:path'); // path is nodes native path utility module. helps us construct our paths to access files and directories
// path automatically detects the operating system and uses appropriate joiners

// Require the necessary discord.js classes
const {Client, AuditLogEvent, Events, GatewayIntentBits, Collection} = require("discord.js");
const {token} = require("./config.json");

// Create a new client instance
const client = new Client({intents: [GatewayIntentBits.Guilds]});

client.commands = new Collection(); // collections extends js native map class and includes more extensive useful functionality, collection is used to store and efficiently retrieve commands for execution

const commandsPath = path.join(__dirname, 'commands'); // path.join helps to construct a path to the commands directory
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); // fs.readdirsync() reads the path to the directory and returns an array of all the file names it contains. to ensure only command files get processed Array.filter() removes any non javascript files from the array

// loop over the array and dynamically set each command into the client.commands collection
for (const file of commandFiles){
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // set a new item in the collection with the key as the command and the value as the exported module
    //for each file being loaded, check it has at least the data and execute properties; helps prevent errors from loading unfinished or empty command files
    if ('data' in command && 'execute' in command){
        client.commands.set(command.data.name, command);
    }
    else{
        console.log(`[WARNING]: The command at: ${filePath} is missing a required "data" or "execute" property!`);
    }
}
// when the client is ready, run this code (once)
// we use 'c' for the event parameter to keep it seperate from the already defined client
client.once(Events.ClientReady, c => {
    console.log(`Ready and logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

    if(!command){
        console.error(`No command matching ${interaction.commandName} could be found!`);
        return;
    }
    try{
        await command.execute(interaction);
    } catch(error){
        console.error(error);
        await interaction.reply({content: 'There was an error executing this command!', ephemeral: true});
    }
});

client.on('interactionCreate', async interaction => {
	if (interaction.isChatInputCommand()) {
		// command handling
	} else if (interaction.isAutocomplete()) {
		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.autocomplete(interaction);
		} catch (error) {
			console.error(error);
		}
	}
});

client.on(Events.MessageDelete, async message => {
    // Ignore if it's direct messages
    if(!message.guild) return;
    const fetchedLogs = await message.guild.fetchAuditLogs({
        limit: 1,
        type: AuditLogEvent.MessageDelete,
    });

    // since there's only 1 audit log entry in this collection, grab the first one
    const deletionLog = fetchedLogs.entries.first();

    // perform a coherence check to make sure there's something
    if(!deletionLog) return console.log(`A message by ${message.author.tag} was deleted, but there was no relevant audit`);


    // now grab the user object of the person who deleted the message
    // also grab the target of this action to double-check
    const { executor, target } = deletionLog;

    // update the output with more information
    // also run a check to make sure the log returned was for the authors message
    if(target.id === message.author.id){
        console.log(`A message by: ${message.author.tag} was deleted by: ${executor.tag}`);  
    } else{
        console.log(`A message by: ${message.author.tag} was deleted, but the deleting party is unknown`);
    }
});

let statuses = [ // making an array to iterate over
    "/help",
    "/server",
    "/help",
]
client.on("ready", () => {
    // run every 5 seconds
    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * (statuses.length - 1) + 1);
        const newActivity = statuses[randomIndex];

        client.user.setActivity(newActivity);
    }, 5000);
});
// Log in to discord with the client token
client.login(token);