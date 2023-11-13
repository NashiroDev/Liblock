import { query } from '../../../db/db';
import { escape } from 'mysql';

export default async function fetchArticleOwned(owner) {
    let response;
    try {
        const articleQuery = `
        SELECT * FROM article WHERE creator_address = ?;
        `;

        const sanitizedParams = [
            escape(owner),
          ];

        response = await query(articleQuery, sanitizedParams);

    } catch (error) {
        console.error('Error reading article:', error);
    }
    return response ? response : [];
}