const path = require("node:path");
const net = require("node:net");
const fs = require("node:fs/promises");
const { clearLine, moveCursor } = require("./utility");

// * For Upload Progress
let uploadedPercentage = 0;
let bytesUploaded = 0;



// * This socket is duplex stream
const socket = net.createConnection({ host: '127.0.0.1', port: 5053 }, async () => {
  console.log("Connected to the server\n");


  const filePath = process.argv[2];
  const fileName = path.basename(filePath); // * Returns just the file name

  socket.write(`fileName: ${fileName}----------`);

  // const filePath = './text-big.txt';
  // const filePath = './src.txt';
  //* Open the file handler
  const fileHandler = await fs.open(filePath, 'r');

  // * Get the file Stat
  const fileStat = await fileHandler.stat();
  const fileSize = fileStat.size;
  
  // * Read Stream
  const readStream = fileHandler.createReadStream();
  
  
  // * Reading from the source file
  readStream.on('data', (chunk) => {
    if(!socket.write(chunk)) {
      readStream.pause();
    }
    
    // * Calculate the uploaded percentage
    bytesUploaded += chunk.length;
    let percent = parseFloat((bytesUploaded / fileSize) * 100).toFixed(2);
    if(percent !== uploadedPercentage) {
      moveCursor(0, -1);
      clearLine();
      console.log(`Uploading... ${percent}%`);
      uploadedPercentage = percent;
    }
    // console.log("chunk ", chunk.length);

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
