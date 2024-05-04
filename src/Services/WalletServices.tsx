import axios from "axios";

 //const HOST = "http://18.223.123.138:5000/";
//const HOST = "https://uxly-analytics-717cfb342dbd.herokuapp.com/";
 const HOST = "http://localhost:3001";

interface WalletData {
  address: string;
  networth: any;
  nfts: any;
  tokenBalance: any;
  transactions: any;
  transactionsData: any;
}

export async function getWalletData(
  address: string,
  chain: string,
): Promise<WalletData> {
  try {
    const startTime = Date.now();

    const urls = [
      `${HOST}/wallet-networth?address=${address}`,
      `${HOST}/token-balance?address=${address}&chain=${chain}`,
      `${HOST}/nft?address=${address}&chain=${chain}`,
      `${HOST}/100transactions?address=${address}&chain=${chain}`,
      `${HOST}/aggregate-transactions?address=${address}&chain=${chain}`,
    ];

    const responses = await Promise.all(urls.map((url) => axios.get(url)));

    const endTime = Date.now();

    console.log(`Requests took ${endTime - startTime}ms`);

    console.log(responses);
    return {
      address: address,
      networth: responses[0].data,
      tokenBalance: responses[1].data,
      nfts: responses[2].data,
      transactions: responses[3].data,
      transactionsData: responses[4].data,
    };
  } catch (error) {
    console.log("Error: ", error);
    return {
      address: "null",
      networth: {},
      nfts: {},
      tokenBalance: { tokens: [] },
      transactions: {},
      transactionsData: {},
    };
  }
}

export async function getMultipleWalletData(
  addresses: string[],
  chain: string,
): Promise<WalletData[]> {
  const walletDataArray: WalletData[] = [];
  for (const address of addresses) {
    try {
      const response = await axios.get(
        `${HOST}/wallet?address=${address}&chain=${chain}`,
      );
      console.log(response);
      walletDataArray.push({
        address: response.data.walletStats.address,
        networth: response.data.walletStats.networth,
        nfts: response.data.walletStats.nft.nfts,
        tokenBalance: response.data.walletStats.tokenBalance.tokens,
        transactions: response.data.walletStats.transactions,
        transactionsData: response.data.walletStats.transactionsData,
      });
    } catch (error) {
      console.log(`Error fetching wallet data for address ${address}:`, error);
      return [];
    }
  }
  return walletDataArray;
}
