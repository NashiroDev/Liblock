"use client"

import { useContractWrite, usePrepareContractWrite, useAccount  } from "wagmi";
import distributorAbi from "../../../contracts/Distributor.json";
import { useState, useEffect } from "react";
import { ReadAnyArgs, ReadAny } from "./read";

export default function UpdateEpochInheritance() {
    const distributorContract = process.env.NEXT_PUBLIC_DISTRIBUTOR_ADDRESS;

    const { address: connectedAddress } = useAccount();
    const [address, setAddress] = useState(connectedAddress || '0x0000000000000000000000000000000000000000');
    const [epoch, setEpoch] = useState();
    const [progress, setProgress] = useState('No data');
    const [notifications, setNotifications] = useState([]);

    const currentEpoch = ReadAny(distributorContract, distributorAbi.abi, 'getEpochHeight');
    currentEpoch.then((data) => setEpoch(Number(data)-1));

    useEffect(() => {
        const currentProgress = ReadAnyArgs(distributorContract, distributorAbi.abi, "getAddressEpochInheritance", [address, epoch]);
        currentProgress.then((data) => setProgress(data));
    }, [address, epoch])

    const { config } = usePrepareContractWrite({
        address: distributorContract,
        abi: distributorAbi.abi,
        functionName: "currentEpochInheritance",
        args: [address]
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
            <h3>Initiate address inheritance</h3>
            <h5>Progress of {address} for epoch {epoch} (Done, To do) : {String(progress ? progress : 'invalid')}</h5>
            <form onSubmit={handleSubmit} className="d-flex justify-content-center">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Type address to inherit from last epoch"
                        required
                        className="form-control"
                    />
                    <button type="submit" disabled={!write} className="btn btn-primary">
                        Inherit
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