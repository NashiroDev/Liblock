"use client"
import { query } from '../../../db/db';
import { escape } from 'mysql';
import ReadArticle from '../hooks/read';

export default async function syncronise(onChainLast, offChainLast) {
    if (Number(onChainLast) > offChainLast) {
        for (let i = offChainLast+1; i <= onChainLast; i++) {
            const currentArticle = await ReadArticle(i);
            try {
                const pushArticleQuery = `
                INSERT INTO article (id, title, content, createdAt, accepted, creator_address, likes, deprecated)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?);
                `;

                const sanitizedParams = [
                    escape(Number(currentArticle[0])), // Sanitize the ID parameter
                    escape(String(currentArticle[1])), // Sanitize the title parameter
                    escape(String(currentArticle[2])), // Sanitize the content parameter
                    escape(Number(currentArticle[10]) - 604800), // Sanitize and calculate the createdAt parameter
                    Boolean(currentArticle[5]) ? 1 : 0, // Sanitize the accepted parameter
                    escape(String(currentArticle[3])), // Sanitize the creator_address parameter
                    0, // No need to sanitize constant values
                    0 // No need to sanitize constant values
                  ];
    
                await query(pushArticleQuery, sanitizedParams);
    
            } catch (error) {
                console.error('Error pushing new article:', error);
            }
        }
    }
};

export async function lastArticle() {
    try {
        const lastArticleQuery = `
        SELECT *
        FROM article
        ORDER BY id DESC
        LIMIT 1
      `;

        const lastArticle = await query(lastArticleQuery);

        if (lastArticle.length > 0) {
            return Number(lastArticle[0].id);
        } else {
            console.log('No articles found');
        }
    } catch (error) {
        console.error('Error fetching last article:', error);
    }

    return 0;
};