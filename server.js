var net = require("net");
var fs = require("fs");
var chalk = require('chalk');
var red = chalk.bgRed;
var mag = chalk.bgMagenta;
var port = 2000;

var server = net.createServer(function(connection) {
	console.log("User connected");
	connection.write(red("  /\\\\,/\\\\,          ,, ,,                 ") + "\n");
	connection.write(red(" /| || ||    _    ' || ||          ,      ") + "\n");
	connection.write(red(" || || ||   < \\, \\\\ || ||/|,  /'\\\\ \\\\ /`  ") + "\n");
	connection.write(red(" ||=|= ||   /-|| || || || || || ||  \\\\    ") + "\n");
	connection.write(red("~|| || ||  (( || || || || |' || ||  /\\\\   ") + "\n");
	connection.write(red(" |, \\\\,\\\\,  \\\/\\\\ \\\\ \\\\ \\\\/   \\\\,/  /  \\;  ") + "\n");
	connection.write(mag("Available commands: add, del, list, help, render ") + "\n");
	connection.on("data", function(data){
		var str = data.toString();
		var trim = str.trim();
		var input = trim.split(" ");
		var cmd = input[0];

		var msgDat = fs.readFileSync("./msg.json", "utf8");
		var msgPar = JSON.parse(msgDat);

		if (cmd === "add") {
			var msg = input[1];
			var newMsg = {"body": msg};
			
			msgPar.push(newMsg);
			var reStr = JSON.stringify(msgPar);
			fs.writeFileSync("./msg.json", reStr);
		}

		if (cmd === "list") {
			var x = 1;
			connection.write("---------- \n");
			if (msgPar.length === 0) {
				connection.write("No messages to display. \n");
			} else {
				msgPar.forEach(function(msg) {
					console.log(x + ". " + msg.body);
					connection.write(x + ". " + msg.body + "\n");
					x++;
				});
			}
			connection.write("---------- \n");
		}

		if (cmd === "del") {
			var cmd2 = input[1];
			if (cmd2 === "all") {
				msgPar = [];
				var reStr = JSON.stringify(msgPar);
				fs.writeFileSync("./msg.json", reStr);
			} else {
				var num = parseInt(input[1]);
				var pNum = (num - 1);
				console.log(pNum);
				msgPar.splice(pNum, 1);
				var reStr = JSON.stringify(msgPar);
				fs.writeFileSync("./msg.json", reStr);
			}
			
		}

		if (cmd === "help") {
			connection.write("add '(msg)' - Adds message within the quotes \n");
			connection.write("del #/all - Deletes message of given number or all messages \n");
			connection.write("list - View all messages \n");
			connection.write("help - Command list \n");
			connection.write("render #/all - Render all messages into an HTML document \n");
		}
	})
})

server.listen(port, function() {
	console.log("Any port in a storm. (" + port + ")");

})