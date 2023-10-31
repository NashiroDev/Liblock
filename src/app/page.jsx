"use client"
import Themes from "../partials/themes"
import { GetFewArticles, GetFewProposals } from "./hooks/peekData"
import { query } from '../../db/db';

export default function Home() {

  const fetchLastArticle = async () => {
    try {
      const lastArticleQuery = `
        SELECT *
        FROM article
        ORDER BY id DESC
        LIMIT 1
      `;
  
      const lastArticle = await query(lastArticleQuery);
  
      if (lastArticle.length > 0) {
        console.log(lastArticle);
        return lastArticle
      } else {
        console.log('No articles found');
      }
    } catch (error) {
      console.error('Error fetching last article:', error);
    }
  };

  fetchLastArticle();

  return (
    <div>
      <section>
        <div className="container mt-4">
          <h1 className="title justify-content">Welcome to Liblock, the first information-sharing platform built with
            core web3 values</h1>
          <h3 className="mt-4">Begin your blockchain and web3 journey with us!</h3>
          <p><a className="link-info mt-2" href="/articles">Start exploring</a></p>
        </div>
      </section>
      <GetFewArticles />
      <GetFewProposals />
      <Themes />
    </div>
  )
}