require("dotenv").config();
const { ethers, network } = require("hardhat");
const { developmentChains, networkConfig } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { log, deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;

    const { name } = networkConfig[chainId];
    const args = [name];
    log("---------------------------------------------------------------");

    log("deploying contract and waiting for confirmations");
    const contract = await deploy("nftSwapper", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    });

    log(`contract deployed at ${contract.address}`);
    log("---------------------------------------------------------------");

    if (!developmentChains.includes(network.name) && process.env.BLOCKSCAN_API) {
        await verify(contract.address, args);
    }
};

module.exports.tags = ["all", "swapper"];
