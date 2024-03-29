"use client"

import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { useState } from "react";
import { ReadAny } from "./read";
import proposalAbi from "../../../contracts/gProposal.json";

export default function BalanceFloor() {
    const proposalContract = process.env.NEXT_PUBLIC_PROPOSALS_ADDRESS;
    const [alterTime, setAlterTime] = useState()

    const alterationBlock = ReadAny(proposalContract, proposalAbi.abi, 'nextAlterationTimeLeft')
    alterationBlock.then((data) => setAlterTime(data))

    const { config } = usePrepareContractWrite({
        address: proposalContract,
        abi: proposalAbi.abi,
        functionName: "balanceFloor",
    });

    const { data, isLoading, isSuccess, isError, write } = useContractWrite(config);

    const handleSubmit = (e) => {
        e.preventDefault();
        write();
    };

    return (
        <section className="container mt-4">
            <h3>Update Floor</h3>
            <h5>Time left before next possible update : {String(alterTime)}</h5>
            <form onSubmit={handleSubmit} className="d-flex justify-content-center">
                <div className="input-group mb-3">
                    <button type="submit" disabled={!write} className="btn btn-primary">
                        Update
                    </button>
                </div>
            </form>
        </section>
    );
}