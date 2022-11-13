import React from "react";
import { useContractRead } from "wagmi";
import { abi, contractAddress } from "../../constants";

const OldDeals = () => {
  return (
    <div className="h-full md:m-6 lg:m-8 bg-white rounded-md p-4 shadow-lg">
      Fullfilled Deals
      <FullfilledDeals/>
    </div>
  );
};

export default OldDeals;

const FullfilledDeals = async () => {
  const { data, isloading, error } = useContractRead(
    {
      addressOrName: contractAddress["80001"],
      contractInterface: abi,
    },
    "getDeals"
  );
  if (error) return <div>Failed to Fetch</div>;
  if(!data) return(<div>No previouse deals</div>)
  const activeDeals = data.filter(filteredArray);
  return (<div>{[activeDeals]}</div>);
};

const filteredArray = (arrayItem) => {
  return arrayItem.STATE == 1;
};
