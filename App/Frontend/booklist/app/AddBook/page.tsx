"use client";

import React from "react";
import { useRouter } from "next/navigation";
import '@/styles/pages/AddBook.css';


export default function AddBook(){
    const router = useRouter();
    const Back = () => {
        router.push('/');
    };
    return(
        <main>
            <h1 className="main-h1">Add Book</h1>
            <form action="/Add" method="POST" className="addForm">
                <label className="formLabel">Title</label>
                <input type="text" className="formInput" placeholder="Title"></input>
                <label className="formLabel">Description</label>
                <input type="text" className="formInput" placeholder="Description"></input>
                <label className="formLabel">Author</label>
                <input type="text" className="formInput" placeholder="Author"></input>
                <label className="formLabel">Publish Year</label>
                <input type="number" className="formInput" placeholder="Publish Year"></input>
            </form>
            <div className="btn-group-horizontal" role="group" aria-label="Horizontal button group">
                <button type='submit' className="btn btn-primary">Add</button>
                <button type='submit' className="btn btn-primary" onClick={Back}>Back</button>
            </div>
        </main>
    );
}