import { query } from '../../../../db/db';
import { escape } from 'mysql';

export async function POST(req) {
    const body = await req.json();
    let articles;

    try {
        const articleQuery = `SELECT * FROM article WHERE creator_address = ?;`;

        articles = await query(articleQuery, escape(body.author_address));

    } catch (error) {
        console.error('Error reading articles:', error);
        response.status(500).send();
    }

    return new Response(JSON.stringify({ data: articles}));
}