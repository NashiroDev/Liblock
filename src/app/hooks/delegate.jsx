"use client"

import { useAccount, useContractReads } from 'wagmi';
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { useState } from "react";
import tokenContract from "../../../contracts/Liblock.json";

export default function Delegate() {
  const libContract = "0xf2c06D8B5986eB79473CFfF70ABfc2E5986F4EB6"

  const [address, setAddress] = useState("");
  const { address: connectedUserAddress } = useAccount();

  const { config } = usePrepareContractWrite({
    address: libContract,
    abi: tokenContract.abi,
    functionName: "delegateFrom",
    args: [connectedUserAddress, address],
  });

  const liblockBalanceOf = {
    address: libContract,
    abi: tokenContract.abi,
    functionName: 'balanceOf',
    args: [connectedUserAddress],
  }
  const liblockGetVotes = {
    address: libContract,
    abi: tokenContract.abi,
    functionName: 'getVotes',
    args: [connectedUserAddress],
  }
  const liblockDelegates = {
    address: libContract,
    abi: tokenContract.abi,
    functionName: 'delegates',
    args: [connectedUserAddress],
  }

  const { data, isLoading } = useContractReads({
    contracts: [
      liblockBalanceOf,
      liblockGetVotes,
      liblockDelegates,
    ],
  });

  const result_0 = !isLoading ? (BigInt(data[0].result) / (BigInt(10n) ** BigInt(18n))).toString() : "loading";
  const result_1 = !isLoading ? (BigInt(data[1].result) / (BigInt(10n) ** BigInt(18n))).toString() : "loading";
  const result_2 = !isLoading ? data[2].result : "loading";

  const { data: txnData, isLoading: isDelegationLoading, isSuccess, write } = useContractWrite(config);

  const handleSubmit = (e) => {
    e.preventDefault();
    write();
  };

  return (
    <section className="container mt-4">
      <h3>Delegate</h3>
      <form onSubmit={handleSubmit} className="d-flex justify-content-center">
        <div className="input-group mb-3">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
            required
            className="form-control"
          />
          <button type="submit" disabled={!write} className="btn btn-primary">
            Delegate
          </button>
        </div>
      </form>
      {isDelegationLoading && <div>Transaction require your approval, please see your wallet</div>}
      {isSuccess && <div>Transaction submited!<br/>Hash : {txnData.hash}</div>}
      <div className="ms-4 mt-4 mb-4">
        <h5>Connected address $LIB token balance : {result_0} LIB</h5>
        <h5>Connected address votes weight : {result_1} LIB</h5>
        <h5>Connected address current delegatee : {result_2}</h5>
      </div>
    </section>
  );
}