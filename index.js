const { TOKEN, CHANNEL, SERVER, LIVE, STATUS} = require("./config.json");
const discord = require("discord.js");
const ytdl = require("ytdl-core");

const client = new discord.Client();

client.on('ready', async () => {
    console.log(`${client.user.username} is Ready!`)
    client.user.setActivity(STATUS)
    let channel = client.channels.cache.get(CHANNEL) || await client.channels.fetch(CHANNEL)

	if(!channel) return;
	const connection = await channel.join();
	connection.play(ytdl(LIVE))
})

setInterval(async function() {
	if(!client.voice.connections.get(SERVER)) {
		let channel = client.channels.cache.get(CHANNEL) || await client.channels.fetch(CHANNEL)
		if(!channel) return;

		const connection = await channel.join()
		connection.play(ytdl(LIVE))
	}
}, 2000)

client.login(TOKEN);