import { query } from '../../../../db/db';
import { escape } from 'mysql';

export async function POST(req) {
    const body = await req.json();
    let articles;

    try {
        const articleQuery = `
            SELECT a.*, GROUP_CONCAT(t.name) AS linkedTags
            FROM article a
            LEFT JOIN article_tags at ON a.id = at.article_id
            LEFT JOIN tags t ON at.tag_id = t.id
            WHERE a.creator_address = ? 
            GROUP BY a.id;
        `;

        articles = await query(articleQuery, escape(body.author_address));

    } catch (error) {
        console.error('Error reading articles:', error);
        response.status(500).send();
    }

    return new Response(JSON.stringify({ data: articles}));
}