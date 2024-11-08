"use client"

import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { useState, useEffect } from "react";
import OwnedArticles from "./addressArticles";
import tokenAbi from "../../../contracts/Liblock.json";
import rTokenAbi from "../../../contracts/rLiblock.json";
import proposalAbi from "../../../contracts/gProposal.json";
import liblockedAbi from "../../../contracts/Liblocked.json";
import distributorAbi from "../../../contracts/Distributor.json";
import { ReadAnyArgs, ReadAny } from "./read";

export default function Dashboard() {
  const libContract = process.env.NEXT_PUBLIC_LIB_ADDRESS;
  const rLibContract = process.env.NEXT_PUBLIC_RLIB_ADDRESS;
  const proposalContract = process.env.NEXT_PUBLIC_PROPOSALS_ADDRESS;
  const distributorContract = process.env.NEXT_PUBLIC_DISTRIBUTOR_ADDRESS;
  const liblockedContract = process.env.NEXT_PUBLIC_LIBLOCKED_ADDRESS;

  const [showLedger, setShowLedger] = useState(false);
  const connectedUserAddress = useAccount();
  const address = connectedUserAddress.address;
  const [notifications, setNotifications] = useState([]);
  const [epoch, setEpoch] = useState(1);
  const [inherit, setInherit] = useState(0);
  const [liblockBalanceOf, setLiblockBalanceOf] = useState("loading");
  const [liblockGetVotes, setLiblockGetVotes] = useState("loading");
  const [rLiblockBalanceOf, setrLiblockBalanceOf] = useState("loading");
  const [rliblockGetVotes, setrLiblockGetVotes] = useState("loading");
  const [virtualPower, setVirtualPower] = useState("loading");
  const [balancing, setBalancing] = useState("loading");
  const [stakeNounce, setStakeNounce] = useState("loading");
  const [claimable, setClaimable] = useState("loading");
  const [shares, setShares] = useState("loading");
  const [ledger, setLedger] = useState([]);
  const [posIndex, setPosIndex] = useState(0);

  useEffect(() => {
    ReadAny(proposalContract, proposalAbi.abi, 'balancingCount').then(val => {
      ReadAnyArgs(proposalContract, proposalAbi.abi, 'virtualPowerUsed', [address, val])
        .then(data => setVirtualPower(Number(data) / 10 ** 18));

      ReadAnyArgs(proposalContract, proposalAbi.abi, 'balancing', [val])
        .then(data => setBalancing(data));
    });
  }, [address, proposalContract]);

  useEffect(() => {
    ReadAny(distributorContract, distributorAbi.abi, 'getEpochHeight')
      .then(data => setEpoch(Number(data)));
  }, [distributorContract]);

  useEffect(() => {
    if (epoch > 1) {
      ReadAnyArgs(distributorContract, distributorAbi.abi, 'getAddressEpochInheritance', [address, epoch - 1])
        .then(data => setInherit(data));
    }
  }, [address, distributorContract, epoch]);

  useEffect(() => {
    ReadAnyArgs(distributorContract, distributorAbi.abi, 'getAddressEpochShares', [address, epoch])
      .then(data => setShares(Number(data[0]) / 10 ** 18));
  }, [address, distributorContract, epoch]);

  useEffect(() => {
    ReadAnyArgs(liblockedContract, liblockedAbi.abi, 'getAddressNounce', [address])
      .then(data => setStakeNounce(data));
  }, [address, liblockedContract]);

  useEffect(() => {
    ReadAnyArgs(libContract, tokenAbi.abi, 'balanceOf', [address])
      .then(data => setLiblockBalanceOf(Number(data) / 10 ** 18));

    ReadAnyArgs(rLibContract, rTokenAbi.abi, 'balanceOf', [address])
      .then(data => setrLiblockBalanceOf(Number(data) / 10 ** 18));

    ReadAnyArgs(libContract, tokenAbi.abi, 'getVotes', [address])
      .then(data => setLiblockGetVotes(Number(data) / 10 ** 18));

    ReadAnyArgs(rLibContract, rTokenAbi.abi, 'getVotes', [address])
      .then(data => setrLiblockGetVotes(Number(data) / 10 ** 18));

    ReadAnyArgs(distributorContract, distributorAbi.abi, 'getAddressClaimableTokens', [address])
      .then(data => setClaimable(Number(data) / 10 ** 18));
  }, [address, libContract, rLibContract, distributorContract]);

  const { config } = usePrepareContractWrite({
    address: liblockedContract,
    abi: liblockedAbi.abi,
    functionName: "withdrawTokens",
    args: [posIndex],
  });

  const { data, isLoading, isSuccess, isError, write } = useContractWrite(config);

  const addNotification = (title, message, type) => {
    const id = new Date().getTime();
    setNotifications((prev) => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    }, 7000);
  };

  useEffect(() => {
    if (isLoading) {
      addNotification("Transaction waiting", "Please see your wallet.", "loading");
    }
    if (isSuccess) {
      addNotification("Withdraw submission succeed, waiting for transaction validation", `Hash: ${data.hash}`, "success");
    }
    if (isError) {
      addNotification("Transaction aborted", "User denied transaction.", "error");
    }
  }, [isLoading, isSuccess, isError, data]);

  useEffect(() => {
    const fetchLedger = async () => {
      try {
        const positionList = [];
        for (let i = 0; i <= stakeNounce; i++) {
          const addressLedger = await ReadAnyArgs(liblockedContract, liblockedAbi.abi, "ledger", [address, i]);
          const temp0 = new Date(Number(addressLedger[3]) * 1000);
          const temp1 = new Date(Number(addressLedger[4]) * 1000);
          addressLedger[3] = temp0.toLocaleString();
          addressLedger[4] = temp1.toLocaleString();
          positionList.push(addressLedger);
        }
        setLedger(positionList);
      } catch (error) {
        console.error("Error fetching ledger:", error);
      }
    };

    if (stakeNounce !== "loading") {
      fetchLedger();
    }
  }, [stakeNounce, address, liblockedContract]);

  const handleToggleLedger = () => {
    setShowLedger(!showLedger);
  };

  const handleSubmit = (index) => {
    setPosIndex(index);
    if (write) {
      write();
    } else {
      addNotification("Withdraw function not initialized", "Please try again.", "error");
    }
  };

  return (
    <section className="container mt-4">
      <div className="align-items-center">
        <h1>Dashboard :</h1>
        <h5>Holdings :</h5>
        <div className="d-flex gap-4 border justify-content-center text-center align-middle">
          <p>{String(liblockBalanceOf)} $LIB held</p>
          <p>{String(rLiblockBalanceOf)} $rLIB held</p>
        </div>
        <h5>Ecosystem power :</h5>
        <div className="d-flex gap-4 border justify-content-center text-center align-middle">
          <p>{String(liblockGetVotes)} $LIB vote power</p>
          <p>{String(rliblockGetVotes)} $rLIB vote power</p>
        </div>
        <h5>Tracker :</h5>
        <div className="d-flex gap-4 border justify-content-center text-center align-middle">
          <p>{String(virtualPower)} Virtual power used</p>
          <p>{String(shares)} current epoch ({String(epoch)}) shares</p>
          <p>{String(claimable)} Current claimable $LIB</p>
          <p>{String(inherit)} Inheritance done / to do</p>
          <p>{String(Number(balancing[5]) / 10 ** 18)} Current proposal floor</p>
        </div>
        <button className="btn btn-primary mt-3" onClick={handleToggleLedger}>
          Show Ledger
        </button>
        {showLedger && (
          <div className="row mt-3 justify-content-center text-center">
            {ledger.map((result, index) => (
              <div key={index} className="col-3 ms-4 mt-4 card d-flex row-3">
                <div className="card-body">
                  <h5 className="card-title">Position id: {index}</h5>
                  <p className="card-text">$LIB locked = {String(Number(result[0]) / 10 ** 18)}</p>
                  <p className="card-text">$rLIB issued = {String(Number(result[1]) / 10 ** 18)}</p>
                  <p className="card-text">Lock timestamp = {String(result[3])}</p>
                  <p className="card-text">Unlock timestamp = {String(result[4])}</p>
                  <p className="card-text">Lock contract address = {result[5]}</p>
                  {new Date(result[4]) < new Date() && (
                    <button className="btn btn-success" onClick={() => { handleSubmit(index) }}>
                      Withdraw
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        <OwnedArticles authorAddress={address} />
      </div>
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
    </section >
  );
}