"use client"

import { FC } from "react"
import ReadArticle from "../../../hooks/read"
import { signTypedData } from '@wagmi/core';
import { useAccount } from "wagmi"

interface pageProps {
    params: { slug: string }
}

const page: FC<pageProps> = ({ params }) => {

    let articleData = ReadArticle(params.slug[1])
    articleData = articleData ? articleData : ["loading", "loading", "loading", "loading"]
    const vote = "yes"
    const votingPower = 15

    const domain = {
        name: 'Liblock',
        version: '1',
        chainId: 5,
        verifyingContract: '0x426ed6a38a15645bd24AAFe92579dDd0896d33Cd',
    };

    const types = {
        Vote: [
            { name: 'sender', type: 'address' },
        ],
    };

    const voteData = {
        sender: useAccount().address,
    };

    try {
        const signature = signTypedData({
            domain,
            message: voteData,
            primaryType: 'Vote',
            types,
        });
        console.log(signature);

    } catch (error) {
        console.error('Error:', error);
    }

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