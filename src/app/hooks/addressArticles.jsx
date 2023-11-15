import { useState } from 'react';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function OwnedArticles({ authorAddress }) {
  const [showArticle, setShowArticle] = useState(false);

  const { data: articles, error } = useSWR(`/api/owned/${authorAddress}`, fetcher);

  console.log(`/api/owned/${authorAddress}`);

  const handleToggleArticle = () => {
    setShowArticle(!showArticle);
  };

  if (error) return <div>Failed to load</div>;
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
                <p className="card-text">test = {result[0]}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}