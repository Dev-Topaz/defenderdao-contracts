import * as dotenv from 'dotenv';
import { HardhatUserConfig, task } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import "hardhat-deploy";


dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",  
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
    paths: { tests: "tests" },  

  namedAccounts: {
    deployer: {
      default: 0
    },
  }, 

  networks: {
    hardhat: {
      chainId: 31337,
      allowUnlimitedContractSize: true
    },


    localhost: {
      chainId: 31337,
      allowUnlimitedContractSize: true
    },

    rinkeby: {
      url: process.env.RINKEBY_URL || "", 
      gas: 2100000,
      gasPrice: 8000000000,      
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },  
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  gasReporter: {

    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    
  },
};

export default config;