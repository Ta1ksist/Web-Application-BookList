"use client";

import React, { useEffect, useState } from 'react';
import  GetBooks  from '@/lib/api/FetchBook';
import { Link } from 'react-router-dom';
import '@/styles/pages/Home.css';

export default function Home(){
    const [books, setBooks] = useState<Book[]>([]);
        useEffect(() => {
            GetBooks().then(setBooks).catch(console.error);
        },[]);
    return(
       <main>
        <h1 className="main-h1">BookList</h1>
        <table>
            <thead>
                <tr>
                    <th>
                        Title
                    </th>
                    <th>
                        Description
                    </th>
                    <th>
                        Author
                    </th>
                    <th>
                        Year
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {books.map((book) => (
                    <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.description}</td>
                        <td>{book.author}</td>
                        <td>{book.year}</td>
                        <td>
                            <Link to={`/Read/${book.id}`} className="btn btn-primary">Read</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
       </main>
    );
}