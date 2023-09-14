"use client"
import Navbar from "../../partials/navbar"
import Footer from "../../partials/footer"
import React, { useState } from "react"

export default function Index() {
    return (
        <div>
            <Navbar />
            <DisplayArticles />
            <Footer />
        </div>
    )
}

function DisplayArticles() {

    const articleList = [
        {
            id: 1,
            title: "Lorem Ipsum",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 2,
            title: "Dolor Sit Amet",
            content: "Dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 3,
            title: "Dolor Sit Amet",
            content: "Dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 4,
            title: "Dolor Sit Amet",
            content: "Dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 5,
            title: "Dolor Sit Amet",
            content: "Dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 6,
            title: "Dolor Sit Amet",
            content: "Dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 7,
            title: "Dolor Sit Amet",
            content: "Dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 8,
            title: "Dolor Sit Amet",
            content: "Dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 9,
            title: "Dolor Sit Amet",
            content: "Dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 10,
            title: "Dolor Sit Amet",
            content: "Dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 11,
            title: "Dolor Sit Amet",
            content: "Dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 12,
            title: "Dolor Sit Amet",
            content: "Dolor sit amet, consectetur adipiscing elit."
        },
    ];


    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 5;

    // Calculate the index of the first and last article of the current page
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;

    const [tag, setTag] = useState('');
    const [keyword, setKeyword] = useState('');
    const [order, setOrder] = useState('');

    // Get the articles to be displayed on the current page
    const currentArticles = articleList.slice(indexOfFirstArticle, indexOfLastArticle);

    const handleTagChange = (e) => {
        setTag(e.target.value);
    };

    const handleKeywordChange = (e) => {
        setKeyword(e.target.value);
    };

    const handleOrderChange = (e) => {
        setOrder(e.target.value);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic for filtering and searching articles based on the form inputs
        console.log('Tag:', tag);
        console.log('Keyword:', keyword);
        console.log('Order:', order);
    };

    return (
        <section>
            <div className="page-head">
                <img src="./assets/article-banner.png" className="img-fluid" alt="missing" />
                <h2>Articles</h2>
            </div>
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
                    {currentArticles.map((article) => (
                        <div key={article.id} className="col-3 ms-4 card mt-4">
                            <img src="./assets/logo-color.svg" class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">{article.title}</h5>
                                <p class="card-text">{article.content.slice(0, 150)}</p>
                                <a href="#" class="btn btn-primary">Read</a>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="d-flex justify-content-center m-4">
                    {currentPage > 1 && (
                        <button onClick={handlePreviousPage} className="btn btn-secondary ms-2">
                            Previous Page
                        </button>
                    )}
                    {articleList.length > indexOfLastArticle && (
                        <button onClick={handleNextPage} className="btn btn-secondary ms-2">
                            Next Page
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}