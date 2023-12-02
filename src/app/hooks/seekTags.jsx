import { useState, useEffect } from 'react';

export default function Themes() {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const fetchTags = async () => {
            const res = await fetch(`/api/tags/seek`, {
                method: 'POST',
                body: JSON.stringify({ token: "ads21" }), // Use correct field names
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            setTags(data.data);
        };

        fetchTags();
    }, []);

    return (
        <section>
            <div className="container">
                <div className="d-flex align-items-center">
                    <h4>Discover per theme :</h4>
                </div>
                <div className="theme-section">
                    <div className="d-flex flex-wrap">
                        {tags &&
                            tags.map((tag) => (
                                <div className="mb-3" key={tag.name}>
                                    <div className="p-2 flex-fill"><span className="badge bg-primary text-light">{tag.name} <span className="badge bg-dark text-light">{tag.article_count}</span></span></div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </section>
    );
}