import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { useState, useEffect } from "react";
import tokenAbi from "../../../contracts/Liblock.json";
import rTokenAbi from "../../../contracts/rLiblock.json";
import { ReadAnyArgs } from "./read";

export default function Delegate() {
  const libContract = "0x206661AA8FecBd56c00cCbE96a4AD7f3fe00691f"
  const rLibContract = "0x3F4E1D83ac17e482b49Bc13Cf55FDb0dB3826e56"

  const connectedUserAddress = useAccount()
  const [address, setAddress] = useState("");
  const [liblockBalanceOf, setLiblockBalanceOf] = useState(null);
  const [liblockGetVotes, setLiblockGetVotes] = useState(null);
  const [liblockDelegates, setLiblockDelegates] = useState(null);
  const [rLiblockBalanceOf, setrLiblockBalanceOf] = useState(null);
  const [rliblockGetVotes, setrLiblockGetVotes] = useState(null);
  const [rliblockDelegates, setrLiblockDelegates] = useState(null);

  const { config } = usePrepareContractWrite({
    address: libContract,
    abi: tokenAbi.abi,
    functionName: "delegate",
    args: [address],
  });

  const libBalanceData = ReadAnyArgs(libContract, tokenAbi.abi, 'balanceOf', [connectedUserAddress.address])
  const rLibBalanceData = ReadAnyArgs(rLibContract, rTokenAbi.abi, 'balanceOf', [connectedUserAddress.address])
  const libVotesData = ReadAnyArgs(libContract, tokenAbi.abi, 'getVotes', [connectedUserAddress.address])
  const rLibVotesData = ReadAnyArgs(rLibContract, rTokenAbi.abi, 'getVotes', [connectedUserAddress.address])
  const libDelegateData = ReadAnyArgs(libContract, tokenAbi.abi, 'delegates', [connectedUserAddress.address])
  const rLibDelegateData = ReadAnyArgs(rLibContract, rTokenAbi.abi, 'delegates', [connectedUserAddress.address])

  const { data: txnData, isLoading: isDelegationLoading, isSuccess, isError, write } = useContractWrite(config);

  useEffect(() => {
    if (libBalanceData) {
      setLiblockBalanceOf(BigInt(libBalanceData) / (BigInt(10n) ** BigInt(18n)));
    }
    if (rLibBalanceData) {
      setrLiblockBalanceOf(BigInt(rLibBalanceData) / (BigInt(10n) ** BigInt(18n)));
    }
    if (libVotesData) {
      setLiblockGetVotes(BigInt(libVotesData) / (BigInt(10n) ** BigInt(18n)));
    }
    if (rLibVotesData) {
      setrLiblockGetVotes(BigInt(rLibVotesData) / (BigInt(10n) ** BigInt(18n)));
    }
    if (libDelegateData) {
      setLiblockDelegates(libDelegateData);
    }
    if (rLibDelegateData) {
      setrLiblockDelegates(rLibDelegateData);
    }
  }, [rLibDelegateData, rLibVotesData, rLibBalanceData, libBalanceData, libVotesData, libDelegateData]);

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
        <h3>Connected address info :</h3>
        <h5>$LIB token balance : {String(liblockBalanceOf)} $LIB</h5>
        <h5>$rLIB token balance : {String(rLiblockBalanceOf)} $rLIB</h5>
        <h5>$LIB delegatee : {liblockDelegates == connectedUserAddress.address ? liblockDelegates + " (self)" : liblockDelegates}</h5>
        <h5>$rLIB delegatee : {rliblockDelegates == connectedUserAddress.address ? rliblockDelegates + " (self)" : rliblockDelegates}</h5>
        <h5>Votes weight (LIB, rLIB, Total): {String(liblockGetVotes)}, {String(rliblockGetVotes)}, {String(liblockGetVotes + rliblockGetVotes)}</h5>
      </div>
    </section>
  );
}