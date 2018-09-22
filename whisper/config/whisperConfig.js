const ARGS = {};
function parseArgs() {
    console.log('Whisper-Protocol.\n\n' +
        'Valid command line options:\n' +
        '[nickname:<nickname>] : nickname to use\n' +
        '[host:<host>] : host to connect to\n' +
        '[port:<port>] : port to connect to\n' +
        '[encryption:<sym|asym>] : encryption type choose between sym or asym\n' +
        '[key:<port>] : password for sym or recipt key if asym\n' +
        '[topic:<topic>] : topic to subscrib to\n');


    console.log('Command line arguments: ')
    process.argv.forEach((val) => {
        const arg = val.split(":");
        if (arg[1]) {
            console.log(`${arg[0]}: ${arg[1]}`);
            ARGS[arg[0]] = arg[1];
        }
    });
    return ARGS;
}




module.exports = {
    parseArgs
};