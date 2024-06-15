"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ProgressBar from "../../partials/progressbar";

export default function GetProposals() {
    const [keyword, setKeyword] = useState('');
    const [order, setOrder] = useState('');
    const [page, setPage] = useState(1);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [proposalsList, setProposalsList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/articles/readtag`, { method: 'GET' });
                const data = await res.json();
                setProposalsList(data.data);
            } catch (error) {
                console.error('Error fetching proposals:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchTags = async () => {
            const res = await fetch(`/api/tags/seek`, {
                method: 'POST',
                body: JSON.stringify({ token: "ads21" }),
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await res.json();
            setTags(data.data);
        };
        fetchTags();
    }, []);

    const handleTagClick = (tagName) => {
        setSelectedTags((prevSelectedTags) =>
            prevSelectedTags.includes(tagName)
                ? prevSelectedTags.filter((selected) => selected !== tagName)
                : [...prevSelectedTags, tagName]
        );
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

    let filteredProposals = proposalsList;

    if (keyword) {
        filteredProposals = filteredProposals.filter((proposal) =>
            proposal.title.includes(keyword)
        );
    }

    if (selectedTags.length > 0) {
        filteredProposals = filteredProposals.filter((proposal) =>
            selectedTags.some((tag) => proposal.tags && proposal.tags.includes(tag))
        );
    }

    if (order) {
        filteredProposals.sort((a, b) => (order === 'asc' ? a.createdAt - b.createdAt : b.createdAt - a.createdAt));
    }

    const startIndex = (page - 1) * 11;
    const endIndex = page * 11;
    const paginatedProposals = filteredProposals.slice(startIndex, endIndex);

    return (
        <div className="container-fluid">
            <div className="d-flex flex-wrap tags-filter">
                <h4>Filter by tags :</h4>
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className={`badge tag-badge ${selectedTags.includes(tag.name) ? 'selected' : ''}`}
                        onClick={() => handleTagClick(tag.name)}
                        style={{ opacity: selectedTags.includes(tag.name) ? 1 : 0.6, cursor: 'pointer', margin: '5px' }}
                    >
                        {tag.name}
                    </span>
                ))}
            </div>
            <div className="page-body row row-cols-4 mt-4 mb-6 justify-content-center">
                <div className="col-md-3 ms-2 mb-4 card">
                    <form onSubmit={handleSubmit}>
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
                            <select className="form-control" id="order" value={order} onChange={handleOrderChange}>
                                <option value="asc">Oldest</option>
                                <option value="desc">Latest</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary mb-4">
                            Search
                        </button>
                    </form>
                </div>
                {paginatedProposals.map((result, index) => (
                    <div key={index} className="card col proposal-card ms-2">
                        <div className="card-header">
                            <p>
                                Proposed by: <strong>{result.creator_address.slice(0, 6)}...{String(result.creator_address.slice(result.creator_address.length - 6))}</strong>
                            </p>
                            <span className="badge bg-success text-light">
                                {result.accepted ? 'Finished' : 'On going'}
                            </span>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{result.title}</h5>
                            <div className="badge-section mt-2">
                                {result.tags && result.tags.map((tag, idx) => (
                                    <span key={idx} className="badge bg-warning text-light ms-2">{tag}</span>
                                ))}
                            </div>
                            <ProgressBar yesVotes={result.yesVotes} noVotes={result.noVotes} abstainVotes={result.abstainVotes} />
                            <Link href={`/proposals/read/${result.id}`} className="btn btn-secondary mt-2 justify-content-center d-flex">
                                See more
                            </Link>
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
    );
}