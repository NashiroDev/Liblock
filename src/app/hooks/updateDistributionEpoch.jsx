"use client"

import { useContractWrite, usePrepareContractWrite } from "wagmi";
import distributorAbi from "../../../contracts/Distributor.json";
import { useState } from "react";
import { ReadAny } from "./read";

export default function UpdateDistributionEpoch() {
    const distributorContract = process.env.NEXT_PUBLIC_DISTRIBUTOR_ADDRESS;

    const [epochTime, setEpochTime] = useState(0);

    const currentEpoch = ReadAny(distributorContract, distributorAbi.abi, 'getEpochTimeLeft');
    currentEpoch.then((data) => setEpochTime(data));

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
            <h5>Time left before new epoch (in seconds) : {String(epochTime ? epochTime : 0)}</h5>
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