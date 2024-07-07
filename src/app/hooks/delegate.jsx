import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { useState, useEffect } from "react";
import tokenAbi from "../../../contracts/Liblock.json";
import rTokenAbi from "../../../contracts/rLiblock.json";
import proposalAbi from "../../../contracts/gProposal.json";
import { ReadAnyArgs, ReadAny } from "./read";

export default function Delegate() {
  const libContract = process.env.NEXT_PUBLIC_LIB_ADDRESS;
  const rLibContract = process.env.NEXT_PUBLIC_RLIB_ADDRESS;
  const proposalContract = process.env.NEXT_PUBLIC_PROPOSALS_ADDRESS;

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
  const [notifications, setNotifications] = useState([]);

  const { config } = usePrepareContractWrite({
    address: libContract,
    abi: tokenAbi.abi,
    functionName: "delegate",
    args: [address],
  });

  const counterData = ReadAny(proposalContract, proposalAbi.abi, 'balancingCount')
  counterData.then((val) => {
    const govVP = ReadAnyArgs(proposalContract, proposalAbi.abi, 'virtualPowerUsed', [connectedUserAddress.address, val])
    govVP.then((data) => setVirtualPower(Number(data) / 10**18))
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

  useEffect(() => {
    if (isDelegationLoading) {
      addNotification("Transaction waiting", "Please see your wallet.", "loading");
    }
    if (isSuccess) {
      addNotification("Delegation submission succeed, waiting for transaction validation", `Hash: ${txnData.hash}`, "success");
    }
    if (isError) {
      addNotification("Transaction aborted", "User denied transaction.", "error");
    }
  }, [isDelegationLoading, isSuccess, isError, txnData]);

  const addNotification = (title, message, type) => {
    const id = new Date().getTime();
    setNotifications((prev) => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    }, 7000);
  };

  return (
    <section className="container mt-4">
      <div className="ms-4 mt-4 mb-4">
        <h4>Connected address info :</h4>
        <h5>$LIB token balance : {String(liblockBalanceOf)} $LIB</h5>
        <h5>$rLIB token balance : {String(rLiblockBalanceOf)} $rLIB</h5>
        <h5>$LIB delegatee : {liblockDelegates == connectedUserAddress.address ? liblockDelegates + " (self)" : liblockDelegates}</h5>
        <h5>$rLIB delegatee : {rliblockDelegates == connectedUserAddress.address ? rliblockDelegates + " (self)" : rliblockDelegates}</h5>
        <h5>Votes weight (LIB, rLIB, Total): {String(liblockGetVotes)}, {String(rliblockGetVotes)}, {String(liblockGetVotes + rliblockGetVotes)}</h5>
        <h5>Virtual power used : {String(virtualPower)}</h5>
      </div>
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
      <div className="toast-container position-fixed bottom-0 end-0 m-4">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`notif-pop-${notif.type} card p-2 mb-2`}
            style={{ width: "400px" }}
          >
            <div className="toast-header">
              <strong className="me-auto">{notif.title}</strong>
            </div>
            <div className="toast-body">
              {notif.message}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}