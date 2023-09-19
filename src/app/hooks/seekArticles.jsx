"use client"

import { useState } from "react";
import Link from "next/link";
import ReadArticle, { ReadAny } from "./read"
import tokenContract from "../../../contracts/Proposal.json";

export default function GetArticles() {
    const proposalContract = "0x426ed6a38a15645bd24AAFe92579dDd0896d33Cd"

    // const { data: counterData } = useContractRead({
    //     address: proposalContract,
    //     abi: tokenContract.abi,
    //     functionName: 'articleIDCounter',
    // });
    const counterData = ReadAny(proposalContract, tokenContract.abi, 'proposalCount')

    const counter = counterData ? counterData.toString() : '1';
    let articlesList = []

    for (let i = 1; i <= counter; i++) {
        // const { data: articleData } = useContractRead({
        //     address: proposalContract,
        //     abi: tokenContract.abi,
        //     functionName: 'readProposal',
        //     args: [i]
        // });
        const articleData = ReadArticle(i)
        if (articleData && articleData[4]) {
            articleData[0] = articleData[0].toString();
            articleData[6] = articleData[6].toString();
            articleData[7] = articleData[7].toString();
            articleData[8] = articleData[8].toString();
            articleData[9] = articleData[9].toString();
            articlesList.push(articleData);
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
        // Logic for filtering and searching articles based on the form inputs
        console.log('Tag:', tag);
        console.log('Keyword:', keyword);
        console.log('Order:', order);
    };

    if (keyword != '' && articlesList) {
        let articlesListFilter = []
        for (let i = 0; i < articlesList.length; i++) {
            if (articlesList[i][0].includes(keyword)) {
                articlesListFilter.push(articlesList[i])
            }
        }
        articlesList = articlesListFilter
    }    

    if (order != '') {
        if (order === 'asc') {
            const articlesListOrder = [...articlesList].sort((a, b) => a[5] - b[5])
            articlesList = articlesListOrder
        } else if (order === 'desc') {
            const articlesListOrder = [...articlesList].sort((a, b) => b[5] - a[5])
            articlesList = articlesListOrder
        }
        
    }

    const startIndex = (page - 1) * 11;
    const endIndex = page * 11;

    const paginatedArticles = articlesList.slice(startIndex, endIndex);

    return (
        <div className="container">
            <div className="page-body row row-cols-4 mt-4 mb-6">
                <div className="col-md-3 ms-4 mb-4 p-2 card">
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
                        <button type="submit" className="btn btn-secondary mb-4">Search</button>
                    </form>
                </div>
                {paginatedArticles.map((result, index) => (
                    <div key={index} className="col-3 ms-4 card mt-4">
                        <img src="./assets/logo-color.svg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title text-align-center mx-auto">{result[1].slice(0, 30)}</h5>
                            <p className="card-text text-align-center">{result[2].slice(0, 107)}...</p>
                            <p className='d-flex justify-content-center lh-1'>By : {result[3].slice(0, 6)}...{result[3].slice(36, 42)}</p>
                            <div className="d-flex justify-content-center">
                                <Link href={`/articles/read/${result[1]}/${result[0]}`} className="btn btn-primary">Read</Link>
                            </div>
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
                {endIndex < articlesList.length && (
                    <button onClick={() => setPage(page + 1)} className="btn btn-secondary ms-2">
                        Next Page
                    </button>
                )}
            </div>
        </div>
    )
}