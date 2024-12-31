import React, { useEffect, useState } from "react";
import GetBooks from '../Api/Api.js'
import '../ComponentsStyle/AddBook.css'


function AddBook(){
    const [books, setBooks] = useState([]);
        useEffect(() => {
            GetBooks().then(setBooks).catch(console.error);
        },[]);
    return(
        <>
            <h1 class="main-h1">Add Book</h1>
            <form action="/Add" method="POST" class="addForm">
                <label class="formLabel">Title</label>
                <input type="text" class="formInput" placeholder="Title"></input>
                <label class="formLabel">Description</label>
                <input type="text" class="formInput" placeholder="Description"></input>
                <label class="formLabel">Author</label>
                <input type="text" class="formInput" placeholder="Author"></input>
                <label class="formLabel">Publish Year</label>
                <input type="number" class="formInput" placeholder="Publish Year"></input>
            </form>
            <div class="btn-group-horizontal" role="group" aria-label="Horizontal button group">
                <button type='sumbit' class="btn btn-primary">Add</button>
                <button type="sumbit" class="btn btn-primary">Back</button>
            </div>
        </>
    );
}

export default AddBook;