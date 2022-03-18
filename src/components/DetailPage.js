import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { EndPoints } from "./EndPoints";
import { Footer } from "./Footer";
//useParams(hooks) fungerar ej med class, så får bli en funktion
function DetailPage() {
  const { book_id } = useParams();
  //ska skrivas ut med state
  const [book, setBooks] = useState({});
  const [admin, setAdmin] = useState();
  //console.log(book_id);
  //kör på funktionen
  useEffect(() => {
    const loggedIn = localStorage.getItem("admin");
    if (loggedIn) {
      const admin = JSON.parse(loggedIn);
      setAdmin(admin);
    }
  }, []);
  useEffect(() => {
    refreshList();
  }, []);

  //hämta boken
  const refreshList = async () => {
    const fetchBook = await fetch(EndPoints.API_URL + "Books/" + book_id);
    const book = await fetchBook.json();
    setBooks(book);
    //console.log(book.book_Title); //test
  };

  return (
    <div className="App">
      <h2>Detaljer</h2>
      <div className="container">
        <h3> {book.book_Title}</h3>
        <dl className="row bg-light">
          <dt className="col-sm-2">Författare:</dt>
          <dd className="col-sm-10">{book.author}</dd>
          <dt className="col-sm-2">Kategori:</dt>
          <dd className="col-sm-10">{book.category}</dd>
          <dt className="col-sm-2">Antal sidor:</dt>
          <dd className="col-sm-10">{book.book_Pages}</dd>
          <dt className="col-sm-2">Betyg:</dt>
          <dd className="col-sm-10">{book.book_Rating}/5</dd>
          <dt className="col-sm-2">Omslag:</dt>
          <dd className="col-sm-10">
            {" "}
            <img
              className="img-thumbnail img-responsive "
              src={book.book_ImageUrl}
              alt={book.Book_ImageUrl}
            ></img>{" "}
          </dd>
        </dl>
        <h4>Utlåning</h4>
        {/*visa bara utlåning om boken är utlånad */}
        {book.book_Rented === true ? (
          <dl className="row">
            <dt className="col-sm-2">Utlånad?</dt>
            <dd className="col-sm-10">
              <input
                className="checkbox"
                disabled="disabled"
                aria-disabled
                type="checkbox"
                checked="checked"
              ></input>
            </dd>
            <dt className="col-sm-2">Datum för utlåning:</dt>
            <dd className="col-sm-10">{book.book_TimeRented}</dd>
            <dt className="col-sm-2">Lånad av:</dt>
            {admin != null ? (
              <dd className="col-sm-10">{book.user}</dd>
            ) : (
              <dd className="col-sm-10">
                {" "}
                <b>Endast admin kan se vem som lånat böcker</b>
              </dd>
            )}
          </dl>
        ) : (
          <p> Ej utlånad</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
export default DetailPage;
