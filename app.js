"use strict";

process.title = "Bluk Bitcoin legacy Wallet Generator";

// Importing required modules
const CoinKey = require('coinkey');
const crypto = require('crypto');
const fs = require('fs');
const readline = require('readline');

// Creating a readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let wallets = [];
// Prompting the user for the number of wallets to generate
rl.question("How many wallets do you want to generate? ", (numWallets) => {
    console.log(`User entered: ${numWallets}`);

    // Parsing the user input as an integer
    numWallets = parseInt(numWallets);

    // Creating an array to store the generated wallets
    

    // Generating the specified number of wallets
    for (let i = 0; i < numWallets; i++) {
        console.log(`Generating wallet ${i + 1} of ${numWallets}`);

        // Generating a random private key in hexadecimal format
        let privateKeyHex = crypto.randomBytes(32).toString('hex');

        // Creating a CoinKey object using the private key
        let ck = new CoinKey(Buffer.from(privateKeyHex, 'hex'));

        // Setting the compressed property of the CoinKey object to false
        ck.compressed = false;

        // Adding the generated wallet to the array
        wallets.push({
            private_key: privateKeyHex,
            public_address: ck.publicAddress
        });
    }

    console.log(`Generated ${numWallets} wallets`);

    try {
        // Saving the generated wallets to a file using fs.writeFileSync
        fs.writeFileSync('./generated.txt', JSON.stringify(wallets, null, 4));
        console.log(`Saved generated wallets to generated.txt`);
    } catch (err) {
        console.error(`An error occurred while writing to the file: ${err.message}`);
    }

    // Closing the readline interface
    rl.close();
});
