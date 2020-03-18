// https://min-api.cryptocompare.com/documentation - api documentation
class CryptoApi {
  constructor(fsym = `USD`, tsyms = []) {
    this.API_KEY = `7ab2f20860f013d2c0d43799183f3317b066bd0d82f3262d6f60a55cf740f787`
    this.selectedTsyms = tsyms
    this.selectedFsym = fsym
    this.url = `https://min-api.cryptocompare.com/data/price?fsym=${this.selectedFsym}&tsyms=${this.selectedTsyms.join(',')}&extraParams=${
      this.API_KEY
    }`
  }
  async request() {
    const res = await fetch(this.url)
    const data = await res.json()
    return data
  }
}

export default CryptoApi
