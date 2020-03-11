import Web3 from 'web3'

export interface ContractArtifact {
  contractName: string;
  abi: any[];
  networks: {
    [networkId: string]: {
      address: string;
      transactionHash: string;
      // ...
    };
  };
  // ...
}

interface ContractOptions {
  address: string
  initialBlock: number
  jsonInterface: any[]
  networkType: string
  web3: Web3
}

export abstract class SmartContract {
  protected static configure({ contractName, abi, networks: artifacts }: ContractArtifact) {
    return async (web3: Web3): Promise<ContractOptions> => {
      // Obtain current network ID
      const [networkId, networkType] = await Promise.all([
        web3.eth.net.getId(),
        web3.eth.net.getNetworkType()
      ])

      if (!artifacts || !artifacts[`${networkId}`]) {
        throw Error(`${contractName} contract not available in ${networkType} (id:=${networkId})`)
      }

      const { address, transactionHash } = artifacts[`${networkId}`]

      // Obtain block in which the contract was deployed
      let initialBlock = 0

      if (transactionHash) {
        const tx = await web3.eth.getTransaction(transactionHash)

        initialBlock = tx.blockNumber
      }

      return {
        address,
        initialBlock,
        jsonInterface: abi,
        networkType,
        web3
      }
    }
  }

  // Contract address
  readonly address: string

  // Network in which the contract was deployed
  readonly networkType: 'main' | 'morden' | 'ropsten' | 'rinkeby' | 'kovan' | 'private'

  // Block number in which the contract was deployed
  readonly initialBlock: number = 0

  // Web3 contract instance
  readonly contract: any

  // Web3 instance
  readonly web3: Web3

  protected constructor({ web3, jsonInterface, ...options }: ContractOptions) {
    Object.assign(this, options)
    this.contract = new web3.eth.Contract(jsonInterface, options.address)
    this.web3 = web3
  }
}

export default SmartContract
