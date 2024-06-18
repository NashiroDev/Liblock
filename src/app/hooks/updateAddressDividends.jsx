"use client"

import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { ReadAnyArgs, ReadAny } from "./read";
import { useState, useEffect } from "react";
import distributorAbi from "../../../contracts/Distributor.json";

export default function UpdateAddressDividends() {
    const distributorContract = process.env.NEXT_PUBLIC_DISTRIBUTOR_ADDRESS;

    const [epoch, setEpoch] = useState(0);
    const [progress, setProgress] = useState(0);
    const [notifications, setNotifications] = useState([]);

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

    useEffect(() => {
        if (isLoading) {
            addNotification("Transaction waiting", "Please see your wallet.", "loading");
        }
        if (isSuccess) {
            addNotification("Article submission succeed, waiting for transaction validation", `Hash: ${data.hash}`, "success");
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
            <h3>Update Address Dividends</h3>
            <h5>Progress for epoch {String(epoch)} : {String(progress[1])} to do; {String(progress[0])} done</h5>
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