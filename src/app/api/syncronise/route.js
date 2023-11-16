import { query } from '../../../../../db/db';
import { escape } from 'mysql';
import { NextResponse } from "next/server";

export async function GET(request) {
    let marker;

    try {
        const articleQuery = `
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

        marker = await query(articleQuery, sanitizedParams);

    } catch (error) {
        console.error('Error pushing new article:', error);
    }

    return NextResponse.json({data: marker});
}