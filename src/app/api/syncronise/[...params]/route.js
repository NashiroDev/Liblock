import { query } from '../../../../../db/db';
import { escape } from 'mysql';
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    let marker;

    try {
        const articleQuery = `INSERT INTO article (id, title, content, createdAt, accepted, creator_address, likes, deprecated) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

        const sanitizedParams = [
            escape(Number(params.params[0])), // Sanitize the ID parameter
            escape(String(params.params[1])), // Sanitize the title parameter
            escape(String(params.params[2])), // Sanitize the content parameter
            escape(Number(params.params[3]) - 604800), // Sanitize and calculate the createdAt parameter
            Boolean(params.params[4] === 'false') ? 0 : 1, // Sanitize the accepted parameter
            escape(String(params.params[5])), // Sanitize the creator_address parameter
            0, // No need to sanitize constant values
            0 // No need to sanitize constant values
          ];
        
        marker = await query(articleQuery, sanitizedParams);

    } catch (error) {
        console.error('Error pushing new article:', error);
    }

    return NextResponse.json({data: marker[0]});
}