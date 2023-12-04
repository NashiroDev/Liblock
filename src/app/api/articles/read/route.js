import { query } from '../../../../../db/db';

export async function POST(req) {
    const id = await req.json();
    let article;

    try {
        const articleQuery = `
        SELECT a.*, GROUP_CONCAT(t.name) AS linkedTags
        FROM article a
        LEFT JOIN article_tags at ON a.id = at.article_id
        LEFT JOIN tags t ON at.tag_id = t.id
        WHERE a.id = ? 
    `;

        article = await query(articleQuery, [Number(id.id)]);

    } catch (error) {
        console.error('Error reading article:', error);
        response.status(500).send();
    }

    return new Response(JSON.stringify({ data:article }));
}