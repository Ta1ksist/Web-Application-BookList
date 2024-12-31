import React from "react";
import { BrowserRouter,
    Routes,
    Route,
    NavLink } from 'react-router-dom'
import Home from "./Home";
import AddBook from "./AddBook";
import UpdateBook from "./UpdateBook";
import DeleteBook from "./DeleteBook";
import '../ComponentsStyle/Navigation.css';


function Navigation(){
    return(
        <>
            <BrowserRouter>
                <nav class="nav" style={{
                    display: "flex",
                    fontSize: "20px",
                    padding: "15px 0 15px 15px",
                }}
                    className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
                    <NavLink to={"/"} class="navLink" style={{
                        display: "inline-block",
                        color: "black",
                        textDecoration: "none",
                        padding: "10px"
                        }}>Home</NavLink>
                    <NavLink to={"/AddBook"} class="navLink" style={{
                        display: "inline-block",
                        color: "black",
                        textDecoration: "none",
                        padding: "10px"
                        }}>Add</NavLink>
                    <NavLink to={"/UpdateBook"} class="navLink" style={{
                        display: "inline-block",
                        color: "black",
                        textDecoration: "none",
                        padding: "10px"
                        }}>Update</NavLink>
                    <NavLink to={"/DeleteBook"} class="navLink" style={{
                        display: "inline-block",
                        color: "black",
                        textDecoration: "none",
                        padding: "10px"
                        }}>Delete</NavLink>
                </nav>
                <div>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/AddBook" element={<AddBook />} />
                        <Route exact path="UpdateBook" element={<UpdateBook />} />
                        <Route exact path="/DeleteBook" element={<DeleteBook />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    );
}

export default Navigation;