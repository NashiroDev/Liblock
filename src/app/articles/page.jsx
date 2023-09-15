"use client"
import Navbar from "../../partials/navbar"
import Footer from "../../partials/footer"
import React from "react"
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