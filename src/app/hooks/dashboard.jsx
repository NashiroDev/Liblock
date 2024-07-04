"use client"

import { useAccount } from "wagmi";
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

  const counterData = ReadAny(proposalContract, proposalAbi.abi, 'balancingCount')
  counterData.then((val) => {
    const govVP = ReadAnyArgs(proposalContract, proposalAbi.abi, 'virtualPowerUsed', [address, val])
    govVP.then((data) => setVirtualPower(BigInt(data) / (BigInt(10n) ** BigInt(18n))))

    const balancingData = ReadAnyArgs(proposalContract, proposalAbi.abi, 'balancing', [val])
    balancingData.then((data) => setBalancing(data))
  });

  const currentEpoch = ReadAny(distributorContract, distributorAbi.abi, 'getEpochHeight')
  currentEpoch.then((data) => setEpoch(data))

  const currentInherit = ReadAnyArgs(distributorContract, distributorAbi.abi, 'getAddressEpochInheritance', [address, epoch])
  currentInherit.then((data) => setInherit(data))

  const currentShares = ReadAnyArgs(distributorContract, distributorAbi.abi, 'getAddressEpochShares', [address, epoch])
  currentShares.then((data) => setShares(BigInt(data[0]) / (BigInt(10n) ** BigInt(18n))))

  const sNounce = ReadAnyArgs(liblockedContract, liblockedAbi.abi, 'getAddressNounce', [address])
  sNounce.then((data) => setStakeNounce(data))

  const libBalanceData = ReadAnyArgs(libContract, tokenAbi.abi, 'balanceOf', [address])
  const rLibBalanceData = ReadAnyArgs(rLibContract, rTokenAbi.abi, 'balanceOf', [address])
  const libVotesData = ReadAnyArgs(libContract, tokenAbi.abi, 'getVotes', [address])
  const rLibVotesData = ReadAnyArgs(rLibContract, rTokenAbi.abi, 'getVotes', [address])
  const claimableTokens = ReadAnyArgs(distributorContract, distributorAbi.abi, 'getAddressClaimableTokens', [address])

  libBalanceData.then((data) => setLiblockBalanceOf(BigInt(data) / (BigInt(10n) ** BigInt(18n))))
  rLibBalanceData.then((data) => setrLiblockBalanceOf(BigInt(data) / (BigInt(10n) ** BigInt(18n))))
  libVotesData.then((data) => setLiblockGetVotes(BigInt(data) / (BigInt(10n) ** BigInt(18n))))
  rLibVotesData.then((data) => setrLiblockGetVotes(BigInt(data) / (BigInt(10n) ** BigInt(18n))))
  claimableTokens.then((data) => setClaimable(BigInt(data) / (BigInt(10n) ** BigInt(18n))))

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
                </div>
              </div>
            ))}
          </div>
        )}
        <OwnedArticles authorAddress={address} />
      </div>
    </section >
  );
}