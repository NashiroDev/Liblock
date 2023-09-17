"use client"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import Link from 'next/link'
import { useState } from 'react';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
      <div className="container">
        <Link className="navbar-brand text-info" href="/"><img className="nav-img" src="/assets/logo-no-background.svg" alt="Liblock" /></Link>
        <div className="navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link text-light" href="/articles">Articles</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" href="/proposals">Proposals</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" href="/delegate">Delegate</Link>
            </li>
            <li className="nav-item dropdown">
              <button className="nav-link dropdown-toggle text-light" onClick={toggleDropdown} aria-haspopup="true" aria-expanded={isDropdownOpen}>
                Links
              </button>
              {isDropdownOpen && (
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <Link className="dropdown-item" href="#">Twitter</Link>
                  <Link className="dropdown-item" href="#">Discord</Link>
                  <Link className="dropdown-item" href="#">Contracts</Link>
                </div>
              )}
            </li>
          </ul>
        </div>
        <ul className="navbar-nav ms-4">
          <li><ConnectButton
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