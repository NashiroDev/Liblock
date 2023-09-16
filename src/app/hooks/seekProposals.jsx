
"use client"

import { useContractRead } from 'wagmi';
import { useState } from "react";
import tokenContract from "../../../contracts/Proposal.json";

export default function GetProposals() {
    const proposalContract = "0x12eB4a41Dd1E628C147429b797959F416e8eC906"

    const { data: counterData } = useContractRead({
        address: proposalContract,
        abi: tokenContract.abi,
        functionName: 'articleIDCounter',
    });

    const counter = counterData ? counterData.toString() : '';
    let ProposalsList = []

    for (let i = 0; i < counter; i++) {
        const { data: ProposalData } = useContractRead({
            address: proposalContract,
            abi: tokenContract.abi,
            functionName: 'readProposal',
            args: [i]
        });
        if (ProposalData !== undefined && !ProposalData[3]) {
            ProposalData[5] = ProposalData[5].toString();
            ProposalData.push(i)
            ProposalsList.push(ProposalData);
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

    if (keyword != '' && ProposalsList) {
        let ProposalsListFilter = []
        for (let i = 0; i < ProposalsList.length; i++) {
            if (ProposalsList[i][0].includes(keyword)) {
                ProposalsListFilter.push(ProposalsList[i])
            }
        }
        ProposalsList = ProposalsListFilter
    }

    if (order != '') {
        if (order === 'asc') {
            const ProposalsListOrder = [...ProposalsList].sort((a, b) => a[5] - b[5])
            ProposalsList = ProposalsListOrder
        } else if (order === 'desc') {
            const ProposalsListOrder = [...ProposalsList].sort((a, b) => b[5] - a[5])
            ProposalsList = ProposalsListOrder
        }

    }

    const startIndex = (page - 1) * 11;
    const endIndex = page * 11;

    const paginatedProposals = ProposalsList.slice(startIndex, endIndex);

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
                            <a href="#" className="btn btn-secondary mt-2">See more and vote</a>
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
                {endIndex < ProposalsList.length && (
                    <button onClick={() => setPage(page + 1)} className="btn btn-secondary ms-2">
                        Next Page
                    </button>
                )}
            </div>
        </div>
    )
}