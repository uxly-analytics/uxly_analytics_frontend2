import axios from "axios";

//const HOST = "http://54.219.64.148:5000/";
const HOST = "http://localhost:8888";

interface SingleAddressData{
    activeChains: any;
    simplifiedActiveChains: any;
    nativeBalance: any;
    ercBalance: any;
    nft: any;
}

export async function getSingleAddressData(address: string): Promise<SingleAddressData> {
    try{
        const activeChains = await sActiveChains(address);
        const simplifiedActiveChains = await sSimplifiedActiveChains(address);
        const nativeBalance = await sNativeBalance(address);
        const ercBalance = await sErcBalance(address);
        const nft = await sNFT(address);

        return{
            activeChains,
            simplifiedActiveChains,
            nativeBalance,
            ercBalance,
            nft
        }
    }catch(error){
        console.error("Error:", error);
        return {
            activeChains: {},
            simplifiedActiveChains: {},
            nativeBalance: {},
            ercBalance: {},
            nft: {}
        };
    }
}

//the "s" at the beginning denotes a single address
//"m" denotes multiple addresses
//open to change
export async function sActiveChains(address: string){
    try{
        const response = await axios.get(`${HOST}/active-chains/${address}`);
        return response.data.response.active_chains;
    }catch (error){
        console.error('Error:', error);
        return 0;
    }
}

export async function sSimplifiedActiveChains(address: string){
    try{
        const response = await axios.get(`${HOST}/active-chains-simplified/${address}`);
        return response.data.chains;
    }catch(error){
        console.error('Error:', error);
        return 0;
    }
}

export async function sNativeBalance(address: string){
    try{
        const response = await axios.get(`${HOST}/native-balance/${address}`);
        return response.data.balance;
    }catch(error){
        console.error('Error:', error);
        return 0;
    }
}

export async function sErcBalance(address: string){
    try{
        const response = await axios.get(`${HOST}/erc-balance/${address}`);
        return response.data.tokens;
    }catch(error){
        console.error('Error:', error);
        return 0;
    }
}

export async function sNFT(address: string){
    try{
        const response = await axios.get(`${HOST}/nft/${address}`);
        return response.data.nfts;
    }catch(error){
        console.error('Error:', error);
        return 0;
    }
}