import React, { useEffect, useState } from 'react';
import { GetBooks } from "./Api";


function BookList() {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        GetBooks().then(setBooks).catch(console.error);
    },[]);
    return (
        <div>
        <ul>
            {books.map(book => (
                <>{book.title}<br></br>{book.description}<br></br>{book.author}<br></br>{book.year}</>
            ))}
        </ul>
    </div>
    );
}

export default BookList;