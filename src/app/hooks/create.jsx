"use client"

import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { useState } from "react";
import proposalAbi from "../../../contracts/gProposal.json";

export default function CreateProposal() {
    const proposalContract = process.env.NEXT_PUBLIC_PROPOSALS_ADDRESS;
    const { address: connectedUserAddress } = useAccount();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

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

    return (
        <section className="container mt-4">
            <h3>Write article data</h3>
            <p>Will be pulished as {connectedUserAddress}</p>
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
            <div className="toast-container">
                {isLoading &&
                    <div className="notif-pop-loading position-fixed bottom-0 end-0 m-4 p-2 w-25">
                        <div className="card p-2">
                            <div className="toast-header">
                                <strong className="me-auto">Transaction waiting</strong>
                            </div>
                            <div className="toast-body">
                                Please see your wallet.
                            </div>
                        </div>
                    </div>
                }
                {isSuccess &&
                    <div className="notif-pop-success position-fixed bottom-0 end-0 m-4 p-2 w-50">
                        <div className="card p-2">
                            <div className="toast-header">
                                <strong className="me-auto">Article submission succeed, waiting for transaction validation</strong>
                            </div>
                            <div className="toast-body">
                                Hash : {data.hash}
                            </div>
                        </div>
                    </div>
                }
                {isError &&
                    <div className="notif-pop-error position-fixed bottom-0 end-0 m-4 p-2 w-25">
                        <div className="card p-2">
                            <div className="toast-header">
                                <strong className="me-auto">Transaction aborted</strong>
                            </div>
                            <div className="toast-body">
                                User denied transaction
                            </div>
                        </div>
                    </div>
                }
            </div>
        </section>
    )

}