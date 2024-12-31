import React, { useEffect, useState } from 'react';
import  GetBooks  from '../Api/Api.js';
import '../ComponentsStyle/Home.css'


function Home(){
    const [books, setBooks] = useState([]);
        useEffect(() => {
            GetBooks().then(setBooks).catch(console.error);
        },[]);
    return(
       <>
        <h1 class="main-h1">BookList</h1>
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
                            <button type='sumbit' class="btn btn-primary" id='ReadButton' onClick={"Read()"}>Read</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
       </>
    );
}

export default Home;