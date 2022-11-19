
function NFTItem({nft, show = true}) {
  return (
    <div>
    <div className="group relative w-full square aspect-square rounded-lg overflow-hidden hover:scale-105 transition-all duration-1000 ease-in-out shadow-me cursor-pointer">
      {nft.media && (<img src={nft.media[0].gateway} alt="" className="h-full w-full duration-300 object-center object-cover absolute" />)}
    </div>
      <div className="pb-4">
        {show && nft.rawMetadata.name && (<p className="text-left mt-4 ml-2 text-xs font-medium">{nft.rawMetadata.name}</p>)}
      </div>
    </div>
  )
}

export default NFTItem