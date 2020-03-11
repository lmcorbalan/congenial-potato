import ms from 'ms'
import { Logger } from 'pino'
import { TransactionReceipt } from 'web3-core'

import { getAddressLink } from './etherscan'
import rootLogger from './logger'
import { account, providerUrl, web3 } from './web3'

interface WorkerOptions {
  name: string
  version: string
  interval?: number | string
}

export abstract class Worker {
  protected networkId: number
  protected logger: Logger

  get initialized() {
    return this.networkId && this.logger
  }

  protected constructor(readonly options: WorkerOptions) {}

  async run() {
    await this.initialize()

    // Show worker interval
    rootLogger.info(`Worker will be executed every ${this.options.interval}`)

    return checkUpdates(this.doWork.bind(this), this.options.interval)
  }

  protected async initialize() {
    if (!this.initialized) {
      const { name, version } = this.options

      rootLogger.info(`${name} - Version ${version}`)

      // Show Web3 provider info
      rootLogger.info(`Web3 provider URL: ${providerUrl}`)

      // Show current network info
      const [networkId, networkType] = await Promise.all([
        web3.eth.net.getId(),
        (web3 as any).eth.net.getNetworkType()
      ])

      rootLogger.info(`Current network: ${networkType} (id=${networkId})`)

      this.networkId = networkId

      // Show account info
      rootLogger.info(`Current account: ${await getAddressLink(account.address)}`)

      this.logger = rootLogger.child({ networkId, accountAddress: account.address })

      await this.setup()
    }
  }

  protected abstract async setup()

  protected abstract async doWork()

  protected async sendTransaction(tx) {
    const signedTransaction = await account.signTransaction(tx)

    return new Promise<TransactionReceipt>((resolve, reject) => {
      web3.eth
        .sendSignedTransaction(signedTransaction.rawTransaction)
        .once('confirmation', (_, receipt) => resolve(receipt))
        .once('error', error => reject(error))
    })
  }
}

async function checkUpdates(
  checker: () => Promise<void>,
  interval: number | string,
  runImmediately = true
) {
  const checkInterval = ms(interval + '')

  if (runImmediately) {
    await checkForUpdates()
  } else {
    setTimeout(checkForUpdates, checkInterval)
  }

  async function checkForUpdates() {
    try {
      await checker()
    } catch (e) {
      rootLogger.error(e.message)
    }

    setTimeout(checkForUpdates, checkInterval)
  }
}
