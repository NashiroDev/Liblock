import { query } from '../../../../../db/db';
import { escape } from 'mysql';
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    let marker;

    try {
        const seekTagQuery = `SELECT id FROM tags WHERE name = ?;`;
        const newTagQuery = `INSERT INTO tags (name) VALUE (?);`;
        const newLinkQuery = `INSERT INTO article_tags (article_id, tag_id) VALUES (?, ?);`;

        for (let i = 1; i <= params.tags.length; i++) {          
            try {
                const scout = await query(seekTagQuery, [escape(stringToSlug(params.tags[i]))]);
                await query(newLinkQuery, [escape(Number(params.tags[0])), scout.id]);
                marker = "1";
            } catch (error) {
                await query(newTagQuery, [escape(stringToSlug(params.tags[i]))]);
                const scout = await query(seekTagQuery, [escape(stringToSlug(params.tags[i]))]);
                await query(newLinkQuery, [escape(Number(params.tags[0])), scout.id]);
                marker = "11";
            }
        }
    } catch (error) {
        console.error('Error processing tags :', error);
    }

    return NextResponse.json({data: marker});
}

function stringToSlug(inputString) {
    // Replace spaces with hyphens, convert to lowercase, and remove non-alphabetic characters
    const slug = inputString.toLowerCase().replace(/ /g, '-').replace(/[^a-z-]/g, '');
    return String(slug);
}