const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

// Remove build folder rm -rf
const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

// Get source code from contract file
const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");

// Use solidity compiler to compile both contracts
const output = solc.compile(source, 1).contracts;

// If path not exists, create build folder
fs.ensureDirSync(buildPath);

// Output has two objects: two contracts.
// We will take each one and put it in a different file in build folder
for (let contract in output) {
  // for in loop, loops through keys in output object
  fs.outputJsonSync(
    path.resolve(buildPath, `${contract.replace(":", "")}.json`), // Checks directory (creates it)
    output[contract] // Sets file content
  );
}
