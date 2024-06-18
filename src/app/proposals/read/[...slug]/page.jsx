"use client";

import { useEffect, useState } from "react";
import ReadArticle from "../../../hooks/read";
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import proposalAbi from "../../../../../contracts/gProposal.json";
import ProgressBar from "../../../../partials/ProgressBar";

const Page = ({ params }) => {
    const proposalContract = "0x9536a9453bC912F7C955c79C9a11758Fab4695ef";

    const [articleData, setArticleData] = useState(['', '', '', '', '', '', 0, 0, 0, 0, '']);
    const [vote, setVote] = useState("");

    const { config } = usePrepareContractWrite({
        address: proposalContract,
        abi: proposalAbi.abi,
        functionName: "vote",
        args: [Number(params.slug[1]), vote]
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = await ReadArticle(Number(params.slug[1]));
            setArticleData(data);
        };
    
        fetchData();
    }, [params.slug]);

    const { data, isLoading, isSuccess, isError, write } = useContractWrite(config);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (write) {
            write();
        }
    };

    const handleVoteChange = (e) => {
        setVote(e.target.value);
    };

    const totalVotes = Number(articleData[6]) + Number(articleData[7]) + Number(articleData[8]);

    return (
        <section className="container mb-4">
            <div className="d-flex justify-content-center mt-4 mb-4">
                <h1 className="justify-content-center text-align-center">{articleData[1].replace(/[^a-zA-Z0-9\-:é&'ç()!? ]/g, '')}</h1>
            </div>
            <div className="d-flex">
                <p className="fs-6">Author : {articleData[3]}</p>
            </div>
            <div className="d-flex border text-center m-2 p-4">
                <p className="fs-5 mt-2 text-wrap">{articleData[2]}</p>
            </div>
            <div className="d-flex row">
                <ProgressBar yesVotes={Number(articleData[6])} noVotes={Number(articleData[7])} abstainVotes={Number(articleData[8])} />
                <p>Yes (% of votes) : {(Number(articleData[6]) * 100) / totalVotes}</p>
                <p>No (% of votes) : {(Number(articleData[7]) * 100) / totalVotes}</p>
                <p>Abstain (% of votes) : {(Number(articleData[8]) * 100) / totalVotes}</p>
                <p>Unique voters : {Number(articleData[9])}</p>
                <p>Voting end : {articleData[10]}</p>
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
            {isLoading && (
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
            )}
            {isSuccess && (
                <div className="notif-pop-success position-fixed bottom-0 end-0 m-4 p-2 w-50">
                    <div className="card p-2">
                        <div className="toast-header">
                            <strong className="me-auto">Vote sent!</strong>
                        </div>
                        <div className="toast-body">
                            Hash : {data?.hash}
                        </div>
                    </div>
                </div>
            )}
            {isError && (
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
            )}
        </section>
    );
};

export default Page;