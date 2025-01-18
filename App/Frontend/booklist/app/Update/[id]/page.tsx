"use client";

import React, { useEffect, useState } from 'react';
import  { GetBooks }  from '@/lib/api/FetchBook';
import { useRouter, useParams } from "next/navigation";
import '@/styles/pages/Update.css';


export default function Update(){
    const { id } = useParams();
    const router = useRouter();
    const [book, setBook] = useState<Book | null>(null);
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const books = await GetBooks();
                const selectedBook = books.find((b: { id: string | undefined; }) => b.id === id);
                setBook(selectedBook || null);
            } catch (error) {
                console.error("Error fetching books: ", error);
            }
        };

        fetchBooks();
    }, [id]);

    if (!id) {
        return <p>Error: No book ID provided in URL.</p>;
      }
  
      if (!book) {
          return <p>Loading...</p>;
      }

    const Back = () => {
        router.push('/');
    }
    
    const UpdateBook = () => {
        router.push('/Update/:id')
    };
    return(
        <main>
            <h1 className="main-h1">Update Book</h1>
            <form action={`/Update/${id}`} method='PUT' className='updateForm'>
                <label className="formLabel">Title</label>
                <input type="text" className="formInput" placeholder={book.title}></input>
                <label className="formLabel">Description</label>
                <input type="text" className="formInput" placeholder={book.description}></input>
                <label className="formLabel">Author</label>
                <input type="text" className="formInput" placeholder={book.author}></input>
                <label className="formLabel">Publish Year</label>
                <input type="number" className="formInput" placeholder={book.year}></input>
            </form>
            <div className="btn-group-horizontal" role="group" aria-label="Horizontal button group">
                <button type='submit' className="btn btn-primary" onClick={Back}>Back</button>
                <button type='submit' className="btn btn-primary" onClick={UpdateBook}>Update</button>
            </div>
        </main>
    );
}