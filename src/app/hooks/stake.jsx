"use client"

import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { ReadAnyArgs } from "./read";
import React, { useState, useEffect } from "react";
import tokenAbi from "../../../contracts/Liblock.json";
import stakeAbi from "../../../contracts/Liblocked.json";

export default function Stake() {
    const libContract = process.env.NEXT_PUBLIC_LIB_ADDRESS;
    const stakeContract = process.env.NEXT_PUBLIC_LIBLOCKED_ADDRESS;

    const connectedUserAddress = useAccount()
    const [amount, setAmount] = useState("0");
    const [duration, setDuration] = useState("lock17");
    const [allowance, setAllowance] = useState("0");
    const [notifications, setNotifications] = useState([]);

    const allowanceAmount = ReadAnyArgs(libContract, tokenAbi.abi, 'allowance', [connectedUserAddress.address, stakeContract]);
    allowanceAmount.then((data) => setAllowance(data));

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

    useEffect(() => {
        if (isApprovalLoading) {
            addNotification("Transaction waiting", "Please see your wallet.", "loading");
        }
        if (isApprovalSuccess) {
            addNotification("Approval transaction succeed, waiting for transaction validation", `Hash: ${approveData.hash}`, "success");
        }
        if (isApprovalError) {
            addNotification("Transaction aborted", "User denied transaction.", "error");
        }
    }, [isApprovalLoading, isApprovalSuccess, isApprovalError, approveData]);

    useEffect(() => {
        if (isStakeLoading) {
            addNotification("Transaction waiting", "Please see your wallet.", "loading");
        }
        if (isStakeSuccess) {
            addNotification("Stake transaction succeed, waiting for transaction validation", `Hash: ${stakeData.hash}`, "success");
        }
        if (isStakeError) {
            addNotification("Transaction aborted", "User denied transaction.", "error");
        }
    }, [isStakeLoading, isStakeSuccess, isStakeError, stakeData]);

    const addNotification = (title, message, type) => {
        const id = new Date().getTime();
        setNotifications((prev) => [...prev, { id, title, message, type }]);

        setTimeout(() => {
            setNotifications((prev) => prev.filter((notification) => notification.id !== id));
        }, 7000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (allowance >= amount * 10 ** 18) {
            if (writeStake) {
                writeStake();
            } else {
                addNotification("Stake function not initialized", "Please try again.", "error");
            }
        } else {
            if (writeApprove) {
                writeApprove();
            } else {
                addNotification("Approve function not initialized", "Please try again.", "error");
            }
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
                                    name="stakeDuration"
                                    checked={duration === "lock17"}
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
                                    name="stakeDuration"
                                    checked={duration === "lock31"}
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
                                    name="stakeDuration"
                                    checked={duration === "lock93"}
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
                                    name="stakeDuration"
                                    checked={duration === "lock186"}
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
                                    name="stakeDuration"
                                    checked={duration === "lock279"}
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
                                    name="stakeDuration"
                                    checked={duration === "lock365"}
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
                            {allowance >= amount * 10 ** 18 ? "Stake" : "Approve"}
                        </button>
                    </div>
                </div>
            </form>
            <div className="toast-container position-fixed bottom-0 end-0 m-4">
                {notifications.map((notif) => (
                    <div
                        key={notif.id}
                        className={`notif-pop-${notif.type} card p-2 mb-2`}
                        style={{ width: "400px" }}
                    >
                        <div className="toast-header">
                            <strong className="me-auto">{notif.title}</strong>
                        </div>
                        <div className="toast-body">
                            {notif.message}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}