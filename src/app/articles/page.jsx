"use client"
import Navbar from "../../partials/navbar"
import Footer from "../../partials/footer"
import React, { useState } from "react"
import GetArticles from "../hooks/seekArticles"

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

    // const [currentPage, setCurrentPage] = useState(1);
    // const articlesPerPage = 5;

    // // Calculate the index of the first and last article of the current page
    // const indexOfLastArticle = currentPage * articlesPerPage;
    // const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;

    // const [tag, setTag] = useState('');
    // const [keyword, setKeyword] = useState('');
    // const [order, setOrder] = useState('');

    // // Get the articles to be displayed on the current page
    // const currentArticles = articleList.slice(indexOfFirstArticle, indexOfLastArticle);

    // const handleTagChange = (e) => {
    //     setTag(e.target.value);
    // };

    // const handleKeywordChange = (e) => {
    //     setKeyword(e.target.value);
    // };

    // const handleOrderChange = (e) => {
    //     setOrder(e.target.value);
    // };

    // const handleNextPage = () => {
    //     setCurrentPage(currentPage + 1);
    // };

    // const handlePreviousPage = () => {
    //     setCurrentPage(currentPage - 1);
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Logic for filtering and searching articles based on the form inputs
    //     console.log('Tag:', tag);
    //     console.log('Keyword:', keyword);
    //     console.log('Order:', order);
    // };

    return (
        <section>
            <div className="page-head">
                <img src="./assets/article-banner.png" className="img-fluid" alt="missing" />
                <h2>Articles</h2>
            </div>
            <GetArticles />
        </section>
    );
}