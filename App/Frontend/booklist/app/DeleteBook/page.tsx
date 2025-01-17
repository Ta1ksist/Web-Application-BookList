"use client";

import React, { useEffect, useState } from "react";
import GetBooks from '@/lib/api/FetchBook';
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
                                <button type='submit' className="btn btn-primary">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}