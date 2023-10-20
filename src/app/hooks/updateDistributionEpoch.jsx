"use client"

import { useContractWrite, usePrepareContractWrite } from "wagmi";
import distributorAbi from "../../../contracts/Distributor.json";

export default function UpdateDistributionEpoch() {
    const distributorContract = "0x"

    const { config } = usePrepareContractWrite({
        address: distributorContract,
        abi: distributorAbi.abi,
        functionName: "updateEpoch",
    });

    const { data, isLoading, isSuccess, isError, write } = useContractWrite(config);

    const handleSubmit = (e) => {
        e.preventDefault();
        write();
    };

    return (
        <section className="container mt-4">
            <h3>Update Epoch</h3>
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