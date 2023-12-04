import { useState, useEffect } from 'react';

export default function OwnedArticles({ authorAddress }) {
  const [showArticle, setShowArticle] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [push, setPush] = useState(false);
  const [articleId, setArticleId] = useState('');
  const [articles, setArticles] = useState([]);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch(`/api/owned`, {
        method: 'POST',
        body: JSON.stringify({ author_address: authorAddress }), // Use correct field names
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setArticles(data.data);
    };

    fetchArticles();
  }, [authorAddress]);

  const handleToggleArticle = () => {
    setShowArticle(!showArticle);
  };

  const handleToggleTag = (articleId) => {
    setShowTags(!showTags);
    setArticleId(articleId);
  };

  const handleAddTag = async () => {
    const regexPattern = /^[a-zA-Z]+$/;

    const formattedTags = tagInput
      .trim()
      .split(' ')
      .filter((tag) => tag !== '' && regexPattern.test(tag));

    // Call the API to add tags to the article
    const addTags = async () => {
      try {
        if (articleId !== "") {
          const pushed = await fetch(`/api/tags/add`, {
            method: 'POST',
            body: JSON.stringify({ id: articleId, tagsList: formattedTags }), // Use correct field names
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!pushed.ok) {
            throw new Error(`Failed to add tags: ${pushed.status}`);
          }

          const responseData = await pushed.json();
          setPush(responseData);
        }

      } catch (error) {
        console.error('Error adding tags:', error);
      }
    };

    await addTags();

    // Clear the tag input field
    setTagInput('');
  };

  return (
    <div>
      <button className="btn btn-primary mt-3" onClick={handleToggleArticle}>
        Show Articles
      </button>
      <div className="mb-3">
        <p>{push.marker}</p>
        <input
          type="text"
          className="form-control"
          placeholder="Enter tags"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={handleAddTag}>
          Add Tags for article {articleId}
        </button>
      </div>
      {showArticle && (
        <div className="row mt-3 justify-content-center text-center">
          {articles.map((result) => (
            <div className="col-3 ms-4 mt-4 card d-flex row-3" key={result.id}>
              <div className="card-body">
                <h5 className="card-text">{result.title.slice(1, -1)}</h5>
                <p className="card-text">{result.content.slice(1, -1).slice(0, 107)}...</p>
                <div className="p-2 flex-fill">
                  {result.linkedTags && result.linkedTags.split(',').map((tag, index) => (
                    <span key={index} className="badge bg-primary text-light ms-2">{tag.slice(1, -1)}</span>
                  ))}
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => handleToggleTag(result.id)}
                >
                  Pass id
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}