import React from 'react'
import { ArrowUpRightIcon, ArrowDownRightIcon } from '@heroicons/react/24/outline'

const Swap = () => {
  return (
    <div className='h-full md:m-6 lg:m-8 bg-white rounded-md p-4 shadow-lg overflow-y-scroll text-slate-800'>
      <div className='flex flex-col md:flex-row items-center gap-6 md:gap-12 px-4 md:px-16 py-8 md:py-16 md:w-[80%] mx-auto'>
        <div className='w-full md:w-[1/2]'>
          <GiveNFT />
        </div>
        <SwapIcon />
        <div className='w-full md:w-[1/2]'>
          <ReceiveNFT />
        </div>
      </div>
    </div>
  )
}

export default Swap


// enter the nft you want to swap box
const GiveNFT = () => {
  return (
    <div>
      <div className='flex flex-row w-fit items-center gap-2 pb-6 text-cyan-600'>
        <h1 className='text-xl md:text-3xl'>You give</h1>
        <ArrowUpRightIcon className='h-6 w-6 font-semibold' />
      </div>
      <div className='flex flex-col items-center justify-center w-full rounded-[8px] h-[400px] px-8  border-dashed border-cyan-600 border-2'>
        <div className="bg-cyan-600 rounded-full h-12 w-12 md:h-20 md:w-20 flex flex-col justify-center items-center mb-8 cursor-pointer">
        <span className='text-3xl md:text-5xl font-medium text-white'>+</span>
        </div>
        <p className='text-center'>Select the NFT you want to trade in or exchange</p>
      </div>
    </div>
  )
}

// enter the nft you want to receive box
const ReceiveNFT = () => {
  return (
    <div>
      <div className='flex flex-row w-fit items-center gap-2 pb-6 text-cyan-600'>
        <h1 className='text-xl md:text-3xl'>You receive</h1>
        <ArrowDownRightIcon className='h-6 w-6 font-semibold' />
      </div>
      <div className='flex flex-col items-center justify-center w-full rounded-[8px] h-[400px] px-8  border-dashed border-cyan-600 border-2'>
        <div className="bg-cyan-600 rounded-full h-12 w-12 md:h-20 md:w-20 flex flex-col justify-center items-center mb-8 cursor-pointer">
        <span className='text-3xl md:text-5xl font-medium text-white'>+</span>
        </div>
        <p className='text-center'>Add an NFT or token you want in exchange</p>
      </div>
    </div>
  )
}

const SwapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-24 h-24 text-cyan-600">
  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
</svg>
)