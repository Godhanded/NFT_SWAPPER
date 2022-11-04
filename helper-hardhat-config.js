const { ethers } = require("hardhat");

const networkConfig = {
    5: {
        chain: "goerli",
        name: "NFT_SWAPPER",
    },
    80001: {
        chain: "Mumbai Polygon",
        name: "NFT_SWAPPER",
    },
    31337: {
        chain: "localhost",
        name: "NFT_SWAPPER",
    },
    default: {
        chain: "hardhat",
        name: "NFT_SWAPPER",
    },
};

const developmentChains = ["hardhat", "localhost"];

const frontEndContractsFile = "./constants/contractAddresses.json";
const frontEndAbiFile = "./constants/abi.json";

module.exports = {
    networkConfig,
    developmentChains,
    frontEndAbiFile,
    frontEndContractsFile,
};
