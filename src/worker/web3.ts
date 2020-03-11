import { strict as assert } from 'assert'
import Web3 from 'web3'

const { PRIVATE_KEY, WEB3_PROVIDER_URL } = process.env

assert(PRIVATE_KEY != null, 'Private key should be provided')
assert(WEB3_PROVIDER_URL != null, 'WEb3 Provider URL should be provided')

export const providerUrl = WEB3_PROVIDER_URL

export const web3 = new Web3(providerUrl)

const privateKey = PRIVATE_KEY.startsWith('0x') ? PRIVATE_KEY : '0x' + process.env.PRIVATE_KEY

export const account = web3.eth.accounts.privateKeyToAccount(privateKey)

// Unlock account with private key
web3.eth.accounts.wallet.add(account)
web3.eth.defaultAccount = account.address

export default web3
