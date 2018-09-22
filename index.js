#!/usr/bin/env node

var readline = require('readline');
const {Whisper} = require('./whisper/whisper');
const {ChatServer, parseArgs} = require('./whisper/config/whisperConfig');
const {host,port,nickname,encryption,key,topic} = parseArgs();

var log = console.log;

const whisper = new Whisper({host,port,nickname,encryption,key,topic});

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var recursiveAsyncReadLine = function () {
  rl.question('Enter MSG: ', function (msg) {
    if (msg == 'exit')
      return rl.close();
    whisper.sendMessage(msg);
    recursiveAsyncReadLine();
  });
};

if(encryption == "asym"){
  console.log("P");
  rl.question('\nPlease enter recipient key: ', function (key) {
    whisper.setKey(key);

  recursiveAsyncReadLine();
  });
}else{
  recursiveAsyncReadLine();
}