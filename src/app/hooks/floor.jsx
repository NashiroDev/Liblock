"use client"

import { useContractWrite, usePrepareContractWrite } from "wagmi";
import proposalAbi from "../../../contracts/gProposal.json";

export default function UpdateFloor() {
    const proposalContract = "0x9536a9453bC912F7C955c79C9a11758Fab4695ef"

    const { config } = usePrepareContractWrite({
        address: proposalContract,
        abi: proposalAbi.abi,
        functionName: "updateFloor",
    });

    const { data, isLoading, isSuccess, isError, write } = useContractWrite(config);

    const handleSubmit = (e) => {
        e.preventDefault();
        write();
    };

    return (
        <section className="container mt-4">
            <h3>Update Floor</h3>
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