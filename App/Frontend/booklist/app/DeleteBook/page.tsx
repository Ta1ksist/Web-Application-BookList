"use client";

import React, { useEffect, useState } from "react";
import GetBooks from '@/lib/api/FetchBook';
import Link from 'next/link';
import '@/styles/pages/DeleteBook.css';


export default function DeleteBook(){
    const [books, setBooks] = useState<Book[]>([]);
        useEffect(() => {
            GetBooks().then(setBooks).catch(console.error);
        },[]);
    return(
        <main>
            <h1 className="main-h1">Delete Book</h1>
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
                                <Link href={`/Delete/${book.id}`} className="btn btn-primary">Delete</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}