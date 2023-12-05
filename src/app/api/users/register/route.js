import { query } from '../../../../../db/db';
import { escape } from "mysql";
import { hashPassword } from '../../../utils/password'; // Import a password hashing utility function
import { validateEmail, validatePassword } from '../../../utils/validation'; // Import validation utility functions

export default async function POST(req) {
    let newUser;

    const { email, password, name } = await req.json();

    // Validate the email and password
    if (!validateEmail(email) || !validatePassword(password)) {
        return new Response(JSON.stringify({ status:"Invalid email or password" }))
    }

    try {
        const newUserQuery = 'INSERT INTO user (email, password, name) VALUES (?, ?, ?);';
        const hashedPassword = await hashPassword(password);

        // Create a new user in the database
        newUser = await query(newUserQuery, [escape(email), escape(name), hashedPassword]);

    } catch (error) {
        console.error('Error creating user', error);
    }

    return new Response(JSON.stringify({ status:newUser }))
}