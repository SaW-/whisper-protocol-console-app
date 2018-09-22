
var Web3 = require('web3');
const {encodeToHex, decodeFromHex} = require('./utils/hexutils');


class Whisper {
    constructor(props) {
        
        this.web3 = new Web3(new Web3.providers.HttpProvider('http://'+(props.host +':'+props.port)));

        this.shh = this.web3.shh;
        this.key = props.key;
        this.nickName = props.nickname;
        this.encryptionType = props.encryption;
        this.topic = encodeToHex(JSON.stringify(props.topic)).substring(0, 10);

        this.msgs = [];

        this.configKey();

        

    }

    getShh(){
        return this.shh;
    }

    configKey(){
        if(this.encryptionType == "asym"){
            this.generateAsymKey();
        }else if(this.encryptionType == "sym"){
            this.generateSymKey();
        }else{
            console.log("Choose valid encryption type");
        }
    }

    generateAsymKey(){
        let data = {
			msgs: [],
			text: "",
			symKeyId: null,
			name: "",
			asymKeyId: null,
			sympw: "",
			asym: true,
			configured: false,
			topic: this.topic ,
			recipientPubKey: "",
			asymPubKey: ""
		};

		this.shh.newKeyPair().then(id => {
            data.asymKeyId = id;
            this.asymKeyId = id;
			return this.shh.getPublicKey(id).then(pubKey => {
                this.asymPubKey = pubKey;
                console.log("\nPublic Key : "+pubKey+"\n")
                this.registerTopic();
            }).catch(console.log);
		}).catch(console.log);
    }

   async generateSymKey(){
      await this.shh.generateSymKeyFromPassword(this.key).then(symKeyID => {
            this.symKeyId = symKeyID;
            this.registerTopic();
        }).catch(function (err) {
            console.log(err);
        });
    }

    registerTopic(){
        let filter = {
            topics: [this.topic ]
        };
        
        if(this.encryptionType == "asym") {
            if(!this.asymKeyId) {
                console.log("No valid asymmetric key");
            return;
        }

            filter.privateKeyID = this.asymKeyId;
        } else {
            if (!this.symKeyId || this.symKeyId.length == 0) {
                console.log("please enter a pasword to generate a key!");
            return;
        }

            filter.symKeyID = this.symKeyId;
        }


        this.msgFilter = this.shh.newMessageFilter(filter).then(filterId => {
            setInterval(() => {
                this.shh.getFilterMessages(filterId).then(messages => {

                    for (let msg of messages) {
                        let message = decodeFromHex(msg.payload);
                        console.log("\nGot MSG From  " + message.nickName + " : "+message.text);
                        this.msgs.push({
                            name: message.nickName,
                            text: message.text
                        });                        
                    }
                });
            }, 1000);
        });
        
    }

    setKey(pubKey){
        this.pubKey = pubKey;
    }

    sendMessage(text) {
        let msg = {
            text: text,
            nickName: this.nickName
        };
        
        let postData = {
            ttl: 7,
            topic: this.topic,
            powTarget: 2.01,
            powTime: 100,
            payload: encodeToHex(JSON.stringify(msg)),
        };

        if(this.encryptionType == "asym") {
            postData.pubKey = this.pubKey;
            postData.sig = this.asymKeyId;
            if(this.pubKey == "") {
                console.log("Please enter recipient key");
            return;
            }
        } else{
            postData.symKeyID = this.symKeyId;
        }

        this.shh.post(postData);
    }
}


module.exports = {
    Whisper
};