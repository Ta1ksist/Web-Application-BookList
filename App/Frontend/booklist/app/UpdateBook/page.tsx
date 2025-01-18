"use client";

import React, { useEffect, useState } from "react";
import { GetBooks } from '@/lib/api/FetchBook';
import Link from 'next/link';
import '@/styles/pages/UpdateBook.css';


export default function UpdateBook(){
    const [books, setBooks] = useState<Book[]>([]);
        useEffect(() => {
            GetBooks().then(setBooks).catch(console.error);
        },[]);
    return(
        <main>
            <h1 className="main-h1">Update Book</h1>
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
                {books.map((book,index) => (
                    <tr key={index}>
                        <td>{book.title}</td>
                        <td>{book.description}</td>
                        <td>{book.author}</td>
                        <td>{book.year}</td>
                        <td>
                            <Link href={`/Update/${book.id}`} className="btn btn-primary">Update</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </main>
    );
}