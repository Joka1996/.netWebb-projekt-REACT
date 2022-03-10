import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";
import { Book } from "./components/Book";
import { Author } from "./components/Author";
import { Category } from "./components/Category";
import { User } from "./components/User";
import { NoPage } from "./components/NoPage";
import DetailPage from "./components/DetailPage";
import { SearchBook } from "./components/SearchBook";
import AuthorDetail from "./components/AuthorDetail";
import React from "react";
import CategoryDetail from "./components/CategoryDetail";
import Admin from "./components/Admin";

function App() {
  return (
    <div className="App container">
      <h3 className="d-flex justify-content-start m-3">Bibblan</h3>
      <Router>
        <nav className="navbar-nav bg-light">
          <ul className="d-flex justify-content-start flex-wrap list-unstyled ">
            <Link className="btn btn-primary m-1" to="/">
              <li className="">Start</li>
            </Link>
            <Link className="btn btn-primary m-1" to="books">
              <li className="">Böcker</li>
            </Link>
            <Link className="btn btn-primary m-1" to="searchbook">
              <li className="">Sök</li>
            </Link>
            <Link className="btn btn-primary m-1" to="authors">
              <li className="nav-item- m-1">Författare</li>
            </Link>
            <Link className="btn btn-primary m-1" to="categories">
              <li className="">Kategorier</li>
            </Link>
            <Link className="btn btn-primary m-1" to="users">
              <li className="">Användare</li>
            </Link>
            <Link className="btn btn-primary m-1" to="admin">
              <li className="">Admin</li>
            </Link>
          </ul>
        </nav>
        <hr></hr>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="books" element={<Book />}></Route>
          <Route path="authors" element={<Author />}></Route>
          <Route path="users" element={<User />}></Route>
          <Route path="admin" element={<Admin />}></Route>
          <Route path="categories" element={<Category />}></Route>
          <Route path="*" element={<NoPage />}></Route>
          <Route path="searchbook" element={<SearchBook />}></Route>
          <Route path="detailpage/:book_id" element={<DetailPage />}></Route>
          <Route
            path="authordetail/:author_id"
            element={<AuthorDetail />}
          ></Route>
          <Route
            path="categorydetail/:category_id"
            element={<CategoryDetail />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
