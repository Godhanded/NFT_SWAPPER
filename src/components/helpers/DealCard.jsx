import React, { useState, useRef } from 'react'
import toast from 'react-hot-toast';
import { useProvider, useSigner, useContract } from 'wagmi'
import { abi } from "../../constants";
import OfferedNfts from './OfferedNfts';

const DealCard = ({ deal }) => {
    const { owner, sourceNftAddress, expectedNftaddress, sourceTokenIds, amountNftExpected, swapId, message, STATE } = deal;
    // //swapID, amountNftExpected are bigNumbers, convert to regular numbers
    // eslint-disable-next-line
    let swapHex = swapId.toHexString(); let swapInt = parseInt(swapHex.substring(2), 16);
    let aInt = amountNftExpected.toHexString(); let amountInt = parseInt(aInt.substring(2), 16);

    const provider = useProvider();
    const signer = useSigner();
    const abiApprove = ['function setApprovalForAll(address operator, bool _approved) external'];
    const approvalContract = useContract({ addressOrName: expectedNftaddress, contractInterface: abiApprove, signerOrProvider: signer.data || provider });
    const Swapper = useContract({ addressOrName: "0x86338f4386cce1CD8474De7CdfB379C46f033D50", contractInterface: abi, signerOrProvider: signer.data || provider });

    const [show, setShow] = useState(false);
    const receiveRef = useRef();
    const [receiveTokenIds, setReceiveTokenIds] = useState([]);


    const handleReceiveAdd = (e) => {
        e.preventDefault();
        if (receiveRef.current.value === "") return;
        setReceiveTokenIds([...receiveTokenIds, parseInt(receiveRef.current.value, 16)]);
        receiveRef.current.value = "";
    }

    const handleSetShow = (e) => {
        e.preventDefault();
        setShow(!show);
    };



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

    const handleSwap = async (e) => {
        e.preventDefault();
        console.log("Swapping");
        console.log(receiveTokenIds);
        if(receiveTokenIds.length === 0) return toast.error("Please enter the token IDs of the NFTs you are swapping for");
        try {
            await approvalContract.setApprovalForAll("0x86338f4386cce1CD8474De7CdfB379C46f033D50", true);
            const Fufill = await Swapper.fullfillDeal(
                swapInt,
                expectedNftaddress,
                receiveTokenIds,
            );
            Fufill.wait();
        } catch (error) {
            toast.error(error.message);
        }
    }

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
                <button className='bttn lg:px-12 py-3 text-white mt-8 mx-auto' onClick={handleSetShow}>Fufill Deal</button>
            </div>)}



            {show && (
                <form className='w-full px-8 py-10 mt-6 rounded' onSubmit={handleSwap}>
                    <label htmlFor="">Enter the token IDs of the tokens you wish to swap:</label>
                    <div className="flex mt-3">
                        <input type="number" className='form-input' name='' ref={receiveRef} />
                        <button className='bttn text-white ml-4' onClick={handleReceiveAdd}>Add</button>
                    </div>

                    <div className='flex flex-row w-full gap-2 flex-wrap mt-2'>
                        {receiveTokenIds.map((val, index) => (
                            <div className='rounded bg-gray-400 p-1' key={index}>
                                <span className="text-xs">ID: {val}</span>
                            </div>
                        ))}
                    </div>

                    <button type="submit" className='bttn lg:px-12 py-3 text-white mt-8 mx-auto'>Swap</button>
                </form>
            )}
        </div>
    )
}

export default DealCard;



export const shortenAddress = (address) => {
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`
}
