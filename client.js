const net = require("node:net");
const fs = require("node:fs/promises");

const socket = net.createConnection({ host: '127.0.0.1', port: 5053 }, async () => {
  console.log("Connected to the server\n");
  const filePath = './src.txt';
  const fileHandler = await fs.open(filePath, 'r');
  const stream = fileHandler.createReadStream();

  stream.on('data', (chunk) => {
    socket.write(chunk)
  })

  stream.on("end", () => {
    console.log("Hwee The file was successfully uploaded");
    fileHandler.close();
    console.log("Reading Done");
    socket.end();
  })

})