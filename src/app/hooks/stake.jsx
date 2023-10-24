"use client"

import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { ReadAnyArgs } from "./read";
import { useState } from "react";
import tokenAbi from "../../../contracts/Liblock.json";
import stakeAbi from "../../../contracts/Liblocked.json";

export default function Stake() {
    const libContract = "0x206661AA8FecBd56c00cCbE96a4AD7f3fe00691f"
    const stakeContract = "0x6bBD6ED8Ec215F1d40C31D305CED8B8fe9b4E040"

    const connectedUserAddress = useAccount()
    const [amount, setAmount] = useState("0");
    const [duration, setDuration] = useState("lock17");

    const allowance = ReadAnyArgs(libContract, tokenAbi.abi, 'allowance', [connectedUserAddress.address, stakeContract]);

    const { config: configApprove } = usePrepareContractWrite({
        address: libContract,
        abi: tokenAbi.abi,
        functionName: "approve",
        args: [stakeContract, amount * 10 ** 18],
    });

    const { config: configStake } = usePrepareContractWrite({
        address: stakeContract,
        abi: stakeAbi.abi,
        functionName: duration,
        args: [amount * 10 ** 18],
    });

    const { data: approveData, isLoading: isApprovalLoading, isSuccess: isApprovalSuccess, isError: isApprovalError, write: writeApprove } = useContractWrite(configApprove);
    const { data: stakeData, isLoading: isStakeLoading, isSuccess: isStakeSuccess, isError: isStakeError, write: writeStake } = useContractWrite(configStake);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(allowance, duration);
        if (allowance >= amount*10**18) {
            writeStake();
        } else {
            writeApprove();
        }
    };

    return (
        <section className="container mt-4">
            <h3>Stake $LIB</h3>
            <form onSubmit={handleSubmit} className="d-grid">
                <div className="row">
                    <div className="col-6">
                        <label htmlFor="amount">Select amount to stake</label>
                        <input
                            type="text"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Amount to stake"
                            required
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <legend>Please select the stake duration:</legend>
                        <div className="ms-2">
                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="17"
                                    value="lock17"
                                    onChange={(e) => setDuration(e.target.value)}
                                    className="form-check-input"
                                    checked
                                />
                                <label htmlFor="17" className="form-check-label">17 days</label>
                            </div>

                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="31"
                                    value="lock31"
                                    onChange={(e) => setDuration(e.target.value)}
                                    className="form-check-input"
                                />
                                <label htmlFor="31" className="form-check-label">1 month</label>
                            </div>

                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="93"
                                    value="lock93"
                                    onChange={(e) => setDuration(e.target.value)}
                                    className="form-check-input"
                                />
                                <label htmlFor="93" className="form-check-label">3 months</label>
                            </div>

                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="186"
                                    value="lock186"
                                    onChange={(e) => setDuration(e.target.value)}
                                    className="form-check-input"
                                />
                                <label htmlFor="186" className="form-check-label">6 months</label>
                            </div>

                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="279"
                                    value="lock279"
                                    onChange={(e) => setDuration(e.target.value)}
                                    className="form-check-input"
                                />
                                <label htmlFor="279" className="form-check-label">9 months</label>
                            </div>

                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="365"
                                    value="lock365"
                                    onChange={(e) => setDuration(e.target.value)}
                                    className="form-check-input"
                                />
                                <label htmlFor="365" className="form-check-label">1 year</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <button
                            type="submit"
                            disabled={isApprovalLoading || isStakeLoading}
                            className="btn btn-primary"
                        >
                            {allowance >= amount*10**18 ? "Stake" : "Approve"}
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
}