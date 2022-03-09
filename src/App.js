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
import { SearchBook } from "./SearchBook";
import AuthorDetail from "./components/AuthorDetail";
import React from "react";
import CategoryDetail from "./components/CategoryDetail";
import Admin from "./components/Admin";

function App() {
  return (
    <div className="App container">
      <h3 className="d-flex justify-content-center m-3">Bibblan</h3>
      <Router>
        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul className="navbar-nav">
            <Link className="btn btn-light btn-outline-primary" to="/">
              <li className="nav-item- m-1">Start</li>
            </Link>
            <Link className="btn btn-light btn-outline-primary" to="books">
              <li className="nav-item- m-1">Böcker</li>
            </Link>
            <Link className="btn btn-light btn-outline-primary" to="searchbook">
              <li className="nav-item- m-1">Sök</li>
            </Link>
            <Link className="btn btn-light btn-outline-primary" to="authors">
              <li className="nav-item- m-1">Författare</li>
            </Link>
            <Link className="btn btn-light btn-outline-primary" to="categories">
              <li className="nav-item- m-1">Kategorier</li>
            </Link>
            <Link className="btn btn-light btn-outline-primary" to="users">
              <li className="nav-item- m-1">Användare</li>
            </Link>
            <Link className="btn btn-light btn-outline-primary" to="admin">
              <li className="nav-item- m-1">Admin</li>
            </Link>
          </ul>
        </nav>

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
