import { query } from '../../../../../db/db';
import { escape } from 'mysql';
import { NextResponse } from "next/server";

export async function GET(request) {
    let lastId;

    try {
        const articleQuery = `
      SELECT * FROM article OREDER BY id DESC LIMIT 1;
    `;

        lastId = await query(articleQuery, escape(author_address));

    } catch (error) {
        console.error('Error reading last Id:', error);
        response.status(500).send();
    }

    return NextResponse.json({data: lastId});
}