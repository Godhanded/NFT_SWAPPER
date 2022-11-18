import { useState, useEffect, useRef } from 'react'
import toast from "react-hot-toast";
import { useAccount } from 'wagmi';
import { getUserERC721NFTS } from '../utils';
import NFTItem from './helpers/NFTItem';



function Profile() {
  const effect = useRef(true);
  const [userNFTS, setUserNFTS] = useState([]);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (effect.current) {
      effect.current = false;
      const OnPageLoad = async () => {
        if (isConnected) {
          const nfts = await getUserERC721NFTS(address);
          if (nfts) {
            setUserNFTS(nfts);
          }
          else {
            toast.error("Something went wrong")
          }
        }
        else {
          toast.error("Please connect your wallet")
        }
      }
      OnPageLoad();
    }
  }, [isConnected, address]);

  const OnPageLoad = async () => {
    if (isConnected) {
      const nfts = await getUserERC721NFTS(address);
      if (nfts) {
        console.log(nfts);
        setUserNFTS(nfts);
      }
      else {
        toast.error("Something went wrong")
      }
    }
    else {
      toast.error("Please connect your wallet")
    }
  }

  if (!isConnected) return (
    <>
      <div className='min-h-screen trans flex items-center justify-center'>
        <h1 className='text-ld text-base md:text-3xl'>Please connect your wallet to continue</h1>
      </div>
    </>
  )
  else return (
    <div className='min-h-screen trans'>
      {/* User Profile Card */}
      <div className='bg-gray-100'>
        <div className='min-h-[50vh] lg:min-h-[50vh] w-[90vw] mx-auto relative flex flex-col items-center justify-center trans'>
          {/* Profile Picture Holder */}
          <div className='bg-white w-36 lg:w-48 square aspect-square rounded-full border-4 border-purple-400 overflow-hidden'>
          <img src={userNFTS[Math.floor(Math.random() * userNFTS.length)]?.media[0]?.gateway ?? `https://ipfs.io/ipfs/QmRqeD7aSzJvKoz34sAVuBmSgHcG8yUQQcmHZw2BtxUeWz`} alt="" className="h-full w-full object-center object-cover" />
          </div>
          {/* Address Holder */}
          <div className='flex items-center justify-center gap-2 mt-4 cursor-pointer tooltip tooltip-bottom'
            data-tip='Copy to clipboard'
            onClick={() => {
              copyAddress(address)
            }}>
            <p className='text-slate-400 font-semibold trans'>{address ? shortenAddress(address) : '0x0'}</p>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500 cursor-pointer tooltip tooltip-bottom" data-tip='Copy to clipboard' fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          {/* Edit Profile */}
          <p className='bttn-2 bg-slate-700 my-8 cursor-pointer py-2 text-white'>Edit Profile</p>

          {/*My NFTs, Listed Items,  Auctions, Raffles, Offers, Activity*/}
          <div className="flex text-slate-600 font-medium text-base lg:text-xl w-full absolute bottom-4 left-4 lg:left-">
            <ul className='text-xs sm:text-base flex flex-wrap gap-4 lg:gap-8 cursor-pointer'>
              <li onClick={OnPageLoad}>My NFTs
              </li>
              <li>Collectibles</li>
              <li>Listed Items</li>
              <li>Activity</li>
            </ul>
          </div>
        </div>
      </div>

      <ul className="pb-8 grid grid-cols-1 gap-y-4 lg:gap-y-4 gap-x-4 lg:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 w-[65%] sm:w-3/4 lg:w-5/6 mx-auto mt-8 md:mt-16">
        {userNFTS.length > 0 && userNFTS.map((nft, index) => {
          if (nft.media && nft.rawMetadata.image) return (
            <li key={index} className='rounded-xl relative text-ld'>
              <NFTItem nft={nft} />
            </li>
          )
          else return null;
        })
        }
        {userNFTS.length === 0 && <p className='text-slate-400 font-semibold'>You have no items</p>}
      </ul>
    </div>
  )
}

export default Profile



export const shortenAddress = (address) => {
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`
  }


export const copyAddress = (address) => {
  navigator.clipboard.writeText(address)
  toast.success('Copied address to clipboard.')
}
