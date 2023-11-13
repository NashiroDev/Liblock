"use client"
import { query } from '../../../db/db';
import { escape } from 'mysql';

export default async function fetchArticleOwned(owner) {
    try {
        const articleQuery = `
        SELECT * FROM article;
        `;

        // const sanitizedParams = [
        //     escape(owner),
        // ];

        const response = await query(articleQuery, escape(owner));

        if (response.lengh > 0) {
            return response
        } else {
            console.log('Nothing found');
        }
    } catch (error) {
        console.error('Error reading article:', error);
    }

    return 0;
}