"use client";

import Link from 'next/link';
import '@/styles/components/Navigation.css';

export default function Navigation() {
    return (
        <main>
            <nav
                style={{
                    display: "flex",
                    fontSize: "20px",
                    padding: "15px 0 15px 15px",
                }}
                className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3"
            >
                <Link href="/Home" className="navLink" style={{
                    display: "inline-block",
                    color: "black",
                    textDecoration: "none",
                    padding: "10px"
                }}>
                    Home
                </Link>
                <Link href="/AddBook" className="navLink" style={{
                    display: "inline-block",
                    color: "black",
                    textDecoration: "none",
                    padding: "10px"
                }}>
                    Add
                </Link>
                <Link href="/UpdateBook" className="navLink" style={{
                    display: "inline-block",
                    color: "black",
                    textDecoration: "none",
                    padding: "10px"
                }}>
                    Update
                </Link>
                <Link href="/DeleteBook" className="navLink" style={{
                    display: "inline-block",
                    color: "black",
                    textDecoration: "none",
                    padding: "10px"
                }}>
                    Delete
                </Link>
            </nav>
        </main>
    );
}