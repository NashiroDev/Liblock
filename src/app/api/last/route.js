import { query } from '../../../../db/db';
import { NextResponse } from "next/server";

export async function GET(request, response) {
    let lastId = 0;

    try {
        const articleQuery = `SELECT id FROM article OREDER BY id DESC LIMIT 1;`;

        lastId = await query(articleQuery);

    } catch (error) {
        console.error('Error reading last Id:', error);
        response.status(500).send();
    }

    return NextResponse.json({data: lastId});
}