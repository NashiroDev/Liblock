import { useState, useEffect } from 'react';

export default function OwnedArticles({ authorAddress }) {
  const [showArticle, setShowArticle] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [articles, setArticles] = useState([]);
  const [executed, setExecuted] = useState(false);
  const [executed1, setExecuted1] = useState(false);

  const [tagInput, setTagInput] = useState('');

  
  useEffect(() => {
    if (!executed) {
      const fetcher = async () => {
        const res = await fetch(`/api/owned/${authorAddress}`);
        const temp = await res.json();
        setArticles(temp.data);
        setExecuted(true);
      }

      fetcher();
    }
  }), [authorAddress];

  const handleToggleArticle = () => {
    setShowArticle(!showArticle);
  };

  const handleToggleTag = () => {
    setShowTags(!showTags);
  };

  const handleAddTag = (articleId) => {
    
    const regexPattern = /^[a-zA-Z]+$/;

    const formattedTags = tagInput
      .trim()
      .split(' ')
      .filter((tag) => tag !== '' && regexPattern.test(tag))
      .join('/');
    
    console.log(formattedTags);
  
    if (!executed1) {
      const fetcher = async () => {
          await fetch(`/api/tags/${articleId}/${formattedTags}`);
          setExecuted1(true);
      }

      fetcher();
    }
  
    // Clear the tag input field
    setTagInput('');
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
                <h4 className="card-text">{result.title}</h4>
                <p className="card-text">{result.content.slice(0, 107)}...</p>
                <button className='btn btn-primary' onClick={handleToggleTag}>Need to add tags ?</button>
              </div>
              {showTags && (
                <div className="mt-3 justify-content-center text-center">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Enter tags..."
                  />
                  <button className="btn btn-primary" onClick={handleAddTag(result.id)}>
                    Add Tags
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}