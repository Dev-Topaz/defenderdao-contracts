import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import verify from "../helper-functions";
import { networkConfig, developmentChains } from "../helper-hardhat-config";
import { ethers } from "hardhat";

const deployDefenderToken: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  const { getNamedAccounts, deployments, network} = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log("Deploying Defender Token....");
  const defenderToken = await deploy("DefenderToken", {
    from: deployer,
    log: true,
    args: [],
    
  });

  log(`Deployed 'DefenderToken' at ${defenderToken.address}`);
  
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(defenderToken.address, [])
  }


  // Delegate votes to deployer.
  await delegate(defenderToken.address, deployer);
  log(`Delegated votes to ${deployer} `);
};

const delegate = async (
  defenderTokenAddress: string,
  delegatedAccount: string
) => {
  const defenderToken = await ethers.getContractAt(
    "DefenderToken",
    defenderTokenAddress
  );
  const txResponse = await defenderToken.delegate(delegatedAccount);
  await txResponse.wait(1);
  console.log(
    `Checkpoints: ${await defenderToken.numCheckpoints(delegatedAccount)}`
  );
};

export default deployDefenderToken;
deployDefenderToken.tags = ["all", "defender token"];