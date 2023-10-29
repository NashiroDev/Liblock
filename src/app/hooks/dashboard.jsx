"use client"

import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import tokenAbi from "../../../contracts/Liblock.json";
import rTokenAbi from "../../../contracts/rLiblock.json";
import proposalAbi from "../../../contracts/gProposal.json";
import liblockedAbi from "../../../contracts/Liblocked.json";
import distributorAbi from "../../../contracts/Distributor.json";
import { ReadAnyArgs, ReadAny } from "./read";

export default function Dashboard() {
    const libContract = env(LIB_ADDRESS);
    const rLibContract = env(RLIB_ADDRESS);
    const proposalContract = env(PROPOSALS_ADDRESS);
    const distributorContract = env(DISTRIBUTOR_ADDRESS);
    const liblockedContract = env(LIBLOCKED_ADDRESS);

    const [showLedger, setShowLedger] = useState(false);
    const connectedUserAddress = useAccount()
    const address = connectedUserAddress.address
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
        govVP.then((data) => setVirtualPower(Number(data) / 10 ** 18))
    });
    
    const balancingEpoch = ReadAny(proposalContract, proposalAbi.abi, 'balancingCount')
    balancingEpoch.then((val) => {
        const balancingData = ReadAnyArgs(proposalContract, proposalAbi.abi, 'balancing', [val])
        balancingData.then((data) => setBalancing(data))
    });

    const currentEpoch = ReadAny(distributorContract, distributorAbi.abi, 'getEpochHeight');
    currentEpoch.then((data) => {
        setEpoch(data);
        const currentInherit = ReadAnyArgs(distributorContract, distributorAbi.abi, 'getAddressEpochInheritance', [address, epoch]);
        currentInherit.then((data) => setInherit(data));
        const currentShares = ReadAnyArgs(distributorContract, distributorAbi.abi, "getAddressEpochShares", [address, epoch]);
        currentShares.then((data) => setShares(Number(data[0]) / 10 ** 18))
    });

    const sNounce = ReadAnyArgs(liblockedContract, liblockedAbi.abi, 'getAddressNounce', [address])
    sNounce.then((data) => setStakeNounce(data));

    useEffect(() => {
        if (stakeNounce != "loading") {
            const positionList = [];
            for (let i = 0; i <= stakeNounce; i++) {
                const addressLedger = ReadAnyArgs(liblockedContract, liblockedAbi.abi, 'ledger', [address, i])
                addressLedger.then((data) => {
                    const temp0 = new Date(Number(data[3]) * 1000)
                    const temp1 = new Date(Number(data[4]) * 1000)
                    data[3] = temp0.toLocaleString()
                    data[4] = temp1.toLocaleString()
                    positionList.push(data)
                })
            }
            setLedger(positionList);
        }
    }, [stakeNounce])

    const libBalanceData = ReadAnyArgs(libContract, tokenAbi.abi, 'balanceOf', [address])
    const rLibBalanceData = ReadAnyArgs(rLibContract, rTokenAbi.abi, 'balanceOf', [address])
    const libVotesData = ReadAnyArgs(libContract, tokenAbi.abi, 'getVotes', [address])
    const rLibVotesData = ReadAnyArgs(rLibContract, rTokenAbi.abi, 'getVotes', [address])
    const claimableTokens = ReadAnyArgs(distributorContract, distributorAbi.abi, "getAddressClaimableTokens", [address])

    libBalanceData.then((data) => setLiblockBalanceOf(Number(data) / 10 ** 18));
    rLibBalanceData.then((data) => setrLiblockBalanceOf(Number(data) / 10 ** 18));
    libVotesData.then((data) => setLiblockGetVotes(Number(data) / 10 ** 18));
    rLibVotesData.then((data) => setrLiblockGetVotes(Number(data) / 10 ** 18));
    claimableTokens.then((data) => setClaimable(Number(data) / 10 ** 18));

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
                    <p>{String(balancing[5])} Current proposal floor</p>
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
            </div>
        </section >
    );
}