"use client"

import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { useState, useEffect } from "react";
import { ReadAny } from "./read";
import proposalAbi from "../../../contracts/gProposal.json";

export default function BalanceFloor() {
    const proposalContract = process.env.NEXT_PUBLIC_PROPOSALS_ADDRESS;
    const [alterTime, setAlterTime] = useState()
    const [notifications, setNotifications] = useState([]);

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

    useEffect(() => {
        if (isLoading) {
            addNotification("Transaction waiting", "Please see your wallet.", "loading");
        }
        if (isSuccess) {
            addNotification("Transaction submission succeed, waiting for transaction validation", `Hash: ${data.hash}`, "success");
        }
        if (isError) {
            addNotification("Transaction aborted", "User denied transaction.", "error");
        }
    }, [isLoading, isSuccess, isError, data]);

    const addNotification = (title, message, type) => {
        const id = new Date().getTime();
        setNotifications((prev) => [...prev, { id, title, message, type }]);

        setTimeout(() => {
            setNotifications((prev) => prev.filter((notification) => notification.id !== id));
        }, 7000);
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