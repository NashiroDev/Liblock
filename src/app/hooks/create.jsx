"use client"

import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { useState, useEffect } from "react";
import proposalAbi from "../../../contracts/gProposal.json";

export default function CreateProposal() {
    const proposalContract = process.env.NEXT_PUBLIC_PROPOSALS_ADDRESS;
    const { address: connectedUserAddress } = useAccount();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [notifications, setNotifications] = useState([]);

    const { config } = usePrepareContractWrite({
        address: proposalContract,
        abi: proposalAbi.abi,
        functionName: "createProposal",
        args: [title, content],
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
            <h3>Write article data</h3>
            <p>Will be published as {connectedUserAddress}</p>
            <p>You will be able to retrieve this proposal to attach tags to it for better visibility.</p>
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="This is your title"
                        required
                        className="form-control"
                    />
                </div>
                <div className="input-group mb-3">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="This is the content of your article, for now, only raw text is supported, but there'll be media integration in the future."
                        required
                        className="form-control"
                        rows="15" // Specify the number of rows to expand the textarea
                    ></textarea>
                </div>
                <button type="submit" disabled={!write} className="btn btn-primary m-4">
                    Submit article
                </button>
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
    )
}