import React, { useEffect, useState } from "react";
import { useAccount, useProvider, useSigner, useContract } from 'wagmi'
import { abi } from "../../constants";
import DealCard from "../helpers/DealCard";

const Pool = () => {
  const [pool, setPool] = useState([]);
  const provider = useProvider();
  const signer = useSigner();
  const { isConnected } = useAccount();
  const Swapper = useContract({
    addressOrName: "0x86338f4386cce1CD8474De7CdfB379C46f033D50",
    contractInterface: abi,
    signerOrProvider: signer.data || provider
  });


  useEffect(() => {
    const getPool = async () => {
      if (isConnected) {
        const pool = await Swapper.getDeals();
        setPool(pool);
      }
    };
    getPool();
    return () => {
      setPool([]);
    };
  }, [isConnected, Swapper]);

  return (
    <div className="h-full md:m-6 lg:m-8 bg-white rounded-md p-4 shadow-lg overflow-y-scroll">
      <div className="text-xl md:text-3xl py-6 font-medium text-slate-700">Current Deals</div>
      {pool.map((deal, index) => (
        <div key={index}>
          <DealCard deal={deal} />
        </div>
      ))}
    </div>
  );
};

export default Pool;
