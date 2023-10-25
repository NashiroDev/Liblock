"use client"

import { FC, useState, useEffect } from "react"
import ReadArticle from "../../../hooks/read"

interface pageProps {
    params: { slug: string }
}

const page: FC<pageProps> = ({ params }) => {
    const [articleData, setArticleData] = useState(['', '', '', '']);

    const data = ReadArticle(params.slug[1])
    data.then((val) => setArticleData(val))

    return (
        <section className="container mb-4">
            <div className="d-flex justify-content-center mt-4 mb-4">
                <h1 className="justify-content-center text-align-center">{articleData[1]}</h1>
            </div>
            <div className="d-flex">
                <p className="fs-6">Author : {articleData[3]}</p>
            </div>
            <div className="d-flex border text-center m-2 p-4">
                <p className="fs-5 mt-2 text-wrap">{articleData[2]}</p>
            </div>
        </section>
    )
}

export default page