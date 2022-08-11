import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { networkConfig, developmentChains } from "../helper-hardhat-config";
import verify from "../helper-functions";
import { ethers } from "hardhat";

const deployDefenderBox: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments, network } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy, log } = deployments;

  log("Deploying 'DefenderBox' Contract....");

  const defenderbox = await deploy("DefenderBox", {
    from: deployer,
    args: [],
    log: true,
 
    
  });

  log(`Deployed 'DefenderBox' at ${defenderbox.address}`);
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(defenderbox.address, [])
  }

  const DefenderBox = await ethers.getContractAt("DefenderBox", defenderbox.address);
  const timeLock = await ethers.getContract("TimeLock");

  const transferTx = await DefenderBox.transferOwnership(
    timeLock.address
  );
  await transferTx.wait(1);
  log("Ownership of 'Box' transferred to 'TimeLock'...");
};

export default deployDefenderBox;
deployDefenderBox.tags = ["all", "Defenderbox"];