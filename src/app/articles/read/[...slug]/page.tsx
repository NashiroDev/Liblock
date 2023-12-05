"use client"
import { FC, useState, useEffect } from "react";
import { useAccount } from "wagmi";

interface Article {
  title: string;
  creator_address: string;
  content: string;
  createdAt: number;
  deprecated: number;
  likes: number;
  linkedTags: string;
}

interface pageProps {
  params: { slug: string };
}

const Page: FC<pageProps> = ({ params }) => {
  const [article, setArticle] = useState<Article | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/articles/read", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: params.slug[1] }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      const date = new Date(data.data[0].createdAt * 1000);
      data.data[0].createdAt = date.toLocaleString();
      setArticle(data.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLike = async () => {
    try {
      // Prepare mock POST API call for like button
      const response = await fetch("/api/likes/switch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId:useAccount(), articleId:params.slug[1] }), //use connected user instead, same for deprecated
      });

      if (!response.ok) {
        throw new Error("Failed to like the article");
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleDeprecated = async () => {
    try {
      // Prepare mock POST API call for deprecated button
      const response = await fetch("/api/deprecated/switch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId:useAccount(), articleId:params.slug[1] }),
      });

      if (!response.ok) {
        throw new Error("Failed to mark the article as deprecated");
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="container mb-4">
      {article && (
        <div>
          <div className="d-flex justify-content-center mt-4 mb-4">
            <h1 className="justify-content-center text-align-center">{article.title.slice(1, -1)}</h1>
          </div>
          <div className="d-flex">
            <p className="fs-6 me-auto">Author: {article.creator_address.slice(1, -1)}</p>
            <p className="fs-6">Created at: {article.createdAt}</p>
          </div>
          <div className="d-flex border text-center m-2 p-4">
            <p className="fs-5 mt-2 text-wrap">{article.content.slice(1, -1)}</p>
          </div>
          <div className="d-flex">
            {article.linkedTags &&
              article.linkedTags.split(",").map((tag, index) => (
                <span key={index} className="badge bg-primary text-light ms-2">
                  {tag.slice(1, -1)}
                </span>
              ))}
          </div>
          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-primary me-2 w-10 ms-4" onClick={handleLike}>
              Like {article.likes}
            </button>
            <button className="btn btn-danger w-10 ms-4" onClick={handleDeprecated}>
              Deprecated {article.deprecated}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Page;