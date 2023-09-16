"use client"

import { useContractRead } from 'wagmi';
import { useState } from "react";
import tokenContract from "../../../contracts/Proposal.json";

export function GetFewArticles() {
    const proposalContract = "0x12eB4a41Dd1E628C147429b797959F416e8eC906"

    const { data: counterData } = useContractRead({
        address: proposalContract,
        abi: tokenContract.abi,
        functionName: 'articleIDCounter',
    });

    const counter = counterData ? counterData.toString() : 1;
    let articlesList = []

    for (let i = counter-1; i != 0; i--) {
        const { data: articleData } = useContractRead({
            address: proposalContract,
            abi: tokenContract.abi,
            functionName: 'readProposal',
            args: [i]
        });
        if (articleData !== undefined && !articleData[3]) {
            articleData[5] = articleData[5].toString();
            articleData.push(i)
            articlesList.push(articleData);
            if (articlesList.length > 10) {
                break;
            }
        };
    };

    const [page, setPage] = useState(1);

    const startIndex = (page - 1) * 3;
    const endIndex = page * 3;

    const paginatedArticles = articlesList.slice(startIndex, endIndex);

    return (
        <section>
            <div className="container">
                <div className="d-flex align-items-center">
                    <h4>Last articles :</h4>
                    <a className="link-info ms-2" href="/articles">View all</a>
                </div>
                <div className="d-flex mt-4">
                    <ul className="pagination justify-content-center align-items-center">
                        <li className="page-item">{page > 1 && (
                            <button onClick={() => setPage(page - 1)} className="btn btn-secondary ms-2">
                                Prev
                            </button>
                        )}</li>
                        {paginatedArticles.map((result, index) => (
                            <div key={index} className="col-3 ms-4 card">
                                <img src="./assets/logo-color.svg" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{result[0]}</h5>
                                    <p className="card-text">{result[1].slice(0, 107)}...</p>
                                    <p className="card-text">By : {result[2].slice(0, 6)}...{result[2].slice(36, 42)}</p>
                                    <div className="badge-section mt-2">
                                        <span className="badge bg-warning text-light ms-2">Dapps</span>
                                        <span className="badge bg-warning text-light ms-2">L2</span>
                                    </div>
                                    <a href="#" className="btn btn-primary mt-2">Read</a>
                                </div>
                            </div>
                        ))}
                        <li className="page-item ms-4">{endIndex < articlesList.length && (
                            <button onClick={() => setPage(page + 1)} className="btn btn-secondary ms-2">
                                Next
                            </button>
                        )}</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export function GetFewProposals() {
    const proposalContract = "0x12eB4a41Dd1E628C147429b797959F416e8eC906"

    const { data: counterData } = useContractRead({
        address: proposalContract,
        abi: tokenContract.abi,
        functionName: 'articleIDCounter',
    });

    const counter = counterData ? counterData.toString() : 1;
    let proposalsList = []

    for (let i = counter-1; i != 0; i--) {
        const { data: proposalData } = useContractRead({
            address: proposalContract,
            abi: tokenContract.abi,
            functionName: 'readProposal',
            args: [i]
        });
        if (proposalData !== undefined && !proposalData[3]) {
            proposalData[5] = proposalData[5].toString();
            proposalData.push(i)
            proposalsList.push(proposalData);
            if (proposalsList.length > 11) {
                break;
            }
        };
    };

    const [page, setPage] = useState(1);

    const startIndex = (page - 1) * 3;
    const endIndex = page * 3;

    const paginatedProposals = proposalsList.slice(startIndex, endIndex);

    return (
        <section>
            <div className="container">
                <div className="d-flex align-items-center">
                    <h4>Deliberating articles :</h4>
                    <a className="link-info ms-2" href="/proposals">View all</a>
                </div>
                <div className="d-flex mt-4">
                    <ul className="pagination justify-content-center align-items-center">
                        <li className="page-item">{page > 1 && (
                            <button onClick={() => setPage(page - 1)} className="btn btn-secondary ms-2">
                                Prev
                            </button>
                        )}</li>
                        {paginatedProposals.map((result, index) => (
                            <div key={index} className="col-3 ms-4 card">
                                <img src="./assets/logo-color.svg" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{result[0]}</h5>
                                    <p className="card-text">Proposer : {result[2].slice(0, 6)}...{result[2].slice(36, 42)}</p>
                                    <div className="progress mt-2">
                                        <div className="progress-bar-striped bg-success" style={{ width: 50 }}></div>
                                        <div className="progress-bar-striped bg-warning" style={{ width: 45 }}></div>
                                        <div className="progress-bar-striped bg-danger" style={{ width: 98 }}></div>
                                    </div>
                                    <a href="#" className="btn btn-primary mt-2">See and vote</a>
                                </div>
                            </div>
                        ))}
                        <li className="page-item ms-4">{endIndex < proposalsList.length && (
                            <button onClick={() => setPage(page + 1)} className="btn btn-secondary ms-2">
                                Next
                            </button>
                        )}</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}