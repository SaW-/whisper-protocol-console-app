const chai = require('chai')
const Web3 = require('web3')
const net = require('net')
const {Whisper} = require('../whisper/whisper');

var expect = chai.expect;
var assert = chai.assert;

host = "localhost"
port = "8545"
encryption = "sym"
nickname = "shady"
key = "key"
topic = "topic"

const whisper = new Whisper({host,port,nickname,encryption,key,topic});


describe('whisper', function() {
    it('whisper is listening', async function() {
        const shh = whisper.getShh();

        const isListening = await shh.net.isListening()
        expect(isListening).to.be.true;

    })

})