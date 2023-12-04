"use client"
import { useState, useEffect } from 'react';
import ReadArticle from "./read";

export default function SyncArticles({ onChainCounter }) {
    const [id, setId] = useState(0);
    const [executed, setExecuted] = useState(false);
    const [executed1, setExecuted1] = useState(false);

    useEffect(() => {
        if (!executed) {
            const fetcher = async () => {
                const res = await fetch(`/api/articles/last`);
                if (res.status == 200) {
                    const temp = await res.json();
                    setId(temp.data);
                } else {
                    setId(-1);
                }
                setExecuted(true);
            }

            fetcher();
            
        }
    }), [id];

    useEffect(() => {
        if (Number(onChainCounter) > id && !executed1 && executed) {
            setExecuted1(true);
            const pusher = async () => {
                for (let i = id+1; i <= onChainCounter; i++) {
                    const currentArticle = await ReadArticle(i);
                    const res = await fetch(`/api/articles/syncronise/${currentArticle[0]}/${currentArticle[1].replace(/[^a-zA-Z0-9\-:é&'ç()!? ]/g, '')}/${currentArticle[2]}/${currentArticle[10]}/${currentArticle[5]}/${currentArticle[3]}`);
                }
            }
            
            pusher();
        }
    }), [id];
    
    return (
        <div>
            <p>{id} | {onChainCounter}</p>
        </div>
    )
}