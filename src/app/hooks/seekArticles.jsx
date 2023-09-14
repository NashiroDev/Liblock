// readProposal(uint256 proposalId)

// proposals[proposalId].adopted = true;

// uint256 public articleIDCounter;
"use client"

import { useContractRead, useContractInfiniteReads, paginatedIndexesConfig } from 'wagmi';
import { useState, useEffect } from "react";
import tokenContract from "../../../contracts/Proposal.json";

export default function GetArticles() {
    const proposalContract = "0x12eB4a41Dd1E628C147429b797959F416e8eC906"

    const proposalReader = {
        address: proposalContract,
        abi: tokenContract.abi,
    };

    const { data: counterData } = useContractRead({
        address: proposalContract,
        abi: tokenContract.abi,
        functionName: 'articleIDCounter',
    });

    console.log(counterData)

    const { data: articleData, fetchNextPage } = useContractInfiniteReads({
        cacheKey: 'articles',
        ...paginatedIndexesConfig(
            (start) => {
                return [
                    {
                        ...proposalReader,
                        functionName: 'readProposal',
                        args: [index],
                    },
                ]
            },
            { start: 0, perPage: 4, direction: 'increment' },
        ),
    });

    const articles = articleData.pages;
    let articlesList = []

    for (const article of articles) {
        if (article[0] !== undefined) {
            if (article[0].status === 'success') {
                articlesList.push(article[0].result);
            };
        }
    }

    const [tag, setTag] = useState('');
    const [keyword, setKeyword] = useState('');
    const [order, setOrder] = useState('');

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
        // Logic for filtering and searching articles based on the form inputs
        console.log('Tag:', tag);
        console.log('Keyword:', keyword);
        console.log('Order:', order);
    };

    useEffect(() => {
        fetchNextPage();
    }, []);

    console.log(articleData)

    return (
        <div className="container">
            <div className="page-body row row-cols-4 mt-4 mb-6">
                <div className="col-md-3 ms-4 mb-4 p-2">
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
                                <option value="">Select Order</option>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                                <option value="random">Random</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-secondary mb-4">Search</button>
                    </form>
                </div>
                {articlesList.map((result, index) => (
                    <div key={index} className="col-3 ms-4 card mt-4">
                        <img src="./assets/logo-color.svg" class="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{result[0]}</h5>
                            <p className="card-text">{result[1].slice(0, 150)}</p>
                            <a href="#" class="btn btn-primary">Read</a>
                        </div>
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-center m-4">
                {/* {currentPage > 1 && (
                    <button onClick={handlePreviousPage} className="btn btn-secondary ms-2">
                        Previous Page
                    </button>
                )}
                {articleList.length > indexOfLastArticle && (
                    <button onClick={handleNextPage} className="btn btn-secondary ms-2">
                        Next Page
                    </button>
                )} */}
            </div>
        </div>
    )
}