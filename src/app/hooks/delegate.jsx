"use client"
import { useAccount } from 'wagmi';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { useState, useEffect } from "react";
import tokenContract from "../../../contracts/contract.json";

export default function Delegate() {
  const [address, setAddress] = useState("");
  const { address: connectedUserAddress } = useAccount();

  const { config } = usePrepareContractWrite({
    address: "0xf2c06D8B5986eB79473CFfF70ABfc2E5986F4EB6",
    abi: tokenContract.abi,
    functionName: "delegateFrom",
    args: [connectedUserAddress, address],
  });

  const { delegateData, isDelegateLoading, isDelegateSuccess, write } = useContractWrite(config);

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
      {isDelegateLoading && <div>Check wallet</div>}
      {isDelegateSuccess && <div>Transaction: {JSON.stringify(delegateData)}</div>}
    </section>
  );
}