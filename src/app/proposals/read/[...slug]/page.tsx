"use client"

import { FC, useState } from "react"
import ReadArticle from "../../../hooks/read"
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import proposalAbi from "../../../../../contracts/gProposal.json";

interface pageProps {
    params: { slug: string }
}

const page: FC<pageProps> = ({ params }) => {
    const proposalContract = "0x9536a9453bC912F7C955c79C9a11758Fab4695ef"

    const [vote, setVote] = useState("");

    const { config } = usePrepareContractWrite({
        address: proposalContract,
        abi: proposalAbi.abi,
        functionName: "vote",
        args: [params.slug[1], vote]
    });

    let articleData = ReadArticle(params.slug[1])
    articleData = articleData ? articleData : ["loading", "loading", "loading", "loading"]

    const { data, isLoading, isSuccess, isError, write } = useContractWrite(config);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (write) {
            write();
        };
    };

    const handleVoteChange = (e: any) => {
        setVote(e.target.value);
    };

    return (
        <section className="container mb-4">
            <div className="d-flex justify-content-center mt-4 mb-4">
                <h1 className="justify-content-center text-align-center">{articleData[1]}</h1>
            </div>
            <div className="d-flex">
                <p className="fs-6">Author : {articleData[3]}</p>
            </div>
            <div className="d-flex border text-center m-2 p-4">
                <p className="fs-5 mt-2 text-wrap">{articleData[2]}</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="voteOption"
                        value="yes"
                        checked={vote === "yes"}
                        onChange={handleVoteChange}
                    />
                    <label className="form-check-label">Yes</label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="voteOption"
                        value="no"
                        checked={vote === "no"}
                        onChange={handleVoteChange}
                    />
                    <label className="form-check-label">No</label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="voteOption"
                        value="abstain"
                        checked={vote === "abstain"}
                        onChange={handleVoteChange}
                    />
                    <label className="form-check-label">Abstain</label>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Vote</button>
            </form>
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
                            <strong className="me-auto">Vote sent !</strong>
                        </div>
                        <div className="toast-body">
                            Hash : {data?.hash}
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
        </section>
    )
}

export default page