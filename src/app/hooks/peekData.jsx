"use client"
import Link from "next/link"
import { useState, useEffect } from "react";
import ReadArticle, { ReadAny } from "./read"
import SyncArticles from "./syncronise";
import proposalAbi from "../../../contracts/gProposal.json";

export function GetFewArticles() {
    const proposalContract = process.env.NEXT_PUBLIC_PROPOSALS_ADDRESS

    const [page, setPage] = useState(1);
    const [counter, setCounter] = useState();
    let [articlesList, setArticlesList] = useState([]);

    const counterData = ReadAny(proposalContract, proposalAbi.abi, 'proposalCount')
    counterData.then((val) => setCounter(String(val)-1));

    useEffect(() => {
        if (articlesList.length < 12) {
            const fetchData = async () => {
                const newArticlesList = [];
                for (let i = counter; i >= counter-11; i--) {
                    const articleData = await ReadArticle(i);
                    if (articleData[5]) {
                        articleData[10] = String(articleData[10]);
                        newArticlesList.push(articleData);
                    }
                }
                setArticlesList(newArticlesList);
            }
            fetchData();
        }
    }, [counter]);

    const startIndex = (page - 1) * 3;
    const endIndex = page * 3;

    const paginatedArticles = articlesList.slice(startIndex, endIndex);

    return (
        <section>
            <SyncArticles onChainCounter={counter}/>
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
                                    <h5 className="card-title">{result[1].slice(0, 48)}</h5>
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
    const proposalContract = process.env.NEXT_PUBLIC_PROPOSALS_ADDRESS

    const [page, setPage] = useState(1);
    const [counter, setCounter] = useState();
    let [proposalsList, setProposalsList] = useState([]);

    const counterData = ReadAny(proposalContract, proposalAbi.abi, 'proposalCount')
    counterData.then((val) => setCounter(String(val)-1));

    useEffect(() => {
        if (proposalsList.length < 12) {
            const fetchData = async () => {
                const newProposalsList = [];
                for (let i = counter; i >= counter-11; i--) {
                    const proposalData = await ReadArticle(i);
                    if (!proposalData[5]) {
                        proposalData[10] = String(proposalData[10]);
                        newProposalsList.push(proposalData);
                    }
                }
                setProposalsList(newProposalsList);
            }
            fetchData();
        }
    }, [counter]);

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
                                    <h5 className="card-title">{result[1].slice(0, 48)}</h5>
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