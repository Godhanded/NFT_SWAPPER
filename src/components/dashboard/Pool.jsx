import React from "react";
import { useContractRead } from "wagmi";
import { abi, contractAddress } from "../../constants";

// const provider = new ethers.providers.JsonRpcProvider(
//   process.env.QUICKNODE_RPC
// );
// quicknode for all providers

const Pool = () => {
  return (
    <div className="h-full md:m-6 lg:m-8 bg-white rounded-md p-4 shadow-lg">
      <NftPool />
    </div>
  );
};

export default Pool;

const NftPool = async () => {
  const { data, isloading, error } = useContractRead(
    {
      addressOrName: contractAddress["80001"],
      contractInterface: abi,
    },
    "getDeals"
  );
  if(error) return(<div>Failed to Fetch</div>);
  const activeDeals= data.filter(filteredArray);
  return <div>{[activeDeals]}</div>;
};

const filteredArray = (arrayItem) => {
  return arrayItem.STATE == 0;
};
