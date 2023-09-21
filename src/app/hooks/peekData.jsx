"use client"
import Link from "next/link"
import { useState } from "react";
import ReadArticle,{ ReadAny } from "./read"
import proposalAbi from "../../../contracts/Proposal.json";

export function GetFewArticles() {
    const proposalContract = "0x066bad9A6bb7931b8d7ef31F0509C3478f39dCE3"
    const [page, setPage] = useState(1);

    const counterData = ReadAny(proposalContract, proposalAbi.abi, 'proposalCount')

    const counter = counterData ? counterData.toString() : 1;
    let articlesList = []

    for (let i = counter; i > 0; i--) {
        const articleData = ReadArticle(i)
        if (articleData && !articleData[5]) { /** Later remove "!" */
            articleData[10] = articleData[10].toString();
            articlesList.push(articleData);
            if (articlesList.length > 11) {
                break;
            }
        };
    };

    const startIndex = (page - 1) * 3;
    const endIndex = page * 3;

    const paginatedArticles = articlesList.slice(startIndex, endIndex);

    return (
        <section>
            <div className="container">
                <div className="d-flex align-items-center">
                    <h4>Last articles :</h4>
                    <Link className="link-info ms-2" href="/articles">View all</Link>
                </div>
                <div className="d-flex mt-4">
                    <ul className="pagination justify-content-center align-items-center article-carousel">
                        <li className="page-item">{(
                            <button onClick={() => setPage(page - 1)} disabled={page <= 1} className="btn btn-secondary ms-2">
                                Prev
                            </button>
                        )}</li>
                        {paginatedArticles.map((result, index) => (
                            <div key={index} className="col-3 ms-4 card">
                                <img src="./assets/logo-color.svg" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{result[1]}</h5>
                                    <p className="card-text">{result[2].slice(0, 107)}...</p>
                                    <p className="card-text">By : {result[3].slice(0, 6)}...{result[3].slice(36, 42)}</p>
                                    <div className="badge-section mt-2">
                                        <span className="badge bg-warning text-light ms-2">Dapps</span>
                                        <span className="badge bg-warning text-light ms-2">L2</span>
                                    </div>
                                    <Link href={`/articles/read/${result[1]}/${result[0]}`} className="btn btn-primary mt-2">Read</Link>
                                </div>
                            </div>
                        ))}
                        <li className="page-item ms-4">{(
                            <button onClick={() => setPage(page + 1)} disabled={endIndex >= articlesList.length} className="btn btn-secondary ms-2">
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
    const proposalContract = "0x066bad9A6bb7931b8d7ef31F0509C3478f39dCE3"
    const [page, setPage] = useState(1);

    const counterData = ReadAny(proposalContract, proposalAbi.abi, 'proposalCount')

    const counter = counterData ? counterData.toString() : 1;
    let proposalsList = []

    for (let i = counter; i != 0; i--) {
        const proposalData = ReadArticle(i)
        if (proposalData && !proposalData[5]) {
            proposalData[10] = proposalData[10].toString();
            proposalsList.push(proposalData);
            if (proposalsList.length > 11) {
                break;
            }
        };
    };

    const startIndex = (page - 1) * 3;
    const endIndex = page * 3;

    const paginatedProposals = proposalsList.slice(startIndex, endIndex);

    return (
        <section>
            <div className="container">
                <div className="d-flex align-items-center">
                    <h4>Deliberating articles :</h4>
                    <Link className="link-info ms-2" href="/proposals">View all</Link>
                </div>
                <div className="d-flex mt-4">
                    <ul className="pagination justify-content-center align-items-center article-carousel">
                        <li className="page-item">{(
                            <button onClick={() => setPage(page - 1)} disabled={page <= 1} className="btn btn-secondary ms-2">
                                Prev
                            </button>
                        )}</li>
                        {paginatedProposals.map((result, index) => (
                            <div key={index} className="col-3 ms-4 card">
                                <img src="./assets/logo-color.svg" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{result[1]}</h5>
                                    <p className="card-text">Proposer : {result[3].slice(0, 6)}...{result[3].slice(36, 42)}</p>
                                    <div className="progress mt-2">
                                        <div className="progress-bar-striped bg-success" style={{ width: 50 }}></div>
                                        <div className="progress-bar-striped bg-warning" style={{ width: 45 }}></div>
                                        <div className="progress-bar-striped bg-danger" style={{ width: 98 }}></div>
                                    </div>
                                    <Link href={`/proposals/read/${result[1]}/${result[0]}`} className="btn btn-primary mt-2">See and vote</Link>
                                </div>
                            </div>
                        ))}
                        <li className="page-item ms-4">{(
                            <button onClick={() => setPage(page + 1)} disabled={endIndex >= proposalsList.length} className="btn btn-secondary ms-2">
                                Next
                            </button>
                        )}</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}