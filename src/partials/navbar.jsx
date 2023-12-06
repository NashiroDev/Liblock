"use client"
import Link from 'next/link'
import React, { useState } from 'react';

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
              <button onClick={toggleDropdown} className="btn text-light">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-link-45deg" viewBox="0 0 16 16">
                  <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                  <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
                </svg>
                Links
              </button>
              {isDropdownOpen && (
                <ul className="overflow-auto">
                  <li><Link className="dropdown-item position-absolute" href="#">Twitter</Link></li>
                  <li><Link className="dropdown-item position-absolute" href="#">Discord</Link></li>
                  <li><Link className="dropdown-item position-absolute" href="#">Contracts</Link></li>
                </ul>
              )}
            </li>
          </ul>
        </div>
        <ul className="navbar-nav ms-4">
          <li className="nav-item">
            <Link className="nav-link text-light" href="/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" href="/proposals/create">Submit</Link>
          </li>
          <li>
            <Link className="nav-link text-light" href="/user/register">Login / Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}