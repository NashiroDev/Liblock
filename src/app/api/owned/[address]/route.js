import { query } from '../../../../../db/db';
import { escape } from 'mysql';
import { NextResponse } from "next/server";

export async function GET({ params }) {
    const author_address = params.address;
    let articles;

    try {
        const articleQuery = `SELECT * FROM article WHERE creator_address = ?;`;

        articles = await query(articleQuery, escape(author_address));

    } catch (error) {
        console.error('Error reading articles:', error);
        response.status(500).send();
    }

    return NextResponse.json({data: articles});
}