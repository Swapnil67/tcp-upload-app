const net = require("node:net");
const fs = require("node:fs/promises");

// * This socket is duplex stream
const socket = net.createConnection({ host: '127.0.0.1', port: 5053 }, async () => {
  console.log("Connected to the server\n");
  // const filePath = './text-big.txt';
  const filePath = './src.txt';
  const fileHandler = await fs.open(filePath, 'r');
  // * Read Stream
  const readStream = fileHandler.createReadStream();

  // * Reading from the source file
  readStream.on('data', (chunk) => {
    console.log("chunk ", chunk.length);
    if(!socket.write(chunk)) {
      readStream.pause();
    }
  });

  socket.on('drain', () => {
    readStream.resume();
  })

  readStream.on("end", () => {
    console.log("Hwee The file was successfully uploaded");
    fileHandler.close();
    console.log("Reading Done");
    socket.end();
  })

})
