import { useState, useEffect } from 'react';

export default function OwnedArticles({ authorAddress }) {
  const [showArticle, setShowArticle] = useState(false);
  const [articles, setArticles] = useState([]);
  const [executed, setExecuted] = useState(false);

  useEffect(() => {
    if (!executed) {
      const fetcher = async () => {
        const res = await fetch(`/api/owned/${authorAddress}`);
        const temp = await res.json();
        setArticles(temp.data);
        console.log(articles, 'tt');
        setExecuted(true);
      }

      fetcher();
    }
  }), [authorAddress];

  const handleToggleArticle = () => {
    setShowArticle(!showArticle);
  };

  if (!articles) return <div>Loading...</div>;

  return (
    <div>
      <button className="btn btn-primary mt-3" onClick={handleToggleArticle}>
        Show Articles
      </button>
      {showArticle && (
        <div className="row mt-3 justify-content-center text-center">
          {articles.map((result) => (
            <div className="col-3 ms-4 mt-4 card d-flex row-3" key={result.id}>
              <div className="card-body">
                <p className="card-text">test = {result.title}</p>
                <p className="card-text">id = {result.id}</p>
                <p className="card-text">test = {result.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}