const net = require("node:net");
const fs = require("node:fs/promises");

const server = net.createServer();

let fileHandler, writeStream = null;

server.on("connection", async (socket) => {
  console.log("new connection made");
  
  socket.on("data", async (chunk) => {
    // console.log("Data: ", chunk);
    // console.log("fileHandler: ", fileHandler);
    if(!fileHandler) {
      socket.pause(); // * No longer receive data from client
      fileHandler = await fs.open(`storage/test.txt`, 'w');

      // * Write Stream
      writeStream = fileHandler.createWriteStream();

      // * Writing to a destination file
      writeStream.write(chunk);

      socket.resume(); // * Resume receiving data from client

      writeStream.on('drain', () => {
        socket.resume();
      })

    } 
    else {
      if(!writeStream.write(chunk)) {
        socket.pause();
      }
    }

  });

  socket.on('end', () => {
    console.log("socket.readableEnded: ", socket.readableEnded);
    console.log("Connection Closed on Server");
    if(fileHandler) {
      fileHandler.close();
      fileHandler = null;
      writeStream = null;
    }
  })
});

server.listen(5053, () => {
  console.log(`Server listening on ${JSON.stringify(server.address())}`);
});
