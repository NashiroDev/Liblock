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
    const [notifications, setNotifications] = useState([]);

    const { config } = usePrepareContractWrite({
        address: proposalContract,
        abi: proposalAbi.abi,
        functionName: "vote",
        args: [Number(params.slug[1]), vote]
    });

    const { data, isLoading, isSuccess, isError, write } = useContractWrite(config);

    useEffect(() => {
        const fetchData = async () => {
            const data = await ReadArticle(Number(params.slug[1]));
            setArticleData(data);
        };

        fetchData();
    }, [params.slug]);

    useEffect(() => {
        if (isLoading) {
            addNotification("Transaction waiting", "Please see your wallet.", "loading");
        }
        if (isSuccess) {
            addNotification("Claim submission succeed, waiting for transaction validation", `Hash: ${data.hash}`, "success");
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
};

export default Page;