import web3 from './web3'

export async function getTransactionLink(transactionHash: string) {
  const baseUrl = await getEtherScanUrl()

  if (baseUrl && transactionHash) {
    return `${baseUrl}/tx/${transactionHash}`
  }

  return ''
}

export async function getAddressLink(address: string) {
  const baseUrl = await getEtherScanUrl()

  if (baseUrl && address) {
    return `${baseUrl}/address/${address}`
  }

  return ''
}

async function getEtherScanUrl() {
  const network = await web3.eth.net.getNetworkType()

  if (network !== 'private') {
    const subdomain = network !== 'main' ? `${network}.` : ''

    return `http://${subdomain}etherscan.io`
  }

  return ''
}
