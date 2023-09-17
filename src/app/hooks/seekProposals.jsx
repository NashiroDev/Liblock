
"use client"

import { useState } from "react";
import Link from "next/link";
import ReadArticle, { ReadAny } from "./read"
import tokenContract from "../../../contracts/Proposal.json";

export default function GetProposals() {
    const proposalContract = "0x12eB4a41Dd1E628C147429b797959F416e8eC906"

    // const { data: counterData } = useContractRead({
    //     address: proposalContract,
    //     abi: tokenContract.abi,
    //     functionName: 'articleIDCounter',
    // });
    const counterData = ReadAny(proposalContract, tokenContract.abi, 'articleIDCounter')

    const counter = counterData ? counterData.toString() : '1';
    let proposalsList = []

    for (let i = 0; i < counter; i++) {
        // const { data: proposalData } = useContractRead({
        //     address: proposalContract,
        //     abi: tokenContract.abi,
        //     functionName: 'readProposal',
        //     args: [i]
        // });
        const proposalData = ReadArticle(i)
        if (proposalData !== undefined && !proposalData[3]) {
            proposalData[5] = proposalData[5].toString();
            proposalData.push(i)
            proposalsList.push(proposalData);
        };
    };

    const [tag, setTag] = useState('');
    const [keyword, setKeyword] = useState('');
    const [order, setOrder] = useState('');
    const [page, setPage] = useState(1);

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
        // Logic for filtering and searching Proposals based on the form inputs
        console.log('Tag:', tag);
        console.log('Keyword:', keyword);
        console.log('Order:', order);
    };

    if (keyword != '' && proposalsList) {
        let proposalsListFilter = []
        for (let i = 0; i < proposalsList.length; i++) {
            if (proposalsList[i][0].includes(keyword)) {
                proposalsListFilter.push(proposalsList[i])
            }
        }
        proposalsList = proposalsListFilter
    }

    if (order != '') {
        if (order === 'asc') {
            const proposalsListOrder = [...proposalsList].sort((a, b) => a[5] - b[5])
            proposalsList = proposalsListOrder
        } else if (order === 'desc') {
            const proposalsListOrder = [...proposalsList].sort((a, b) => b[5] - a[5])
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
                            <p>Proposed by : <strong>{result[2].slice(0, 6)}...{result[2].slice(36, 42)}</strong><span className="badge bg-success text-light ms-4">{result[3] ? 'Refused' : 'On going'}</span></p>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{result[0]}</h5>
                            <div className="badge-section mt-2">
                                <span className="badge bg-warning text-light ms-2">BTC</span>
                            </div>
                            <div className="progress mt-2">
                                <div className="progress-bar-striped bg-success d-flex justify-content-center" style={{ width: 70 }}>70%</div>
                                <div className="progress-bar-striped bg-warning d-flex justify-content-center" style={{ width: 5 }}>5%</div>
                                <div className="progress-bar-striped bg-danger d-flex justify-content-center" style={{ width: 25 }}>25%</div>
                            </div>
                            <Link href={`/proposals/read/${result[0]}/${result[6]}`} className="btn btn-secondary mt-2 justify-content-center d-flex">See more</Link>
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