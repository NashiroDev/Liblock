import { query } from '../../../../../../db/db';
import { escape } from "mysql";
import { hashPassword } from '../../../../utils/password'; // Import a password hashing utility function
import { validateEmail, validatePassword } from '../../../../utils/validation'; // Import validation utility functions

export async function POST(req) {

    const { email, password, name } = await req.json();

    // Validate the email and password
    if (!validateEmail(email) || !validatePassword(password)) {
        return new Response(JSON.stringify({ status:"Invalid email or password" }))
    }

    try {
        const newUserQuery = 'INSERT INTO user (email, password, name) VALUES (?, ?, ?);';
        const hashedPassword = await hashPassword(password);

        // Create a new user in the database
        await query(newUserQuery, [escape(email).slice(1,-1), hashedPassword, escape(name).slice(1,-1)]);

    } catch (error) {
        console.error('Error creating user', error);
        return new Response(JSON.stringify({ status:"An error occured, please retry." }))
    }

    return new Response(JSON.stringify({ status:"Successfully registered !" }));
}