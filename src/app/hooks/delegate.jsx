"use client"

import { useAccount } from 'wagmi';
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { useState } from "react";
import { ReadAnyArgs } from "./read"
import tokenContract from "../../../contracts/Liblock.json";

export default function Delegate() {
  const libContract = "0xd8bD9d1d5d3a3672348dF21Eb0541f7c920d4310"

  const connectedUserAddress = useAccount()
  const [address, setAddress] = useState("");

  const { config } = usePrepareContractWrite({
    address: libContract,
    abi: tokenContract.abi,
    functionName: "delegate",
    args: [address],
  });

  const liblockBalanceOf = ReadAnyArgs(libContract, tokenContract.abi, 'balanceOf', connectedUserAddress.address)
  const liblockGetVotes = ReadAnyArgs(libContract, tokenContract.abi, 'getVotes', connectedUserAddress.address)
  const liblockDelegates = ReadAnyArgs(libContract, tokenContract.abi, 'delegates', connectedUserAddress.address)

  const result_0 = liblockBalanceOf ? (BigInt(liblockBalanceOf) / (BigInt(10n) ** BigInt(18n))).toString() : "0";
  const result_1 = liblockGetVotes ? (BigInt(liblockGetVotes) / (BigInt(10n) ** BigInt(18n))).toString() : "0";
  const result_2 = liblockDelegates ? liblockDelegates : "loading";

  const { data: txnData, isLoading: isDelegationLoading, isSuccess, isError, write } = useContractWrite(config);

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
            placeholder="Type delegatee address"
            required
            className="form-control"
          />
          <button type="submit" disabled={!write} className="btn btn-primary">
            Delegate
          </button>
        </div>
      </form>
      <div className="toast-container">
        {isDelegationLoading &&
          <div className="notif-pop-loading position-fixed bottom-0 end-0 m-4 p-2 w-25">
            <div className="card p-2">
              <div className="toast-header">
                <strong className="me-auto">Transaction waiting</strong>
              </div>
              <div className="toast-body">
                Please see your wallet.
              </div>
            </div>
          </div>
        }
        {isSuccess &&
          <div className="notif-pop-success position-fixed bottom-0 end-0 m-4 p-2 w-50">
            <div className="card p-2">
              <div className="toast-header">
                <strong className="me-auto">Transaction sent !</strong>
              </div>
              <div className="toast-body">
                Hash : {txnData.hash}
              </div>
            </div>
          </div>
        }
        {isError &&
          <div className="notif-pop-error position-fixed bottom-0 end-0 m-4 p-2 w-25">
            <div className="card p-2">
              <div className="toast-header">
                <strong className="me-auto">Transaction aborted</strong>
              </div>
              <div className="toast-body">
                User denied transaction
              </div>
            </div>
          </div>
        }
      </div>
        <div className="ms-4 mt-4 mb-4">
          <h5>Connected address $LIB token balance : {result_0} LIB</h5>
          <h5>Connected address votes weight : {result_1} LIB</h5>
          <h5>Connected address current delegatee : {result_2}</h5>
        </div>
    </section>
  );
}