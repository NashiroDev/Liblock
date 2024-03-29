
"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import ReadArticle, { ReadAny } from "./read"
import proposalAbi from "../../../contracts/gProposal.json";

export default function GetProposals() {
    const [tag, setTag] = useState('');
    const [keyword, setKeyword] = useState('');
    const [order, setOrder] = useState('');
    const [page, setPage] = useState(1);
    const [counter, setCounter] = useState();
    let [proposalsList, setProposalsList] = useState([]);

    const proposalContract = process.env.NEXT_PUBLIC_PROPOSALS_ADDRESS;

    const counterData = ReadAny(proposalContract, proposalAbi.abi, 'proposalCount')
    counterData.then((val) => setCounter(String(val)-1));

    useEffect(() => {
        if (proposalsList.length !== counter + 1) {
            const fetchData = async () => {
                const newProposalsList = [];
                for (let i = 0; i <= counter; i++) {
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

    const handleTagChange = (e) => {
        setTag(e.target.value);
    };

    const handleKeywordChange = (e) => {
        setKeyword(e.target.value);
    };

    const handleOrderChange = (e) => {
        setOrder(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    if (keyword != '' && proposalsList) {
        let proposalsListFilter = []
        for (let i = 0; i < proposalsList.length; i++) {
            if (proposalsList[i][1].includes(keyword)) {
                proposalsListFilter.push(proposalsList[i])
            }
        }
        proposalsList = proposalsListFilter
    }

    if (order != '') {
        if (order === 'asc') {
            const proposalsListOrder = [...proposalsList].sort((a, b) => a[10] - b[10])
            proposalsList = proposalsListOrder
        } else if (order === 'desc') {
            const proposalsListOrder = [...proposalsList].sort((a, b) => b[10] - a[10])
            proposalsList = proposalsListOrder
        }

    }

    const startIndex = (page - 1) * 11;
    const endIndex = page * 11;

    const paginatedProposals = proposalsList.slice(startIndex, endIndex);

    return (
        <div className="container-fluid">
            <div className="page-body row row-cols-4 mt-4 mb-6 justify-content-center">
                <div className="col-md-3 ms-2 mb-4 card">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-2">
                            <label htmlFor="tag">Tag:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="tag"
                                value={tag}
                                onChange={handleTagChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="keyword">Keyword:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="keyword"
                                value={keyword}
                                onChange={handleKeywordChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="order">Order:</label>
                            <select
                                className="form-control"
                                id="order"
                                value={order}
                                onChange={handleOrderChange}
                            >
                                <option value="asc">Oldest</option>
                                <option value="desc">Latest</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary mb-4">Search</button>
                    </form>
                </div>
                {paginatedProposals.map((result, index) => (
                    <div key={index} className="card col proposal-card ms-2">
                        <div className="card-header">
                            <p>Proposed by : <strong>{result[3].slice(0, 6)}...{result[3].slice(36, 42)}</strong><span className="badge bg-success text-light ms-4">{result[3] ? 'Refused' : 'On going'}</span></p>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{result[1]}</h5>
                            <div className="badge-section mt-2">
                                <span className="badge bg-warning text-light ms-2">BTC</span>
                            </div>
                            <div className="progress mt-2">
                                <div className="progress-bar-striped bg-success d-flex justify-content-center" style={{ width: 70 }}>70%</div>
                                <div className="progress-bar-striped bg-warning d-flex justify-content-center" style={{ width: 5 }}>5%</div>
                                <div className="progress-bar-striped bg-danger d-flex justify-content-center" style={{ width: 25 }}>25%</div>
                            </div>
                            <Link href={`/proposals/read/${result[-1]}/${result[0]}`} className="btn btn-secondary mt-2 justify-content-center d-flex">See more</Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-center m-4">
                {page > 1 && (
                    <button onClick={() => setPage(page - 1)} className="btn btn-secondary ms-2">
                        Previous Page
                    </button>
                )}
                {endIndex < proposalsList.length && (
                    <button onClick={() => setPage(page + 1)} className="btn btn-secondary ms-2">
                        Next Page
                    </button>
                )}
            </div>
        </div>
    )
}