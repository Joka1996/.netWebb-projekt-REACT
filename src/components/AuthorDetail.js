import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { EndPoints } from "./EndPoints";
import { Footer } from "./Footer";
//useParams(hooks) fungerar ej med class, så får bli en funktion
function AuthorDetail() {
  const { author_id } = useParams();

  //console.log(book_id);
  //kör funktionen
  useEffect(() => {
    refreshList();
  }, []);

  //ska skrivas ut med state
  const [author, setAuthor] = useState({});
  //flera böcker sparas i array.
  const [books, setBooks] = useState([]);

  //hämta enskild författare och böcker personen skrivit
  const refreshList = async () => {
    const fetchAuthor = await fetch(EndPoints.API_URL + "Authors/" + author_id);
    const author = await fetchAuthor.json();
    setAuthor(author);
    //console.log(book.book_Title); //test
    //böker
    const fetchBooks = await fetch(
      EndPoints.API_URL + "Books/bookbyauthor?author=" + author.author_Name
    );
    const books = await fetchBooks.json();
    //console.log(books);
    setBooks(books);
  };

  return (
    <div className="App">
      <main>
        <h2>Detaljer</h2>
        <div className="container">
          <h3> {author.author_Name}</h3>
          <dl className="row">
            <dt className="col-sm-2">Författare:</dt>
            <dd className="col-sm-10">{author.author_Name}</dd>
            <dt className="col-sm-2">Skrivna böcker:</dt>
            <dd className="col-sm-10">
              <ul className="list-group">
                {books.map((bok) => (
                  <li className="list-group-item" key={bok.book_Title}>
                    {bok.book_Title}{" "}
                  </li>
                ))}
              </ul>
            </dd>
          </dl>
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default AuthorDetail;
