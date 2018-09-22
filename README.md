# whisper-protocol-console-app
This is simple application that implements whisper protocol using [Web3](https://github.com/ethereum/web3.js/) [Whisper](https://web3js.readthedocs.io/en/1.0/web3-shh.html)

## install
Requires a Geth (Ethereum) node connected and synchronised to a blockchain. This node must be enabled with whisper and expose a WS API for usage with the Web3.
```bash
geth --shh --rpc --rpccorsdomain "*"
```

Install all project dependencies.
```bash
npm install
```

run with symmetric key
```bash
node index.js host:localhost port:8545 nickname:shady encryption:sym topic:topic key:key
```

run with asymmetric key
```bash
node index.js host:localhost port:8545 nickname:shady encryption:asym topic:topic
```
then enter recipient key.

## user CLI
```bash
chmod +x index.js           # Make the file executable
npm link

whisper-protocol host:localhost port:8545 nickname:shady encryption:sym topic:topic key:key
```
