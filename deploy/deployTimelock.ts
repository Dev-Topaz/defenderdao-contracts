import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import verify from "../helper-functions";
import { EXECUTORS, MIN_DELAY, PROPOSERS } from "../helper-hardhat-config";
import { networkConfig, developmentChains } from "../helper-hardhat-config";

const deployTimeLock: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log("Deploying the TimeLock contract...");
  const timeLock = await deploy("TimeLock", {
    from: deployer,
    args: [MIN_DELAY, PROPOSERS, EXECUTORS],
    log: true,
    // waitConfirmations: 1,
  });

  log(`Deployed 'TimeLock' at ${timeLock.address}`);
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(timeLock.address, [])
  }
};

export default deployTimeLock;
deployTimeLock.tags = ["all", "timelock"];