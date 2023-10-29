"use client"

import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { ReadAnyArgs, ReadAny } from "./read";
import { useState } from "react";
import distributorAbi from "../../../contracts/Distributor.json";

export default function UpdateAddressDividends() {
    const distributorContract = process.env.NEXT_PUBLIC_DISTRIBUTOR_ADDRESS;

    const [epoch, setEpoch] = useState(0);
    const [progress, setProgress] = useState(0);

    const currentEpoch = ReadAny(distributorContract, distributorAbi.abi, 'getEpochHeight');
    currentEpoch.then((data) => {
        setEpoch(data);
        const currentProgress = ReadAnyArgs(distributorContract, distributorAbi.abi, 'getEpochProccessAdvancement', [epoch]);
        currentProgress.then((data) => setProgress(data));
    });


    const { config } = usePrepareContractWrite({
        address: distributorContract,
        abi: distributorAbi.abi,
        functionName: "updateAddressDividends",
    });

    const { data, isLoading, isSuccess, isError, write } = useContractWrite(config);

    const handleSubmit = (e) => {
        e.preventDefault();
        write();
    };

    return (
        <section className="container mt-4">
            <h3>Update Address Dividends</h3>
            <h5>Progress for epoch {String(epoch)} : {String(progress[1])} to do; {String(progress[0])} done</h5>
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