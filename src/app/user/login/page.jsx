"use client"
import { useState } from 'react';
import Cookies from "js-cookie";
import { getUserIdFromToken, getUserNameFromToken } from '../../utils/token';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to API to register the user
            const res = await fetch('/api/users/login/web2', {
                method: 'POST',
                body: JSON.stringify({ email: email, password: password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setData(await res.json());

            // ------------------------------------------------
            const token = Cookies.get('token');

            // Get the user ID and name from the token
            const userId = getUserIdFromToken(token);
            const userName = getUserNameFromToken(token);

            console.log(userId); // Use the user ID as needed
            console.log(userName); // Use the user name as needed
            // -------------------------------------------------

            // Handle the response (e.g., show success message, redirect to login page)
        } catch (error) {
            setData("An error occured during login. Please try again");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {data &&
                <div>{data.status}</div>
            }
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={handleEmailChange} />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={handlePasswordChange} />

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;