"use client"

import { useContractWrite, usePrepareContractWrite } from "wagmi";
import governanceAbi from "../../../contracts/Governance.json";

export default function UpdateFloor() {
    const governanceContract = "0x"

    const { config } = usePrepareContractWrite({
        address: governanceContract,
        abi: governanceAbi.abi,
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