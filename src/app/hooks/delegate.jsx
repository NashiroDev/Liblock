import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { useState } from "react";
import tokenAbi from "../../../contracts/Liblock.json";
import rTokenAbi from "../../../contracts/rLiblock.json";
import proposalAbi from "../../../contracts/gProposal.json";
import { ReadAnyArgs, ReadAny } from "./read";

export default function Delegate() {
  const libContract = env(LIB_ADDRESS);
  const rLibContract = env(RLIB_ADDRESS);
  const proposalContract = env(PROPOSALS_ADDRESS);

  const connectedUserAddress = useAccount()
  const [address, setAddress] = useState("");
  // const [counter, setCounter] = useState(0);
  const [liblockBalanceOf, setLiblockBalanceOf] = useState("loading");
  const [liblockGetVotes, setLiblockGetVotes] = useState("loading");
  const [liblockDelegates, setLiblockDelegates] = useState("loading");
  const [rLiblockBalanceOf, setrLiblockBalanceOf] = useState("loading");
  const [rliblockGetVotes, setrLiblockGetVotes] = useState("loading");
  const [rliblockDelegates, setrLiblockDelegates] = useState("loading");
  const [virtualPower, setVirtualPower] = useState("loading");

  const { config } = usePrepareContractWrite({
    address: libContract,
    abi: tokenAbi.abi,
    functionName: "delegate",
    args: [address],
  });

  const counterData = ReadAny(proposalContract, proposalAbi.abi, 'balancingCount')
  counterData.then((val) => {
    const govVP = ReadAnyArgs(proposalContract, proposalAbi.abi, 'virtualPowerUsed', [connectedUserAddress.address, val])
    govVP.then((data) => setVirtualPower(BigInt(data) / (BigInt(10n) ** BigInt(18n))))
  });

  const libBalanceData = ReadAnyArgs(libContract, tokenAbi.abi, 'balanceOf', [connectedUserAddress.address])
  const rLibBalanceData = ReadAnyArgs(rLibContract, rTokenAbi.abi, 'balanceOf', [connectedUserAddress.address])
  const libVotesData = ReadAnyArgs(libContract, tokenAbi.abi, 'getVotes', [connectedUserAddress.address])
  const rLibVotesData = ReadAnyArgs(rLibContract, rTokenAbi.abi, 'getVotes', [connectedUserAddress.address])
  const libDelegateData = ReadAnyArgs(libContract, tokenAbi.abi, 'delegates', [connectedUserAddress.address])
  const rLibDelegateData = ReadAnyArgs(rLibContract, rTokenAbi.abi, 'delegates', [connectedUserAddress.address])

  libBalanceData.then((data) => setLiblockBalanceOf(BigInt(data) / (BigInt(10n) ** BigInt(18n))));
  rLibBalanceData.then((data) => setrLiblockBalanceOf(BigInt(data) / (BigInt(10n) ** BigInt(18n))));
  libVotesData.then((data) => setLiblockGetVotes(BigInt(data) / (BigInt(10n) ** BigInt(18n))));
  rLibVotesData.then((data) => setrLiblockGetVotes(BigInt(data) / (BigInt(10n) ** BigInt(18n))));
  libDelegateData.then((data) => setLiblockDelegates(data));
  rLibDelegateData.then((data) => setrLiblockDelegates(data));

  const { data: txnData, isLoading: isDelegationLoading, isSuccess, isError, write } = useContractWrite(config);

  const handleSubmit = (e) => {
    e.preventDefault();
    write();
  };

  return (
    <section className="container mt-4">
      <h3>Delegate</h3>
      <div className="ms-4 mt-4 mb-4">
        <h4>Connected address info :</h4>
        <h5>$LIB token balance : {String(liblockBalanceOf)} $LIB</h5>
        <h5>$rLIB token balance : {String(rLiblockBalanceOf)} $rLIB</h5>
        <h5>$LIB delegatee : {liblockDelegates == connectedUserAddress.address ? liblockDelegates + " (self)" : liblockDelegates}</h5>
        <h5>$rLIB delegatee : {rliblockDelegates == connectedUserAddress.address ? rliblockDelegates + " (self)" : rliblockDelegates}</h5>
        <h5>Votes weight (LIB, rLIB, Total): {String(liblockGetVotes)}, {String(rliblockGetVotes)}, {String(liblockGetVotes + rliblockGetVotes)}</h5>
        <h5>Virtual power used : {String(virtualPower)}</h5>
      </div>
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
    </section>
  );
}