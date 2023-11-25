"use client"
import { useState, useEffect } from 'react';
import ReadArticle from "./read"

export default function SyncArticles() {
    const [id, setId] = useState(0);
    const [counter, setCounter] = useState(0);
    const [executed, setExecuted] = useState(false);
    const [executed1, setExecuted1] = useState(false);

    const proposalContract = process.env.NEXT_PUBLIC_PROPOSALS_ADDRESS;
    let counterData;

    useEffect(() => {
        if (!executed) {
            const fetcher = async () => {
                const res = await fetch(`/api/last`);
                const temp = await res.json();
                setId(temp.data);
                counterData = await ReadAny(proposalContract, proposalAbi.abi, 'proposalCount');
                counterData.then((data) => setCounter(data));
                setExecuted(true);
            }

            fetcher();
            
        }
    }), [id];

    useEffect(() => {
        if (Number(counterData) > id && !executed1) {
            setExecuted1(true);
            const pusher = async () => {
                for (let i = id+1; i <= counterData; i++) {
                    const currentArticle = await ReadArticle(i);
                    const res = await fetch(`/api/syncronise/${currentArticle[0]}/${currentArticle[1]}/${currentArticle[2]}/${currentArticle[10]}/${currentArticle[5]}/${currentArticle[3]}`);
                    console.log(res.json());
                }
            }
            
            pusher();
        }
    }), [counter];
    
    return (
        <div>
            <p>00</p>
        </div>
    )
}