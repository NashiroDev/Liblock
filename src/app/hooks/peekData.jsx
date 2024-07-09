"use client"
import Link from "next/link"
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReadArticle, { ReadAny } from "./read"
import SyncArticles from "./syncronise";
import proposalAbi from "../../../contracts/gProposal.json";

const cardStyle = {
    width: '100%',
    height: 'auto',
    padding: '1rem'
};

const containerStyle = {
    display: 'grid',
    gap: '1rem',
    gridTemplateColumns: 'repeat(3, 1fr)', // 3 columns
    gridTemplateRows: 'repeat(2, auto)' // 2 rows
};

const buttonStyle = {
    marginRight: '0.618rem'
};

const navigationContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.618rem',
    marginLeft: '1.318rem'
};

export function GetFewArticles() {
    const proposalContract = process.env.NEXT_PUBLIC_PROPOSALS_ADDRESS;

    const [page, setPage] = useState(1);
    const [counter, setCounter] = useState();
    const [articlesList, setArticlesList] = useState([]);

    const counterData = ReadAny(proposalContract, proposalAbi.abi, 'proposalCount')
    counterData.then((val) => setCounter(Math.max(0, Number(val) - 1)));

    useEffect(() => {
        if (articlesList.length < 12) {
            const fetchData = async () => {
                const newArticlesList = [];
                for (let i = counter; i >= counter - 11; i--) {
                    const articleData = await ReadArticle(i);
                    articleData.push(String(articleData[1]).toLowerCase().replace(/[^a-zA-Z0-9- ]/g, '').replace(/\s+/g, '-'));
                    articleData[1] = articleData[1].replace(/[^a-zA-Z0-9\-:é&'ç()!? ]/g, '');
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

    const startIndex = (page - 1) * 6; // 6 articles per page
    const endIndex = page * 6;
    const paginatedArticles = articlesList.slice(startIndex, endIndex);

    return (
        <section>
            <SyncArticles onChainCounter={counter} />
            <div className="container">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <h4>Last articles :</h4>
                        <Link className="link-info ms-2" href="/articles">View all</Link>
                    </div>
                    <div style={navigationContainerStyle}>
                        <button style={buttonStyle} onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>Previous</button>
                        <button style={buttonStyle} onClick={() => setPage(prev => prev + 1)} disabled={endIndex >= articlesList.length}>Next</button>
                    </div>
                </div>
                <div style={containerStyle} className="mt-4">
                    <AnimatePresence>
                        {paginatedArticles.map((result, index) => (
                            <motion.div
                                key={result[0]}
                                className="card"
                                style={cardStyle}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 0.5, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                            >
                                <Link href={`/articles/read/${result[11]}/${result[0]}`} passHref>
                                    <div className="card-body">
                                        <h5 className="card-title">{result[1].slice(0, 48)}</h5>
                                        <p className="card-text">{result[2].slice(0, 107)}...</p>
                                        <p className="card-text">By : {result[3].slice(0, 6)}...{result[3].slice(36, 42)}</p>
                                        <div className="badge-section mt-2">
                                            <span className="badge bg-warning text-light ms-2">Dapps</span>
                                            <span className="badge bg-warning text-light ms-2">L2</span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

export function GetFewProposals() {
    const proposalContract = process.env.NEXT_PUBLIC_PROPOSALS_ADDRESS;

    const [page, setPage] = useState(1);
    const [counter, setCounter] = useState();
    const [proposalsList, setProposalsList] = useState([]);

    const counterData = ReadAny(proposalContract, proposalAbi.abi, 'proposalCount')
    counterData.then((val) => setCounter(Math.max(0, Number(val) - 1)));

    useEffect(() => {
        if (proposalsList.length < 12) {
            const fetchData = async () => {
                const newProposalsList = [];
                for (let i = counter; i >= counter - 11; i--) {
                    const proposalData = await ReadArticle(i);
                    proposalData.push(String(proposalData[1]).toLowerCase().replace(/[^a-zA-Z0-9- ]/g, '').replace(/\s+/g, '-'));
                    proposalData[1] = proposalData[1].replace(/[^a-zA-Z0-9\-:é&'ç()!? ]/g, '');
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

    const startIndex = (page - 1) * 6; // 6 proposals per page
    const endIndex = page * 6;
    const paginatedProposals = proposalsList.slice(startIndex, endIndex);

    return (
        <section>
            <div className="container">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <h4>Deliberating articles :</h4>
                        <Link className="link-info ms-2" href="/proposals">View all</Link>
                    </div>
                    <div style={navigationContainerStyle}>
                        <button style={buttonStyle} onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>Previous</button>
                        <button style={buttonStyle} onClick={() => setPage(prev => prev + 1)} disabled={endIndex >= proposalsList.length}>Next</button>
                    </div>
                </div>
                <div style={containerStyle} className="mt-4">
                    <AnimatePresence>
                        {paginatedProposals.map((result, index) => (
                            <motion.div
                                key={result[0]}
                                className="card"
                                style={cardStyle}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                            >
                                <Link href={`/proposals/read/${result[11]}/${result[0]}`} passHref>
                                    <div className="card-body d-flex flex-column align-items-center text-center">
                                        <h5 className="card-title text-black">{result[1].slice(0, 48)}</h5>
                                        <p className="card-text text-black text-break">{result[2].slice(0, 107)}...</p>
                                        <p className="card-text text-black">Proposer : {result[3].slice(0, 6)}...{result[3].slice(36, 42)}</p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}