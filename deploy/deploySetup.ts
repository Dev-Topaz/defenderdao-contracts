import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";
import { ADDRESS_ZERO } from "../helper-hardhat-config";

const setupGovernanceContracts: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  const { getNamedAccounts, deployments, } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const timeLock = await ethers.getContract("TimeLock", deployer);
  const defenderGovernor = await ethers.getContract("DefenderGovernor", deployer);

  log("Setting up roles...");
  const proposerRole = await timeLock.PROPOSER_ROLE();
  const executorRole = await timeLock.EXECUTOR_ROLE();
  const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE();

  const proposerTx = await timeLock.grantRole(proposerRole, defenderGovernor.address);
  await proposerTx.wait(1);

  const executorTx = await timeLock.grantRole(executorRole, ADDRESS_ZERO);
  await executorTx.wait(1);

  const revokeTx = await timeLock.revokeRole(adminRole, deployer);
  await revokeTx.wait(1);

  log("Roles setup OK. Deployer is no longer the admin for 'TimeLock'.");
};

export default setupGovernanceContracts;
setupGovernanceContracts.tags = ["all", "setup"];