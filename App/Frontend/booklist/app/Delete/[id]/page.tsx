"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { GetBooks, DeleteBook as DeleteBookAPI } from "@/lib/api/FetchBook";
import "@/styles/pages/Delete.css";

export default function Delete() {
  const { id } = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const books = await GetBooks();
        const selectedBook = books.find((b: Book) => b.id === id);
        setBook(selectedBook || null);
      } catch (error) {
        setError("Error fetching book data.");
        console.error("Error fetching books: ", error);
      }
    };

    if (id) {
      fetchBook();
    } else {
      setError("No book ID provided in the URL.");
    }
  }, [id]);

  const Back = () => {
    router.push("/");
  };

  const Delete = async () => {
    if (!book) return;

    try {
      setIsDeleting(true);
      await DeleteBookAPI(book);
      router.push("/");
    } catch (error) {
      setError("Failed to delete the book. Please try again.");
      console.error("Error deleting book: ", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <h1 className="main-h1">Delete Book</h1>
      <div className="deleteForm">
        <label className="formLabel">Title: {book.title}</label>
        <label className="formLabel">Description: {book.description}</label>
        <label className="formLabel">Author: {book.author}</label>
        <label className="formLabel">Publish Year: {book.year}</label>
      </div>
      <div
        className="btn-group-horizontal"
        role="group"
        aria-label="Horizontal button group"
      >
        <button
          type="button"
          className="btn btn-primary"
          onClick={Back}
          disabled={isDeleting}
        >
          Back
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={Delete}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </main>
  );
}