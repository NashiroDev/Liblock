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
    const libContract = "0x206661AA8FecBd56c00cCbE96a4AD7f3fe00691f"
    const rLibContract = "0x3F4E1D83ac17e482b49Bc13Cf55FDb0dB3826e56"
    const proposalContract = "0x9536a9453bC912F7C955c79C9a11758Fab4695ef"
    const distributorContract = "0xf2c06D8B5986eB79473CFfF70ABfc2E5986F4EB6"
    const liblockedContract = "0x6bBD6ED8Ec215F1d40C31D305CED8B8fe9b4E040"

    const connectedUserAddress = useAccount()
    const address = connectedUserAddress.address
    const [epoch, setEpoch] = useState(0);
    const [inherit, setInherit] = useState(0);
    const [liblockBalanceOf, setLiblockBalanceOf] = useState("loading");
    const [liblockGetVotes, setLiblockGetVotes] = useState("loading");
    const [rLiblockBalanceOf, setrLiblockBalanceOf] = useState("loading");
    const [rliblockGetVotes, setrLiblockGetVotes] = useState("loading");
    const [virtualPower, setVirtualPower] = useState("loading");
    const [stakeNounce, setStakeNounce] = useState("loading");
    const [claimable, setClaimable] = useState("loading");
    const [ledger, setLedger] = useState([]);

    const counterData = ReadAny(proposalContract, proposalAbi.abi, 'balancingCount')
    counterData.then((val) => {
        const govVP = ReadAnyArgs(proposalContract, proposalAbi.abi, 'virtualPowerUsed', [address, val])
        govVP.then((data) => setVirtualPower(Number(data) / 10**18))
    });

    const currentEpoch = ReadAny(distributorContract, distributorAbi.abi, 'getEpochHeight');
    currentEpoch.then((data) => {
        setEpoch(data);
        const currentInherit = ReadAnyArgs(distributorContract, distributorAbi.abi, 'getAddressEpochInheritance', [address, epoch]);
        currentInherit.then((data) => setInherit(data));
    });

    const sNounce = ReadAnyArgs(liblockedContract, liblockedAbi.abi, 'getAddressNounce', [address])
    sNounce.then((data) => setStakeNounce(data));

    useEffect(() => {
        if (stakeNounce != "loading") {
            const positionList = [];
            for (let i = 0; i <= stakeNounce; i++) {
                const addressLedger = ReadAnyArgs(liblockedContract, liblockedAbi.abi, 'ledger', [address, i])
                addressLedger.then((data) => {
                    const temp0 = new Date (Number(data[3]) * 1000)
                    const temp1 = new Date (Number(data[4]) * 1000)
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

    libBalanceData.then((data) => setLiblockBalanceOf(Number(data) / 10**18));
    rLibBalanceData.then((data) => setrLiblockBalanceOf(Number(data) / 10**18));
    libVotesData.then((data) => setLiblockGetVotes(Number(data) / 10**18));
    rLibVotesData.then((data) => setrLiblockGetVotes(Number(data) / 10**18));
    claimableTokens.then((data) => setClaimable(Number(data) / 10**18));

    return (
        <section className="container mt-4">
            <div>
                <p>Dashboard : </p>
                <p>{String(liblockBalanceOf)} $LIB held</p>
                <p>{String(liblockGetVotes)} $LIB vote power</p>
                <p>{String(rLiblockBalanceOf)} $rLIB held</p>
                <p>{String(rliblockGetVotes)} $rLIB vote power</p>
                <p>{String(virtualPower)} Virtual power used</p>
                <p>{String(claimable)} Current claimable $LIB</p>
                <p>{String(inherit)} Inheritance done / to do</p>
                {ledger.map((result, index) => (
                    <div key={index} className="col-3 ms-4 card d-flex">
                        <div className="card-body">
                            <h5 className="card-title">Position id : {index}</h5>
                            <p className="card-text">$LIB locked = {String(Number(result[0]) / 10**18)}</p>
                            <p className="card-text">$rLIB issued = {String(Number(result[1]) / 10**18)}</p>
                            <p className="card-text">Lock timestamp = {String(result[3])}</p>
                            <p className="card-text">Unlock timestamp = {String(result[4])}</p>
                            <p className="card-text">Lock contract address = {result[5]}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}