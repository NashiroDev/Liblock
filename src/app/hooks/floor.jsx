"use client"

import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { useState } from "react";
import { ReadAny } from "./read";
import proposalAbi from "../../../contracts/gProposal.json";

export default function BalanceFloor() {
    const proposalContract = env(PROPOSALS_ADDRESS)
    const [alterBlock, setAlterBlock] = useState()

    const alterationBlock = ReadAny(proposalContract, proposalAbi.abi, 'nextAlterationBlock')
    alterationBlock.then((data) => setAlterBlock(data))

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
            <h5>Minimum block height for update : {String(alterBlock)}</h5>
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