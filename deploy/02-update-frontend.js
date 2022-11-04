const { frontEndContractsFile, frontEndAbiFile } = require("../helper-hardhat-config");
const fs = require("fs");
const { network } = require("hardhat");

module.exports = async () => {
    console.log("Writing to Constants...");
    await updateContractAddresses();
    await updateAbi();
    console.log("COonstants written!");
};

async function updateAbi() {
    const contract = await ethers.getContract("nftSwapper");
    fs.writeFileSync(
        frontEndAbiFile,
        contract.interface.format(ethers.utils.FormatTypes.json)
    );
}

async function updateContractAddresses() {
    const contract = await ethers.getContract("nftSwapper");
    const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"));
    if (network.config.chainId.toString() in contractAddresses) {
        if (
            !contractAddresses[network.config.chainId.toString()].includes(
                contract.address
            )
        ) {
            contractAddresses[network.config.chainId.toString()].push(contract.address);
        }
    } else {
        contractAddresses[network.config.chainId.toString()] = [contract.address];
    }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses));
}
module.exports.tags = ["all", "frontend"];
