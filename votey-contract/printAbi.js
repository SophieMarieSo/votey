const fs = require("fs");
const abiData = fs.readFileSync("./build/contracts/Votey.json", "utf8");
const contract = JSON.parse(abiData);
console.log("##############abi Data############", JSON.stringify(contract.abi));

fs.writeFileSync("votey-abi.json", JSON.stringify(contract.abi));
