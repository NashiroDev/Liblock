import { query } from '../../../../../../db/db';
import { escape } from "mysql";

export async function POST(req) {

    const { address, name } = await req.json();

    try {
        const newUserQuery = 'INSERT INTO user (address, name) VALUES (?, ?);';

        // Create a new user in the database
        await query(newUserQuery, [address, escape(name).slice(1,-1)]);

    } catch (error) {
        console.error('Error creating user', error);
        return new Response(JSON.stringify({ status:"An error occured, please retry." }))
    }

    return new Response(JSON.stringify({ status:"Successfully registered !" }));
}