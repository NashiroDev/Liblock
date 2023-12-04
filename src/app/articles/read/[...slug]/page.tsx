"use client"
import { FC, useState, useEffect } from "react";

interface pageProps {
    params: { slug: string }
}

const page: FC<pageProps> = ({ params }) => {
    const [article, setArticle] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/articles/read', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: params.slug[1] }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            setArticle(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <section className="container mb-4">
            <div className="d-flex justify-content-center mt-4 mb-4">
                <h1 className="justify-content-center text-align-center"></h1>
            </div>
            <div className="d-flex">
                <p className="fs-6">Author : 3</p>
            </div>
            <div className="d-flex border text-center m-2 p-4">
                <p className="fs-5 mt-2 text-wrap">2</p>
            </div>
        </section>
    )
}

export default page