"use client"

import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { ReadAnyArgs } from "./read";
import { useState } from "react";
import tokenAbi from "../../../contracts/Liblock.json";

export default function Stake() {
    const libContract = "0xd8bD9d1d5d3a3672348dF21Eb0541f7c920d4310"
    const stakeContract = "0x"

    const connectedUserAddress = useAccount()
    const [amount, setAmount] = useState("");
    const [duration, setDuration] = useState("");

    const allowance = ReadAnyArgs(libContract, tokenAbi.abi, 'allowance', [connectedUserAddress.address, stakeContract]);

    const { configApprove } = usePrepareContractWrite({
        address: libContract,
        abi: tokenAbi.abi,
        functionName: "approve",
        args: [stakeContract, amount],
    });

    const { configStake } = usePrepareContractWrite({
        address: stakeContract,
        abi: stakeContract.abi,
        functionName: duration,
        args: [stakeContract, amount],
    });

    const { data: approveData, isLoading: isApprovalLoading, isSuccess: isApprovalSuccess, isError: isApprovalError, write: writeApprove } = useContractWrite(configApprove);
    const { data: stakeData, isLoading: isStakeLoading, isSuccess: isStakeSuccess, isError: isStakeError, write: writeStake } = useContractWrite(configStake);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (allowance >= amount) {
            writeStake();
        } else {
            writeApprove();
        }
    };

    return (
        <section className="container mt-4">
            <h3>Stake $LIB</h3>
            <form onSubmit={handleSubmit} className="d-flex justify-content-center">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value * 10 ** 18)}
                        placeholder="Amount to stake"
                        required
                        className="form-control"
                    />
                    <fieldset>
                        <legend>Please select the stake duration :</legend>
                        <div>
                            <input
                                type="radio"
                                id="17"
                                value="lock17"
                                onChange={(e) => setDuration(e.target.value)}
                                className="form-control"
                            />
                            <label for="17">17 days</label>

                            <input
                                type="radio"
                                id="31"
                                value="lock31"
                                onChange={(e) => setDuration(e.target.value)}
                                className="form-control"
                            />
                            <label for="31">1 month</label>

                            <input
                                type="radio"
                                id="93"
                                value="lock93"
                                onChange={(e) => setDuration(e.target.value)}
                                className="form-control"
                            />
                            <label for="93">3 months</label>

                            <input
                                type="radio"
                                id="186"
                                value="lock186"
                                onChange={(e) => setDuration(e.target.value)}
                                className="form-control"
                            />
                            <label for="186">6 months</label>

                            <input
                                type="radio"
                                id="279"
                                value="lock279"
                                onChange={(e) => setDuration(e.target.value)}
                                className="form-control"
                            />
                            <label for="279">9 months</label>

                            <input
                                type="radio"
                                id="365"
                                value="lock365"
                                onChange={(e) => setDuration(e.target.value)}
                                className="form-control"
                            />
                            <label for="365">1 year</label>
                        </div>
                    </fieldset>
                    <button type="submit" disabled={!writeStake || !writeApprove} className="btn btn-primary">
                        {allowance >= amount ? "Stake" : "Approve"}
                    </button>
                </div>
            </form>
        </section>
    );
}