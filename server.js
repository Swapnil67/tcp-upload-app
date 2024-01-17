const net = require("node:net");
const fs = require("node:fs/promises");

const server = net.createServer();

server.on("connection", async (socket) => {
  console.log("new connection made");

  const fileHandler = await fs.open(`storage/test.txt`, 'w');

  socket.on("data", async (chunk) => {
    // console.log("Data: ", chunk);
    const writeStream = fileHandler.createWriteStream();
    writeStream.write(chunk);
  });

  socket.on('end', () => {
    console.log("Connection Closed on Server");
    fileHandler.close();
  })
});

server.listen(5053, () => {
  console.log(`Server listening on ${JSON.stringify(server.address())}`);
});
