"use client"
import { useState, useEffect } from 'react';

export default function SyncArticles({ id, tags }) {
    const [executed, setExecuted] = useState(false);

    useEffect(() => {
        if (!executed) {
            const fetcher = async () => {
                const res = await fetch(`/api/tags/${id}/${tags}`);
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
}