import { query } from '../../../../../db/db';

export async function GET() {
    try {
        const articlesQuery = `
            SELECT 
                article.id, 
                article.title, 
                article.content, 
                article.createdAt, 
                article.accepted, 
                article.creator_address,
                article.likes,
                article.deprecated,
                JSON_ARRAYAGG(tags.name) AS tags
            FROM 
                article
            LEFT JOIN 
                article_tags ON article.id = article_tags.article_id
            LEFT JOIN 
                tags ON article_tags.tag_id = tags.id
            GROUP BY 
                article.id;
        `;

        const articles = await query(articlesQuery);
        return new Response(JSON.stringify({ data: articles }), { status: 200 });
    } catch (error) {
        console.error('Error fetching articles:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}