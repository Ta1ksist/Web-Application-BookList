"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from "next/navigation";
import { GetBooks, UpdateBook as UpdateBookAPI } from "@/lib/api/FetchBook";
import '@/styles/pages/Update.css';

export default function Update() {
    const { id } = useParams() as { id: string };
    const router = useRouter();
    const [book, setBook] = useState<Book | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        author: "",
        year: "",
    });

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const books = await GetBooks();
                const selectedBook = books.find((b: { id: string | undefined }) => b.id === id);
                if (selectedBook) {
                    setBook(selectedBook);
                    setFormData({
                        title: selectedBook.title,
                        description: selectedBook.description,
                        author: selectedBook.author,
                        year: String(selectedBook.year),
                    });
                }
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        fetchBook();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await UpdateBookAPI({ ...formData, id });
            alert("Книга успешно обновлена!");
            router.push('/'); 
        } catch (error) {
            console.error("Error updating book:", error);
            alert("Не удалось обновить книгу.");
        }
    };

    if (!id) {
        return <p>Error: No book ID provided in URL.</p>;
    }
    if (!book) {
        return <p>Loading...</p>;
    }

    return (
        <main>
            <h1 className="main-h1">Update Book</h1>
            <form onSubmit={handleSubmit} className="updateForm">
                <label className="updateFormLabel">Title</label>
                <input
                    type="text"
                    name="title"
                    className="formInput"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <label className="updateFormLabel">Description</label>
                <input
                    type="text"
                    name="description"
                    className="formInput"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                <label className="updateFormLabel">Author</label>
                <input
                    type="text"
                    name="author"
                    className="formInput"
                    placeholder="Author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                />
                <label className="updateFormLabel">Publish Year</label>
                <input
                    type="number"
                    name="year"
                    className="formInput"
                    placeholder="Publish Year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                />
                <div
                    className="btn-group-horizontal"
                    role="group"
                    aria-label="Horizontal button group"
                >
                    <button type="submit" className="btn btn-primary">Update</button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => router.push('/')}
                    >
                        Back
                    </button>
                </div>
            </form>
        </main>
    );
}