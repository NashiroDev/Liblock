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
    const [executed1, setExecuted1] = useState(false);
    const [executed0, setExecuted0] = useState(false);
  
    useEffect(() => {
      if (!executed1) {
        const fetchData = async () => {
          try {
            const counterData = ReadAny(proposalContract, proposalAbi.abi, "balancingCount");
            const val = await counterData;
            const govVP = ReadAnyArgs(proposalContract, proposalAbi.abi, "virtualPowerUsed", [address, val]);
            const data = await govVP;
            setVirtualPower(Number(data) / 10 ** 18);
  
            const balancingData = ReadAnyArgs(proposalContract, proposalAbi.abi, "balancing", [val]);
            const data2 = await balancingData;
            setBalancing(data2);
  
            const currentEpoch = ReadAny(distributorContract, distributorAbi.abi, "getEpochHeight");
            const data3 = await currentEpoch;
            setEpoch(data3);
  
            // const currentInherit = ReadAnyArgs(distributorContract, distributorAbi.abi, "getAddressEpochInheritance", [address, epoch]);
            // const data4 = await currentInherit;
            setInherit("Temp new epoch wait");
  
            const currentShares = ReadAnyArgs(distributorContract, distributorAbi.abi, "getAddressEpochShares", [address, epoch]);
            const data5 = await currentShares;
            setShares(Number(data5[0]) / 10 ** 18);
  
            const sNounce = ReadAnyArgs(liblockedContract, liblockedAbi.abi, "getAddressNounce", [address]);
            const data6 = await sNounce;
            setStakeNounce(data6);
  
            const libBalanceData = ReadAnyArgs(libContract, tokenAbi.abi, "balanceOf", [address]);
            const rLibBalanceData = ReadAnyArgs(rLibContract, rTokenAbi.abi, "balanceOf", [address]);
            const libVotesData = ReadAnyArgs(libContract, tokenAbi.abi, "getVotes", [address]);
            const rLibVotesData = ReadAnyArgs(rLibContract, rTokenAbi.abi, "getVotes", [address]);
            const claimableTokens = ReadAnyArgs(distributorContract, distributorAbi.abi, "getAddressClaimableTokens", [address]);
  
            const data8 = await libBalanceData;
            setLiblockBalanceOf(Number(data8) / 10 ** 18);
  
            const data9 = await rLibBalanceData;
            setrLiblockBalanceOf(Number(data9) / 10 ** 18);
  
            const data10 = await libVotesData;
            setLiblockGetVotes(Number(data10) / 10 ** 18);
  
            const data11 = await rLibVotesData;
            setrLiblockGetVotes(Number(data11) / 10 ** 18);
  
            const data12 = await claimableTokens;
            setClaimable(Number(data12) / 10 ** 18);
          } catch (error) {
            console.error(error);
          }
        };
  
        fetchData();
        setExecuted1(true);
      }
    }, []);
  
    useEffect(() => {
      if (stakeNounce !== "loading" && !executed0) {
        const fetchLedger = async () => {
          try {
            const positionList = [];
            for (let i = 0; i <= stakeNounce; i++) {
              const addressLedger = ReadAnyArgs(liblockedContract, liblockedAbi.abi, "ledger", [address, i]);
              const data = await addressLedger;
              const temp0 = new Date(Number(data[3]) * 1000);
              const temp1 = new Date(Number(data[4]) * 1000);
              data[3] = temp0.toLocaleString();
              data[4] = temp1.toLocaleString();
              positionList.push(data);
            }
            setLedger(positionList);
            setExecuted0(true);
          } catch (error) {
            console.error(error);
          }
        };
  
        fetchLedger();
      }
    }, [stakeNounce]);
  
    const handleToggleLedger = () => {
      setShowLedger(!showLedger);
    };
  
    const handleToggleArticle = () => {
      setShowArticle(!showArticle);
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
                    <p>{String(Number(balancing[5]) / 10**18)} Current proposal floor</p>
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