const { ethers } = require("hardhat");
const fs = require("fs");
require("dotenv").config();
const env = process.env;

async function main() {
    //* Get network */
    const accounts = await ethers.getSigners();

    console.log("==========================================================================");
    console.log("ACCOUNTS:");
    console.log("==========================================================================");
    for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        console.log(` Account ${i}: ${account.address}`);
    }

    //* Loading contract factory */
    const ArthurRouter = await ethers.getContractFactory("ArthurRouter");

    const factory = "0xAEa8dd2bA90de46170C5ABBbBE5A187acddF21E8";
    const weth = "0x451a32Fe376a699Ea25b6Cafc00E446ECC8452A9";

    //* Deploy contracts */
    console.log("==========================================================================");
    console.log("DEPLOYING CONTRACTS");
    console.log("==========================================================================");

    const arthurRouter = await ArthurRouter.deploy(factory, weth);
    await arthurRouter.deployed();
    console.log("ArthurRouter                        deployed to:>>", arthurRouter.address);

    console.log("==========================================================================");
    console.log("VERIFY CONTRACTS");
    console.log("==========================================================================");

    await hre
        .run("verify:verify", {
            address: arthurRouter.address,
            constructorArguments: [factory, weth]
        })
        .catch(console.log);

    console.log("==========================================================================");
    console.log("DONE");
    console.log("==========================================================================");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
