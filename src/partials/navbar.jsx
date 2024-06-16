"use client"
import Link from 'next/link'
import React, { useState } from 'react';
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from 'wagmi';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { address, isConnected } = useAccount();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
      <div className="container">
        <Link className="navbar-brand text-info" href="/"><img className="nav-img" src="/assets/logo-no-background.svg" alt="Liblock" /></Link>
        <div className="navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item active">
              <Link className="nav-link text-light" href="/articles">Articles</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" href="/proposals">Proposals</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" href="/gate">Ecosystem gate</Link>
            </li>
            <li className="nav-item">
              <button className="nav-link text-light dropdown-toggle" onClick={toggleDropdown}>
                Externals links
              </button>
              {isDropdownOpen && (
                <div className="dropdown-menu show" onMouseLeave={toggleDropdown}>
                  <Link className="dropdown-item" href="/option1">X</Link>
                  <Link className="dropdown-item" href="/option2">Discord</Link>
                  <Link className="dropdown-item" href="/option3">View contracts</Link>
                </div>
              )}
            </li>
          </ul>
        </div>
        <ul className="navbar-nav ms-4">
          {isConnected && (
            <li className="nav-item">
              <Link className="nav-link text-light" href="/dashboard">Dashboard</Link>
            </li>
          )}
          {isConnected && (
            <li className="nav-item">
              <Link className="nav-link text-light" href="/proposals/create">Submit</Link>
            </li>
          )}
          <li>
            <ConnectButton
              accountStatus={{
                smallScreen: 'avatar',
                largeScreen: 'full',
              }}
            />
          </li>
        </ul>
      </div>
    </nav>
  );
}