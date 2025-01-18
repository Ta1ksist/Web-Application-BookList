"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { GetBooks } from "@/lib/api/FetchBook";
import "@/styles/pages/Delete.css";


export default function Read() {
  const { id } = useParams(); 
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await GetBooks();
        const selectedBook = books.find((b: Book) => b.id === id);
        setBook(selectedBook || null);
      } catch (error) {
        console.error("Error fetching books: ", error);
      }
    };

    if (id) {
      fetchBooks();
    }
  }, [id]);

  if (!id) {
    return <p>Error: No book ID provided in URL.</p>;
  }

  if (!book) {
    return <p>Loading...</p>;
  }

  const Back  = () => {
    router.push('/')
  }

  const DeleteBook = () => {
    router.push(`/Delete/${id}`); 
  };

  return (
    <main>
      <h1 className="main-h1">Delete Book</h1>
      <form action={`/Delete/${id}`} method="DELETE" className="deleteForm">
        <label className="formLabel">Title: {book.title}</label>
        <label className="formLabel">Description: {book.description}</label>
        <label className="formLabel">Author: {book.author}</label>
        <label className="formLabel">Publish Year: {book.year}</label>
      </form>
      <div className="btn-group-horizontal" role="group" aria-label="Horizontal button group">
        <button type="button" className="btn btn-primary" onClick={Back}>Back</button>
        <button type="button" className="btn btn-primary" onClick={DeleteBook}>Delete</button>
      </div>
    </main>
  );
}