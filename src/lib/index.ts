import * as utils from 'ethereumjs-util'
import concurrencyLimiter from 'p-limit'
import shuffle from 'shuffle-array'
import { request } from 'graphql-request'

import { oToken, Oracle, UniswapFactory } from '../contracts'
import { account, getTransactionLink, providerUrl, web3, Worker } from '../worker'

// How many CDPs will be liquidated in a bunch
const BATCH_SIZE = Number(process.env.BATCH_SIZE) || 5

// How many CDPs will be liquidated in parallel
const CONCURRENCY = Number(process.env.CONCURRENCY) || 1

// How many block confirmations are needed to consider irreversible
const CONFIRMATION_BLOCKS = Number(process.env.CONFIRMATION_BLOCKS) || 8

// Gas price used for transactions (in gwei)
const GAS_PRICE = (Number(process.env.GAS_PRICE) || 20) * 1e9

const fetchQuery = (url, query, variables) => request(url, query, variables)

export class LiquidationKeeper extends Worker {
  readonly ratioThreshold = Number(process.env.COLLATERALIZATION_RATIO_THRESHOLD)

  private oracle: Oracle
  private uniswapFactory: UniswapFactory
  // private policyService: PolicyService
  // private userProxyRegistry: UserProxyRegistry

  protected async setup() {
    try {
      // Create Maker client
      // this.maker = await Maker.create('http', {
      //   url: providerUrl,
      //   privateKey: account.privateKey,
      //   log: false
      // })

      // Workaround to avoid memory leak warning
      process.setMaxListeners(100)
    } catch (err) {
      this.logger.error(err.message)
      process.exit(1)
    }

    // try {
    //   await this.maker.authenticate()

    //   this.logger.info('MakerDAO client authenticated')
    // } catch (err) {
    //   this.logger.error(err, 'MakerDAO client authentication failed')
    //   process.exit(1)
    // }

    try {
      this.oracle = await Oracle.build(web3 as any)
    } catch (err) {
      this.logger.error(err, 'Initialization of Oracle service contract failed')
      process.exit(1)
    }

    try {
      this.uniswapFactory = await UniswapFactory.build(web3 as any)
    } catch (err) {
      this.logger.error(err, 'Initialization of UniswapFactory service contract failed')
      process.exit(1)
    }

    // try {
    //   this.userProxyRegistry = await UserProxyRegistry.build(web3 as any)
    // } catch (err) {
    //   this.logger.error(err, 'Initialization of user proxy registry contract failed')
    //   process.exit(1)
    // }

    // Show collateralization ratio threshold
    this.logger.info(`Collateralization ratio threshold: ${this.ratioThreshold * 100}%`)
  }

  protected async doWork() {
    const task = concurrencyLimiter(CONCURRENCY)

    this.logger.info(
      `DO WORK`
    )

    const graphData = await getData()

    console.log(graphData)
    const strikes = Array.from(new Set(graphData.optionsContracts.map(o => o.strike)))

    const ethToStrikePrices = (await Promise.all(strikes.map(async strike => {
      const price = await this.oracle.getPrice(strike as string)
      return [strike, price]
    }))).reduce((acc, el) => {
      return {
        ...acc,
        [el[0]]: el[1]
      }
    }, {} as any)

    this.logger.info(ethToStrikePrices)

    graphData.optionsContracts.forEach(async (option) => {
      const oTokenContract = await oToken.build(web3 as any, option.id)
      const exchangeAddress = await this.uniswapFactory.getExchange(option.id)
      const availableOTokens = await oTokenContract.getBalance(exchangeAddress)

      option.vaults.forEach(async vault => {
        if (vault.collateral !== '0' && vault.oTokensIssued !== '0') {
          const unsafe = await oTokenContract.isUnsafe(vault.owner)
          const max = await oTokenContract.maxOTokensLiquidatable(vault.owner)

          this.logger.info(
            `Vault from owner=${vault.owner} in oToken=${option.id} is ${unsafe ? `UNSAFE with ${max.toString()} to liquidate` : "SAFE"} - available ${availableOTokens.toString()}`
          )

          // if unsafe and availableOTokens
            // buy max oTokens | availableOTokens
            // approve oTokens
            // liquidate vault
        }
      });
    });
  }
}


const getData = async () => {
  const now = Math.round(Date.now() / 1000)

  const query = `
    query contracts($now: BigInt!) {
      optionsContracts(where: {expiry_gt: $now}){
        id
        minCollateralizationRatioValue
        strike
        vaults {
          owner
          collateral
          oTokensIssued
        }
      }
    }
  `
  const result: any = await fetchQuery('https://api.thegraph.com/subgraphs/name/aparnakr/opyn', query, { now })

  return result
}
