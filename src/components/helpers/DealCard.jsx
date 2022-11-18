import React, { useState } from 'react'
import OfferedNfts from './OfferedNfts';

const DealCard = ({ deal }) => {
    const { owner, sourceNftAddress, expectedNftaddress, sourceTokenIds, amountNftExpected, swapId, message, STATE } = deal;
    // //swapID, amountNftExpected are bigNumbers, convert to regular numbers
    // eslint-disable-next-line
    let swapHex = swapId.toHexString(); let swapInt = parseInt(swapHex.substring(2), 16);
    let aInt = amountNftExpected.toHexString(); let amountInt = parseInt(aInt.substring(2), 16);
    // //sourceTokenIds is an array of bigNumbers, convert to regular numbers
    const sourceArray = [];
    for (let i = 0; i < sourceTokenIds.length; i++) {
        let s = sourceTokenIds[i].toHexString(); let sInt = parseInt(s.substring(2), 16);
        sourceArray.push(sInt);
    }
    let stateInfo = "";
    if (STATE === 0) { stateInfo = "Pending"; }
    else if (STATE === 1) { stateInfo = "Completed"; }
    else if (STATE === 2) { stateInfo = "Closed"; }

    return (
        <div className='border rounded border-gray-400 py-8 px-10 w-full mx-auto mb-6 md:mb-10'>
            <div>Proposer: {shortenAddress(owner)}</div>
            <div>My NFT: {sourceNftAddress}</div>
            <div className='mt-4'>My Offered Tokens</div>
            {sourceArray.map((id, index) => (
                <OfferedNfts key={index} id={id} address={sourceNftAddress} />
            ))}
            <div className='mt-4'>NFT I want: {expectedNftaddress}</div>
            <div className='mb-4'>Amount of NFTs I want: {amountInt}</div>
            <div>Message: {message}</div>
            <div>Status: {stateInfo}</div>

            {stateInfo === "Pending" && (<div className='w-full'>
                <button className='bttn lg:px-12 py-3 text-white mt-8 mx-auto'>Fufill Deal</button>
            </div>)}
        </div>
    )
}

export default DealCard;



export const shortenAddress = (address) => {
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`
}


/**
* /**
*  "components": [
                 { "type": "address", "name": "owner" },
                 { "type": "address", "name": "sourceNftAddress" },
                 { "type": "address", "name": "expectedNftaddress" },
                 { "type": "uint256[]", "name": "sourceTokenIds" },
                 { "type": "uint256[]", "name": "receivedTokenIds" },
                 { "type": "uint256", "name": "amountNftExpected" },
                 { "type": "uint256", "name": "swapId" },
                 { "type": "string", "name": "message" },
                 { "type": "uint8", "name": "STATE" }
             ]


                  <div>{sourceTokenIds}</div>
    <div>{receivedTokenIds}</div>
    <div>{amountNftExpected}</div>
     <div>{swapId}</div>
*/