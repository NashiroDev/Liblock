"use client"

import { FC } from "react"
import Navbar from "../../../../partials/navbar"
import Footer from "../../../../partials/footer"
import ReadArticle from "../../../hooks/read"

interface pageProps {
    params: { slug: string }
}

const page: FC<pageProps> = ({ params }) => {

    const articleData = ReadArticle(params.slug[1])

    return (
        <div>
            <Navbar />
            <section className="container mb-4">
                <div className="d-flex justify-content-center mt-4 mb-4">
                    <h1 className="justify-content-center text-align-center">{articleData[0]}</h1>
                </div>
                <div className="d-flex">
                    <p className="fs-6">Author : {articleData[2]}</p>
                </div>
                <div className="d-flex border text-center m-2 p-4">
                    <p className="fs-5 mt-2 text-wrap">{articleData[1]}</p>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default page