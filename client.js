const net = require("node:net");

const socket = net.createConnection({ host: '127.0.0.1', port: 5053 }, async () => {
  console.log("Connected to the server\n");
})