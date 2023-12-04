import { query } from '../../../../../db/db';

export async function POST(req) {

    const { userId, articleId } = await req.json();

    try {
        const checkLikeQuery = `SELECT * FROM likes WHERE user_id = ? AND article_id = ?;`;
        const deleteLikeQuery = `DELETE FROM likes WHERE user_id = ? AND article_id = ?;`;
        const decrementLikesQuery = `UPDATE article SET likes = likes - 1 WHERE id = ?;`;
        const incrementLikesQuery = `UPDATE article SET likes = likes + 1 WHERE id = ?;`;
        const createLikeQuery = `INSERT INTO likes (user_id, article_id) VALUES (?, ?);`;
        
        const checkLikeResult = await query(checkLikeQuery, [userId, articleId]);

        if (checkLikeResult.length > 0) {

            await query(deleteLikeQuery, [userId, articleId]);
            await query(decrementLikesQuery, [articleId]);

            console.log('User unliked the article');
        } else {

            await query(incrementLikesQuery, [articleId]);
            await query(createLikeQuery, [userId, articleId]);

            console.log('User liked the article');
        }
    } catch (error) {
        console.error('Error liking the article:', error);
        throw error;
    }
}