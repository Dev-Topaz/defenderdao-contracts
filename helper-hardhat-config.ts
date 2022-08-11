export interface networkConfigItem {
    ethUsdPriceFeed?: string
    blockConfirmations?: number
  }
  
  export interface networkConfigInfo {
    [key: string]: networkConfigItem
  }
  
  export const networkConfig: networkConfigInfo = {
    localhost: {},
    hardhat: {},
    // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
    // Default one is ETH/USD contract on Kovan
    kovan: {
      blockConfirmations: 6,
    },
  }


export const developmentChains = ["hardhat", "localhost"]
export const proposalsFile = "proposals.json"


// For TimeLock
export const MIN_DELAY = 3600;
export const PROPOSERS: string[] = [];
export const EXECUTORS: string[] = [];

export const QUORUM_PERCENTAGE = 5; // Need 5% of voters to pass
export const VOTING_PERIOD = 225; // 225 blocks 
export const VOTING_DELAY = 10; // 10 Block - 

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export const FUNC = "store";
export const FUNC_ARGS = "https://ipfs.io/ipfs/QmQnttNhnUy1o5N5QRGtobXwtCyQWQLg78yXmShZK4CJvB"; // New value voted into Box.
export const DESCRIPTION = "Proposal #1 - include https://ipfs.io/ipfs/QmQnttNhnUy1o5N5QRGtobXwtCyQWQLg78yXmShZK4CJvB in DefenderBox Phishing";
export const PROPOSAL_FILE = "proposals.json";

// Voting Script
export const VOTE_REASON = "We are protecting the Ecosystem";

