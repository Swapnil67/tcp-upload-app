const net = require("node:net");
const fs = require("node:fs/promises");

const server = net.createServer();

server.on("connection", (socket) => {
  console.log("new connection made");

  socket.on("data", (chunk) => {
    console.log("Data: ", chunk);
  });
});

server.listen(5053, () => {
  console.log(`Server listening on ${JSON.stringify(server.address())}`);
});
