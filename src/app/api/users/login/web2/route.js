import { query } from '../../../../../../db/db';
import { escape } from "mysql";
import { validateEmail, validatePassword } from '../../../../utils/validation';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Cookies from "js-cookie";

const JWT_SECRET = 'hgqe45h654g65df5h5h55fd6fh12ez657hf5';

export async function POST(req) {
  const { email, password } = await req.json();

  // Validate email and password
  if (!validateEmail(email) || !validatePassword(password)) {
    return new Response(JSON.stringify({ status: "Invalid email or password format" }));
  }

  const seekUserQuery = 'SELECT * FROM user WHERE email = ?;';
  const user = await query(seekUserQuery, [escape(email).slice(1, -1)]);

  // Check if user exists and compare password hash
  if (!user || !bcrypt.compareSync(password, user[0].password)) {
    return new Response(JSON.stringify({ status: "Invalid email or password" }));
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user[0].id, name: user[0].name }, JWT_SECRET, { expiresIn: '3h' });

  // Set the token as a cookie
  Cookies.set('token', token);

  return new Response(JSON.stringify({ status: "Successfully logged in!", user: user[0].id }));
}