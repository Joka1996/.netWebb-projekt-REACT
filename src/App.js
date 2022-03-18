import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
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
import UserLogin from "./components/UserLogin";
import { RegisterUser } from "./components/RegisterUser";
import UserPage from "./components/UserPage";

function App() {
  const [admin, setAdmin] = useState();
  const [user, setUser] = useState();

  //kör funktioner
  useEffect(() => {
    checkUser();
    checkAdmin();
  }, []);

  const checkUser = () => {
    //kolla om admin är lagrad i localstorage
    const loggedIn = localStorage.getItem("user");
    if (loggedIn) {
      const foundUser = JSON.parse(loggedIn);
      setUser(foundUser);
      //console.log(foundUser);
    }
  };

  const checkAdmin = () => {
    //kolla om admin är lagrad i localstorage
    const loggedIn = localStorage.getItem("admin");
    if (loggedIn) {
      const foundAdmin = JSON.parse(loggedIn);
      setAdmin(foundAdmin);
      //console.log(setAdmin(loggedIn));
    }
  };

  return (
    <div className="App container">
      <header>
        <h1 className="d-flex justify-content-start m-3">Bibblan</h1>
        {user != null ? (
          <p className="d-flex justify-content-start m-3 fs-5">
            Inloggad som: {user}
          </p>
        ) : null}
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
              {admin != null ? (
                <Link className="btn btn-primary m-1" to="users">
                  <li className="">Användare</li>
                </Link>
              ) : null}
              {user != null ? (
                <Link className="btn btn-primary m-1" to="userLogin">
                  <li className="">Logga ut</li>
                </Link>
              ) : (
                <Link className="btn btn-primary m-1" to="userLogin">
                  <li className="">Logga in</li>
                </Link>
              )}
              {user != null ? (
                <Link className="btn btn-primary m-1" to="userPage">
                  <li className="">Profilsida</li>
                </Link>
              ) : null}

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
            <Route path="userLogin" element={<UserLogin />}></Route>
            <Route path="userPage" element={<UserPage />}></Route>
            <Route path="registerUser" element={<RegisterUser />}></Route>
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
      </header>
    </div>
  );
}

export default App;
