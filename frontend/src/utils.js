import toast from 'react-hot-toast'
import { Alchemy, Network } from 'alchemy-sdk';
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// Using HTTP
const web3 = createAlchemyWeb3( `https://polygon-mumbai.g.alchemy.com/v2/V89muXksxig8e47Q6mKzqTKuU6Gp0DV7` );




const settings = {
    apiKey: "LJDs2jvLKBWSOZiQrWmaWhgKSMbDeRxL",
    network: Network.MATIC_MUMBAI, 
    maxRetries: 10,
};

const alchemy = new Alchemy(settings);

export const NFTMetadata = async (_nftAddress, _tokenId) => {
    try {
        
        const nftMetadata = await alchemy.nft.getNftMetadata(
            alchemy,
            `${_nftAddress}`,
            `${_tokenId}`,
            "ERC721"
        );
        console.log(nftMetadata);
        return nftMetadata;
    } catch(err) {
        console.log(err.message);
    }
}

export const getUserERC721NFTS = async (address) => {
    try {
     // Get all NFTs
        const nfts = await alchemy.nft.getNftsForOwner(address);
     //filter all nfts and check that tokentype is ERC721
     const ERC721Tokens = nfts.ownedNfts.filter((nft) => nft.tokenType === "ERC721");
     return ERC721Tokens;
    }
    catch(err) {
     console.log(err.message);
    }
 }



export const shortenAddress = (address) => {
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`
  }


export const copyAddress = (address) => {
  navigator.clipboard.writeText(address)
  toast.success('Copied address to clipboard.')
}
