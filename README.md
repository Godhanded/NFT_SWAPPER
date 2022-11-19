# NFT SWAPPER(NDegenerate Swap)

>## Table of Contents
- [Problem Statement](#problem-statement)
- [Project Details](#project-description)
- [Solution](#solution)
- [Technologies Used](#technologies-used)
    - [Smart Contract](#solidity-smart-contract)
    - [Polygon](#polygon-mumbai)
    - [React chat forum](#react-chat-forum)
    - [IPFS](#ipfs)
- [Important Live Links](#importantlive-hosted-project-links)
- [Team Members](#contributors)
- [Project Features](#project-features)
- [Features We Couldn't Complete](#features-we-couldnt-complete)


#
## Important/Live Hosted Project Links
- **Hosted URL** > https://ndegenerate-swap.on.fleek.co/

- **Github** > https://github.com/Godhanded/NFT_SWAPPER
- **Front end code/Branch** [click here](https://github.com/Godhanded/NFT_SWAPPER/tree/frontend)

- **Contract** > [0x86338f4386cce1CD8474De7CdfB379C46f033D50](https://mumbai.polygonscan.com/address/0x86338f4386cce1CD8474De7CdfB379C46f033D50#readContract)


#
> ## Problem Statement
- What happened to the good old days when we traded valuable collectibles like base-ball player card,we'd make deals and bargain on which players i give you in echange for a player you have that i like. why cant we do that with nfts, must I lalways use a Market place?
- currently the most popular way of exchanging nfts is by directly transfering it to a friend or buy it from a market place, shouldn't there be some other criteria or medium for the exchange of nfts, you might have a bored and I have 2 punks, you like the punks and their communities and I like that of the bored apes, Why dont we make the exchange or Swap.
- how can we make this swap in a secure trust free and truth based procedure?
- Why cant we exchange our nfts with who ever all over the world through a direct swap or exchange without the need to get on an Nft market place to by one? 
- we strike a deal and exchange value for value, NFTs for NFTs!

#
> ## Project Description
<p>NDegenerate swap is a Tool that brings a new Use or Method of Exchange of NFTs possible! NDegenerate Swap lets you disscuss, Haggle,Trade and Exchange NFTS for NFTS through trust minimized swaps. It allows Nft owners to swap and exchange NFTs like we did Trading Cards, like baseball or football player trading cards</p> 


#
> ## Technologies Used

 | <b><u>Stack</u></b> | <b><u>UsageSummary</u></b> |
 | :------------------ | :------------------------- |
 | **`Solidity`**      | Smart contract             |
 | **`React Js`**      | Front End   /chat Forum    |
 | **`IPFS`**          | Website hosting on.fleek   |
 | **`Polygon Mumbai`**| Deployed on Polygon Testnet|

- ### Solidity Smart Contract
    - NDegenrate Swap makes use of one contract called the nftSwapper [see here](https://github.com/Godhanded/NFT_SWAPPER/blob/main/contracts/swapper.sol), this contract is designed in a such a way as to collect details concerning a swap deal, the expected and source nft addreses, number of nfts expected and deposited, the contracts collects th nfts then performs the swaps when someone else fullfills the swap deal details, a fee of 0.001 is collected to create a swap deal. 
    - before any deal is fullfilled the user has the pportunity to close/cancel th deal and get back their nfts and Matic

- ### IPFS
    - The NDegenerate swap website was hosted using file coin through on.fleek
    - see here[ipfs hash](https://ipfs.fleek.co/ipfs/QmWNSvMicrmHF2eEk92EUXtErZ8ix1QfgnCGapLR43NowC)

- ### React Chat Forum
    - we attached an external chat forum or a chat feature to NDegenerate swap to encourage community and as a place for possible swaps to be discussed before they are created o the contract.see [BondCenter](https://ndegenerate-swap.on.fleek.co/dashboard/board-center) in the frontend

- ### Polygon Mumbai
    - The contract was deployed and verified on the polygon chain, a sample nft called numpy was also deployed and used to create deals on the nftswapper contract
    - 0.001 matic is required to create swap deals
    - see contract [here](https://mumbai.polygonscan.com/address/0x86338f4386cce1CD8474De7CdfB379C46f033D50#readContract)


#
## Solution
NDegnerate swap is the solution we built to make this possible
- it is a smart contract that allows for automatic swaps between users backed by truth
- Users can come on the platform and provide details of the deal they want to create, details like: address of nft they are offering,token ids of nfts offered, the expected address of the nft they want i return and how many in total they want in return, a short message can also be added. 
- Our nftSwapper contract then collects these details and transfers these nfts from the creator to itself using the **setApprovalforAll** and **SafeTransferFrom** methods, it stores this deal.
- next someone else comes on the platform sees this deal and likes it, they provide the token ids and contract address of the expected nfts and the swap is made instantly!


#
## Project features
- Haggle, Discuss, Negitiate on the chat forum
- Create/Publish NFT Swap deals
- Fullfill Swap deals
- Swap NFTs(single or multiple)

#
## Features we couldn't complete
- NDegenerate swap is still at its start and theres alot to still be implemented:
    - A more beautiful User-Interface
    - Add support for chainlink datafeeds and Any api, to handle price to create a deal, retreiving of NFT images from our api, to mention a few
    - A better Bond center or chat, to seperate discussions and support rooms
    - Improved support for ERC1155

#
> ## Contributors
- Godhanded
    - [Twitter, @Godand](https://twitter.com/Godand_)
    - [Github, @Godhanded](https://github.com/Godhanded) <br>
- frankudoags
    - [Twitter, @frankudoags1]()
    - [Github, @frank_udoags](https://github.com/frank_udoags)<br>