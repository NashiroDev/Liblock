import { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [data, setData] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your backend API to register the user
      const res = await fetch('/api/users/register', {
        method: 'POST',
        body: JSON.stringify({ email:email, password:password, pseudo:pseudo }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setData(await res.json());

      // Handle the response (e.g., show success message, redirect to login page)
    } catch (error) {
      setData("An error occured during registration. Please try again");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Pseudo"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      {data &&
        <div>{data.status}</div>
      }
    </div>
  );
};

export default RegisterPage;