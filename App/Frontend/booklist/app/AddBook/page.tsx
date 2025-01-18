"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AddBook as AddBookAPI } from "@/lib/api/FetchBook";
import "@/styles/pages/AddBook.css";


export default function AddBook() {
    const [formData, setFormData] = useState<Book>({
        title: "",
        description: "",
        author: "",
        year: "",
    });

    const router = useRouter();

    const Back = () => {
        router.push("/");
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        try {
            await AddBookAPI(formData);
            alert("Книга успешно добавлена!");
            router.push("/");
        } catch (error) {
            if (error instanceof Error) {
                alert(`Ошибка: ${error.message}`);
            } else {
                alert("Произошла неизвестная ошибка.");
            }
        }
    };

    return (
        <main>
            <h1 className="main-h1">Add Book</h1>
            <form onSubmit={handleSubmit} className="addForm">
                <label className="formLabel">Title</label>
                <input
                    type="text"
                    name="title"
                    className="formInput"
                    placeholder="Title"
                    onChange={handleChange}
                    value={formData.title}
                    required
                />
                <label className="formLabel">Description</label>
                <input
                    type="text"
                    name="description"
                    className="formInput"
                    placeholder="Description"
                    onChange={handleChange}
                    value={formData.description}
                    required
                />
                <label className="formLabel">Author</label>
                <input
                    type="text"
                    name="author"
                    className="formInput"
                    placeholder="Author"
                    onChange={handleChange}
                    value={formData.author}
                    required
                />
                <label className="formLabel">Publish Year</label>
                <input
                    type="number"
                    name="year"
                    className="formInput"
                    placeholder="Publish Year"
                    onChange={handleChange}
                    value={formData.year}
                    required
                />
                <div
                    className="btn-group-horizontal"
                    role="group"
                    aria-label="Horizontal button group"
                >
                    <button type="submit" className="btn btn-primary">
                        Add
                    </button>
                    <button type="button" className="btn btn-primary" onClick={Back}>
                        Back
                    </button>
                </div>
            </form>
        </main>
    );
}