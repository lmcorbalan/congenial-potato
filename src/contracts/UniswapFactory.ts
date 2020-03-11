import Web3 from 'web3'
// import abi from './abis/oToken.json'
import SmartContract from './SmartContract'

export class UniswapFactory extends SmartContract {
  static async build(web3: Web3): Promise<UniswapFactory> {
    const networkId = await web3.eth.net.getId()
    const networks = {
      [networkId]: {
        address: '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95',
        transactionHash: ''
      }
    }

    const builder = UniswapFactory.configure({ contractName: 'UniswapFactory', abi, networks })
    const options = await builder(web3)

    return new UniswapFactory(options)
  }

  async getExchange(address: string) {
    const exchange = await this.contract.methods.getExchange(address).call()

    return exchange
  }
}

export default UniswapFactory


const abi =  [{"name":"NewExchange","inputs":[{"type":"address","name":"token","indexed":true},{"type":"address","name":"exchange","indexed":true}],"anonymous":false,"type":"event"},{"name":"initializeFactory","outputs":[],"inputs":[{"type":"address","name":"template"}],"constant":false,"payable":false,"type":"function","gas":35725},{"name":"createExchange","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"address","name":"token"}],"constant":false,"payable":false,"type":"function","gas":187911},{"name":"getExchange","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"address","name":"token"}],"constant":true,"payable":false,"type":"function","gas":715},{"name":"getToken","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"address","name":"exchange"}],"constant":true,"payable":false,"type":"function","gas":745},{"name":"getTokenWithId","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"uint256","name":"token_id"}],"constant":true,"payable":false,"type":"function","gas":736},{"name":"exchangeTemplate","outputs":[{"type":"address","name":"out"}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":633},{"name":"tokenCount","outputs":[{"type":"uint256","name":"out"}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":663}]
