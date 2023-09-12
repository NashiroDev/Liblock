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

  useEffect(() => {
    console.log("delegateData:", delegateData);
    console.log("isDelegateLoading:", isDelegateLoading);
    console.log("isDelegateSuccess", isDelegateSuccess);
    console.log("___________");
  }, [delegateData, isDelegateLoading, isDelegateSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    write();
  };

  return (
    <section>
      <h3 className="container mt-4">Delegate</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter address"
          required
        />
        <button type="submit" disabled={!write} className="button primary-button">
          Delegate
        </button>
      </form>
      {isDelegateLoading && <div>Check wallet</div>}
      {isDelegateSuccess && <div>Transaction: {JSON.stringify(delegateData)}</div>}
    </section>
  );
}