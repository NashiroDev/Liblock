import { query } from '../../../../db/db';
import { escape } from 'mysql';

export async function POST(req) {
    let marker;
    let scout;
    let scout1;

    const { id, tagsList } = await req.json();

    try {
        const seekTagQuery = `SELECT id FROM tags WHERE name = ?;`;
        const newTagQuery = `INSERT INTO tags (name) VALUE (?);`;
        const newLinkQuery = `INSERT INTO article_tags (article_id, tag_id, guard) VALUES (?, ?, ?);`;

        for (let i = 0; i < tagsList.length; i++) {

            marker = "0";
            try {
                // Use a try-catch block to handle duplicate entry error
                await query(newTagQuery, [escape(stringToSlug(tagsList[i]))]);
                console.log(scout, "Tag inserted and re-queried");
                marker += "1";
            } catch (error) {
                // Handle duplicate entry error more gracefully
                if (error.code === 'ER_DUP_ENTRY') {
                    console.log(`Tag '${tagsList[i]}' already exists.`);
                    marker += "3";
                    // Retrieve the existing tag
                } else {
                    console.error('Error inserting tag:', error);
                    throw error; // Rethrow other errors
                }
            }


            try {
                scout = await query(seekTagQuery, [escape(stringToSlug(tagsList[i]))]);
                marker += "2";
                console.log(scout[0].id, "Link query result");
                
                await query(newLinkQuery, [escape(id), String(scout[0].id), (escape(id) + "." + String(scout[0].id))]);
                marker += "22";
                console.log('Link inserted successfully', newLinkQuery, [escape(id), scout[0].id, (escape(id) + "." + String(scout[0].id))]);
                
            } catch (error) {

                if (error.code === 'ER_DUP_ENTRY') {
                    console.log(`Tag already linked.`);
                    marker += "9";
                } else {
                    console.error('Error inserting tag:', error);
                    throw error; // Rethrow other errors
                }
            }
        }

    } catch (error) {
        console.error('Error processing tags:', error);
    }

    return new Response(JSON.stringify({ marker: marker, scout: scout }));
}

function stringToSlug(inputString) {
    // Replace spaces with hyphens, convert to lowercase, and remove non-alphabetic characters
    const slug = String(inputString).toLowerCase().replace(/ /g, '-').replace(/[^a-z-]/g, '');
    return String(slug);
}
