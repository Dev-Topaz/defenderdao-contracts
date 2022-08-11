import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { networkConfig, developmentChains } from "../helper-hardhat-config";
import verify from "../helper-functions"
import {
  QUORUM_PERCENTAGE,
  VOTING_DELAY,
  VOTING_PERIOD,
} from "../helper-hardhat-config";

const deployDefenderGovernor: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();

  const DefenderToken = await get("DefenderToken");
  const timeLock = await get("TimeLock");

  log("Deploying the Governor contract...");
  const defenderGovernor = await deploy("DefenderGovernor", {
    from: deployer,
    args: [
      DefenderToken.address,
      timeLock.address,
      VOTING_DELAY,
      VOTING_PERIOD,
      QUORUM_PERCENTAGE,
    ],
    log: true,
    waitConfirmations: 1, // optional
  });

  log(`Deployed 'DefenderGovernor' at ${defenderGovernor.address} `);
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(defenderGovernor.address, [])
  }
};

export default deployDefenderGovernor;
deployDefenderGovernor.tags = ["all", "governor"];