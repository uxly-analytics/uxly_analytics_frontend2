import axios from "axios";

const HOST = "http://18.223.123.138:5000/";
//const HOST = "http://localhost:8888";

interface WalletData {
  address: string;
  activeChainsSimplified: any;
  nativeBalance: any;
  nft: any;
  tokenBalance: any;
  transactions: any;
}

export async function getWalletData(
  address: string,
  chain: string,
): Promise<WalletData> {
  try {
    const response = await axios.get(
      `${HOST}/wallet?address=${address}&chain=${chain}`,
    );
    console.log(response);
    return {
      address: response.data.walletStats.address,
      activeChainsSimplified:
        response.data.walletStats.activeChainsSimplified.chains,
      nativeBalance: response.data.walletStats.nativeBalance,
      nft: response.data.walletStats.nft.nfts,
      tokenBalance: response.data.walletStats.tokenBalance.tokens,
      transactions: response.data.walletStats.transactions,
    };
  } catch (error) {
    console.log("Error: ", error);
    return {
      address: "null",
      activeChainsSimplified: {},
      nativeBalance: {},
      nft: {},
      tokenBalance: { tokens: [] },
      transactions: {},
    };
  }
}

export async function getMultipleWalletData(addresses: string[], chain:string): Promise<WalletData[]> {
    const walletDataArray: WalletData[]=[];
    for (const address of addresses){
        try{
            const response = await axios.get(
              `${HOST}/wallet?address=${address}&chain=${chain}`,
            );
            console.log(response);
             walletDataArray.push({
              address: response.data.walletStats.address,
              activeChainsSimplified:
                response.data.walletStats.activeChainsSimplified.chains,
              nativeBalance: response.data.walletStats.nativeBalance,
              nft: response.data.walletStats.nft.nfts,
              tokenBalance: response.data.walletStats.tokenBalance.tokens,
              transactions: response.data.walletStats.transactions,
            });
        } catch (error){
            console.log(`Error fetching wallet data for address ${address}:`, error);
            return [];
        }
    }
    return walletDataArray;
}