const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const WebSocket = require('ws');

// Setup serial port
const port = new SerialPort({ path: '/dev/tty.usbmodem11201', baudRate: 115200 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

// Setup WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
  console.log('WebSocket client connected');
  parser.on('data', data => {
    console.log('Data from serial port:', data);
    ws.send(data);  // Sending data to connected WebSocket clients
  });
});

console.log('Server running on ws://localhost:8080');
