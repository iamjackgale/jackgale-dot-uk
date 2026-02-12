"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d="M15.8 3.2a8.9 8.9 0 1 0 5 14.6A9.2 9.2 0 0 1 15.8 3.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const resolvedTheme = savedTheme === "dark" ? "dark" : "light";
    setTheme(resolvedTheme);
    document.documentElement.setAttribute("data-theme", resolvedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    window.localStorage.setItem("theme", nextTheme);
  };

  return (
    <nav className="navbar-outer navbar-fixed">
      <div className="navbar-inner">
        <Link className="navbar-brand navbar-brand-flex" aria-current="page" href="/">
          <Image
            src="/logos/favicon.png"
            alt="Jack Gale logo"
            width={64}
            height={64}
            className="navbar-brand-icon"
          />
          <span className="navbar-wordmark">Jack Gale</span>
        </Link>
        <ul className="navbar-nav navbar-nav-flex">
          <li className="nav-item">
            <Link className="nav-link" href="/presence">
              Presence
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/articles">Articles</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/experience">Experience</Link>
          </li>
        </ul>
        <button
          className="theme-toggle nav-link"
          type="button"
          onClick={toggleTheme}
          aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          title={theme === "light" ? "Dark mode" : "Light mode"}
        >
          {theme === "light" ? <SunIcon /> : <MoonIcon />}
        </button>
        <button
          className="navbar-toggler navbar-toggler-custom"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="navbar-toggler-icon">
            <span className="navbar-toggler-bar"></span>
            <span className="navbar-toggler-bar"></span>
            <span className="navbar-toggler-bar"></span>
          </span>
        </button>
      </div>
      {open && (
        <div className="navbar-dropdown">
          <Link href="/presence" className="nav-link dropdown-link" onClick={() => setOpen(false)}>
            Presence
          </Link>
          <Link href="/articles" className="nav-link dropdown-link" onClick={() => setOpen(false)}>
            Articles
          </Link>
          <Link href="/experience" className="nav-link dropdown-link" onClick={() => setOpen(false)}>
            Experience
          </Link>
          <button
            className="theme-toggle nav-link dropdown-link mobile-theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            title={theme === "light" ? "Dark mode" : "Light mode"}
          >
            {theme === "light" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      )}
    </nav>
  );
}
