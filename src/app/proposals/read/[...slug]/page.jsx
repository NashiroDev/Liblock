"use client";

import { useEffect, useState } from "react";
import ReadArticle from "../../../hooks/read";
import calculateTimeDifference from "../../../hooks/heightToTime";
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import proposalAbi from "../../../../../contracts/gProposal.json";
import ProgressBar from "../../../../partials/ProgressBar";

const Page = ({ params }) => {
    const proposalContract = "0x9536a9453bC912F7C955c79C9a11758Fab4695ef";

    const [articleData, setArticleData] = useState(['', '', '', '', '', '', 0, 0, 0, 0, '']);
    const [vote, setVote] = useState(-1);
    const [notifications, setNotifications] = useState([]);
    const [timeRemaining, setTimeRemaining] = useState('');
    const [tags, setTags] = useState();

    const { config: configVote } = usePrepareContractWrite({
        address: proposalContract,
        abi: proposalAbi.abi,
        functionName: "vote",
        args: [Number(params.slug[1]), vote]
    });

    const { config: configExec } = usePrepareContractWrite({
        address: proposalContract,
        abi: proposalAbi.abi,
        functionName: "executeProposal",
        args: [Number(params.slug[1])]
    });

    const { data: dataVote, isLoading: LoadingVote, isSuccess: successVote, isError: errorVote, write: writeVote } = useContractWrite(configVote);
    const { data: dataExec, isLoading: LoadingExec, isSuccess: successExec, isError: errorExec, write: writeExec } = useContractWrite(configExec);

    useEffect(() => {
        const fetchTags = async () => {
            const response = await fetch("/api/articles/read", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: params.slug[1] }),
            });
            const data = await response.json();
            console.log(data.data[0].linkedTags);
            setTags(data.data[0].linkedTags);
        };
        fetchTags();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const data = await ReadArticle(Number(params.slug[1]));
            setArticleData(data);
        };

        fetchData();
    }, [params.slug]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(calculateTimeDifference(Number(articleData[10])));
        }, 1000);

        return () => clearInterval(timer);
    }, [articleData[10]]);

    useEffect(() => {
        if (LoadingVote) {
            addNotification("Transaction waiting", "Please see your wallet.", "loading");
        }
        if (successVote) {
            addNotification("Vote submission succeed, waiting for transaction validation", `Hash: ${data.hash}`, "success");
        }
        if (errorVote) {
            addNotification("Transaction aborted", "User denied transaction.", "error");
        }
    }, [LoadingVote, successVote, errorVote, dataVote]);

    useEffect(() => {
        if (LoadingVote) {
            addNotification("Transaction waiting", "Please see your wallet.", "loading");
        }
        if (successExec) {
            addNotification("Vote submission succeed, waiting for transaction validation", `Hash: ${data.hash}`, "success");
        }
        if (errorExec) {
            addNotification("Transaction aborted", "User denied transaction.", "error");
        }
    }, [LoadingExec, successExec, errorExec, dataExec]);

    const addNotification = (title, message, type) => {
        const id = new Date().getTime();
        setNotifications((prev) => [...prev, { id, title, message, type }]);

        setTimeout(() => {
            setNotifications((prev) => prev.filter((notification) => notification.id !== id));
        }, 7000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        writeVote();
    };

    const handleVoteChange = (e) => {
        setVote(Number(e.target.value));
    };

    const totalVotes = Number(articleData[6]) + Number(articleData[7]) + Number(articleData[8]);

    return (
        <section className="container-fluid mb-4 article-container">
            <div className="row">
                <div className="col-md-9">
                    <div className="d-flex justify-content-center mt-4 mb-4">
                        <h1 className="justify-content-center text-align-center article-title">{articleData[1].replace(/[^a-zA-Z0-9\-:é&'ç()!? ]/g, '')}</h1>
                    </div>
                    <div className="d-flex author-info">
                        <p className="fs-6">Author : {articleData[3]}</p>
                    </div>
                    <div className="d-flex border text-center m-2 p-4 article-content">
                        <p className="fs-5 mt-2 text-wrap text-break">{articleData[2]}</p>
                    </div>
                    <div className="d-flex">
                        {tags &&
                            tags.split(",").map((tag, index) => (
                                <span key={index} className="badge bg-primary text-light ms-2">
                                    {tag}
                                </span>
                            ))}
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="sticky-top pt-4 sidebar">
                        <ProgressBar yesVotes={Number(articleData[6])} noVotes={Number(articleData[7])} abstainVotes={Number(articleData[8])} />
                        <div className="vote-stats">
                            <p className="mt-4">Yes (% of votes) : {(Number(articleData[6]) * 100) / totalVotes}</p>
                            <p>No (% of votes) : {(Number(articleData[7]) * 100) / totalVotes}</p>
                            <p>Abstain (% of votes) : {(Number(articleData[8]) * 100) / totalVotes}</p>
                            <p>Unique voters : {Number(articleData[9])}</p>
                            <p>Voting end in : {calculateTimeDifference(Number(articleData[10]))}</p>
                            {Math.floor(Date.now() / 1000) > Number(articleData[10]) && (
                                <button className="btn btn-secondary mt-3 w-100" onClick={() => writeExec()}>Execute</button>
                            )}

                        </div>
                        <hr className="my-3" />
                        <form onSubmit={handleSubmit} className="vote-form d-flex flex-column align-items-center">
                            <div className="btn-group-vertical w-100" role="group">
                                <input type="radio" className="btn-check" name="voteOption" id="yes" value="0" checked={vote === 0} onChange={handleVoteChange} />
                                <label className="btn btn-outline-primary" htmlFor="yes">Yes</label>
                                <input type="radio" className="btn-check" name="voteOption" id="no" value="1" checked={vote === 1} onChange={handleVoteChange} />
                                <label className="btn btn-outline-primary" htmlFor="no">No</label>
                                <input type="radio" className="btn-check" name="voteOption" id="abstain" value="2" checked={vote === 2} onChange={handleVoteChange} />
                                <label className="btn btn-outline-primary" htmlFor="abstain">Abstain</label>
                            </div>
                            <button type="submit" className="btn btn-primary mt-3 w-100">Vote</button>
                        </form>
                    </div>
                </div>
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
            </div>
        </section>
    );
};

export default Page;