import React, { useEffect, useState } from 'react'
import { NFTMetadata } from '../../utils';

const OfferedNfts = ({id, address}) => {
const [metaData, setMetaData] = useState({});
useEffect(() => {
    const Onload = async () => {
       let meta =  NFTMetadata(address, id);
       console.log(meta);
       //setMetaData(meta);
    };
    Onload();
},[])

  return (
    <div>
      <div>#NFT {id}</div>
      <div>Address: {address}</div>
    </div>
  )
}

export default OfferedNfts
