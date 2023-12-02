import { query } from '../../../../../db/db';

export async function POST() {
    let result;
    
    try {
        const tagsQuery = `SELECT tags.name, COUNT(article_tags.tag_id) AS article_count
                       FROM tags
                       LEFT JOIN article_tags ON tags.id = article_tags.tag_id
                       GROUP BY tags.name;`;

        result = await query(tagsQuery);

    } catch (error) {
        console.error('Error fetching tags:', error);
        response.status(500).send();
    }

    return new Response(JSON.stringify({ data: result }));
}