import React, { useState, useRef } from 'react'
import { useProvider, useSigner, useContract } from 'wagmi'
import { abi } from "../../constants";
import toast from 'react-hot-toast';
import { ethers } from 'ethers';



const Swap = () => {
  const [form, setForm] = useState({
    giveNFT: '',// nft you want to swap
    receiveNFT: '', // nft you want to receive
    amountNftExpected: 0,  // amount of nft you want to receive
    message: '', // message to send to the receiver
  })
  const sourceRef = useRef();
  const [sourceTokenIds, setSourceTokenIds] = useState([]);
  const provider = useProvider();
  const signer = useSigner();
  // eslint-disable-next-line
  const abiApprove = ['function setApprovalForAll(address operator, bool _approved) external'];
  // Set up a contract instance
  const approvalContract = useContract({ addressOrName: `${form.giveNFT}`, contractInterface: abiApprove, signerOrProvider: signer.data || provider });
  const Swapper = useContract({ addressOrName: "0x86338f4386cce1CD8474De7CdfB379C46f033D50", contractInterface: abi, signerOrProvider: signer.data || provider });

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSourceAdd = (e) => {
    e.preventDefault();
    if (sourceRef.current.value === "") return;
    setSourceTokenIds([...sourceTokenIds, parseInt(sourceRef.current.value, 16)]);
    sourceRef.current.value = "";
  }

  const handleSubmit = async (e) => { 
    e.preventDefault();
    if(sourceTokenIds.length === 0) return toast.error("Please enter the token IDs of the NFTs you are swapping for");
    if(form.amountNftExpected === 0) return toast.error("Please enter the amount of NFTs you are expecting to receive");
    if(form.giveNFT === "") return toast.error("Please enter the address of the NFT you want to swap");
    if(form.receiveNFT === "") return toast.error("Please enter the address of the NFT you wish to receive");
    try {
      await approvalContract.setApprovalForAll("0x86338f4386cce1CD8474De7CdfB379C46f033D50", true);
      const options = {value: ethers.utils.parseEther(`0.001`)};
      const createDeal = await Swapper.createDeal(
          form.giveNFT,
          sourceTokenIds,
          form.receiveNFT,
          parseInt(form.amountNftExpected, 16),
          form.message,
          options
      );
      createDeal.wait();
    } catch (error) {
      toast.error(error.message);
    }
  }



  return (
    <div className='h-full md:m-6 lg:m-8 bg-white rounded-md p-4 shadow-lg overflow-y-scroll text-slate-800'>
      {/* Swap Proposal Header */}
      <h1 className='my-6 text-center text-xl sm:text-2xl md:text-3xl font-semibold'>Make a Proposal</h1>
      <form onSubmit={handleSubmit} className='max-w-[60%] mx-auto'>
        <div className='flex flex-col gap-4 w-full'>
          {/* giveNFT */}
          <label htmlFor="receiveNFT">Your NFT address:</label>
          <input type="text" className='form-input' name='giveNFT' value={form.giveNFT} onChange={handleFormChange} />


          {/* Source Token IDs */}
          <label htmlFor="">Enter the token IDs of the tokens you wish to swap:</label>
          <div className="flex">
            <input type="number" className='form-input' name='' ref={sourceRef} />
            <button className='bttn text-white ml-4' onClick={handleSourceAdd}>Add</button>
          </div>

          <div className='flex flex-row w-full gap-2 flex-wrap -mt-3'>
            {sourceTokenIds.map((val, index) => (
              <div className='rounded bg-gray-400 p-1' key={index}>
                <span  className="text-xs">ID: {val}</span>
              </div>
            ))}
          </div>

          {/* receiveNFT */}
          <label htmlFor="receiveNFT">Address of NFT you want:</label>
          <input type="text" className='form-input' name='receiveNFT' value={form.receiveNFT} onChange={handleFormChange} />


          {/* Amount Expected */}
          <label htmlFor="amountNftExpected">How many NFTS do you want?</label>
          <input type="number" className='form-input' name='amountNftExpected' value={form.amountNftExpected} onChange={handleFormChange} />

          {/* Message */}
          <label htmlFor="amountNftExpected">Message(Optional):</label>
          <input type="text" className='form-input' name='message' value={form.message} onChange={handleFormChange} />
        </div>

        <button type="submit" className='bttn lg:px-12 py-3 text-white mt-8 mx-auto'>Submit</button>
      </form>
    </div>
  )
}

export default Swap

