"use client"
import {
    useContractWrite,
    useWaitForTransaction,
  } from "wagmi";
  import { ethers } from "ethers";
  import { useState, useEffect } from "react";

  import tokenContract from "../../../contracts/contract.json";

  export default function Delegate() {

     //Delegate Function
    const {
      data: delegateData,
      write: deleg,
      isLoading: isDelegateLoading,
      isSuccess: isDelegateSuccess,
      error: DelegateError,
    } = useContractWrite({
      addressOrName: process.env.CONTRACT_ADDRESS,
      contractInterface: tokenContract.abi,
      functionName: "delegateFrom",
    });

    const delegateVote = async () => {
      await deleg({args: ["0xf2c06D8B5986eB79473CFfF70ABfc2E5986F4EB6", ethers.parseEther("1"), ethers.parseEther("2")]})
    }
  
    useEffect(() => {
      console.log("delegateData:", delegateData);
      console.log("isDelegateLoading:", isDelegateLoading);
      console.log("isDelegateSuccess", isDelegateSuccess);
      console.log("DelegateError:", DelegateError);
      console.log("___________");
    }, [delegateData, isDelegateLoading, isDelegateSuccess]);

    // Check TX for mint function
    const { isSuccess: txSuccess, error: txError } = useWaitForTransaction({
      confirmations: 1,
      hash: delegateData?.hash,
    });

    return (
      <div className="container flex flex-col  items-center mt-10">
        <h3 className="text-5xl font-bold mb-20">
          {"Delegate"}
        </h3>
  
        <div className="flex flex-col">
          <button
            onClick={delegateVote}
            className="bg-gray-900 text-white hover:bg-gray-800 rounded-full px-12 py-2 sm:w-auto"
            disabled={isDelegateLoading}
          >
            Delegate
          </button>
        </div>
        {txSuccess && <p>Success</p>}
        {txError && <p>Error</p>}
      </div>
    );
  }