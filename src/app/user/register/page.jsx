"use client"
import { useState } from 'react';
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from 'wagmi';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [data, setData] = useState(false);
  const [showWeb2, setShowWeb2] = useState(false);
  const [showWeb3, setShowWeb3] = useState(false);
  const address = useAccount().address;

  const handleWeb2 = async () => {
    setShowWeb2(!showWeb2);
    setShowWeb3(false);
  }

  const handleWeb3 = async () => {
    setShowWeb3(!showWeb3);
    setShowWeb2(false);
  }

  const handleRegisterWeb2 = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to API to register the user
      const res = await fetch('/api/users/register/web2', {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password, name: pseudo }),
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

  const handleRegisterWeb3 = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to API to register the user
      const res = await fetch('/api/users/register/web3', {
        method: 'POST',
        body: JSON.stringify({ address: address, name: pseudo }),
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
      <h1>Register :</h1>
      <div>
        <button onClick={handleWeb2}>Register with email</button>
        <button onClick={handleWeb3}>Register with wallet</button>
      </div>
      {data &&
        <div>{data.status}</div>
      }
      {showWeb2 && (
        <div>
          <form onSubmit={handleRegisterWeb2}>
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
        </div>
      )}
      {showWeb3 && (
        <div>
          <form onSubmit={handleRegisterWeb3}>
            <input
              type="text"
              placeholder="Pseudo"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
            />
            <ConnectButton
              accountStatus={{
                smallScreen: 'avatar',
                largeScreen: 'full',
              }}
            />
            <p>Connected address : {address ? address : "Please connect a wallet"}</p>
            <button type="submit">Register</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;