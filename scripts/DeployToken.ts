// eslint-disable-next-line import/no-extraneous-dependencies
import { ethers } from 'ethers';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'dotenv/config';
import * as DefenderTokenJson from '../artifacts/contracts/DefenderToken.sol/DefenderToken.json';

if (process.env.PRIVATE_KEY === '' || process.env.MNEMONIC === '') {
  console.warn('Must provide PRIVATE_KEY or MNEMONIC environment variable');
  process.exit(1);
}

if (process.env.INFURA_PROJECT_ID === '') {
  console.warn('Must provide INFURA_PROJECT_ID environment variable');
  process.exit(1);
}

async function main() {
  const wallet = process.env.MNEMONIC && process.env.MNEMONIC.length > 0
    ? ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
    : new ethers.Wallet(process.env.PRIVATE_KEY!);
  console.log(`Using address ${wallet.address}`);
  // const provider = ethers.providers.getDefaultProvider("ropsten");
  const provider = new ethers.providers.InfuraProvider(
    'ropsten',
    process.env.INFURA_PROJECT_ID,
  );
  const signer = wallet.connect(provider);
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error('Not enough ether');
  }
  console.log('Deploying DefenderToken contract');
  const tokenFactory = new ethers.ContractFactory(
    DefenderTokenJson.abi,
    DefenderTokenJson.bytecode,
    signer,
  );
  const tokenContract = await tokenFactory.deploy();
  console.log('Awaiting confirmations');
  await tokenContract.deployed();
  console.log('Completed');
  console.log(`Contract deployed at ${tokenContract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
