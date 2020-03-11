import Web3 from 'web3'
// import abi from './abis/Oracle.json'
import SmartContract from './SmartContract'

export class Oracle extends SmartContract {
  static async build(web3: Web3): Promise<Oracle> {
    const networkId = await web3.eth.net.getId()
    const networks = {
      [networkId]: {
        address: "0x7054e08461e3eCb7718B63540adDB3c3A1746415",
        transactionHash: ''
      }
    }

    const builder = Oracle.configure({ contractName: 'Oracle', abi, networks })
    const options = await builder(web3)

    return new Oracle(options)
  }

  async getPrice(asset: string) {
    const price = await this.contract.methods.getPrice(asset).call()

    return price
  }
}

export default Oracle


const abi =  [
  {
    "constant": true,
    "inputs": [],
    "name": "PriceOracle",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_oracleAddress",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "asset",
        "type": "address"
      }
    ],
    "name": "getPrice",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]
