import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { EndPoints } from "./EndPoints";
//useParams(hooks) fungerar ej med class, så får bli en funktion
function DetailPage() {
  const { book_id } = useParams();

  //console.log(book_id);
  //kör på funktionen
  useEffect(() => {
    refreshList();
  }, []);

  //ska skrivas ut med state
  const [book, setBooks] = useState({});

  //hämta boken
  const refreshList = async () => {
    const fetchBook = await fetch(EndPoints.API_URL + "Books/" + book_id);
    const book = await fetchBook.json();
    setBooks(book);
    //console.log(book.book_Title); //test
  };

  return (
    <div className="App">
      <h3>Detaljer</h3>
      <div className="container">
        <h4> {book.book_Title}</h4>
        <dl className="row">
          <dt className="col-sm-2">Författare:</dt>
          <dd className="col-sm-10">{book.author}</dd>
          <dt className="col-sm-2">Kategori:</dt>
          <dd className="col-sm-10">{book.category}</dd>
          <dt className="col-sm-2">Antal sidor:</dt>
          <dd className="col-sm-10">{book.book_Pages}</dd>
          <dt className="col-sm-2">Omslag:</dt>
          <dd className="col-sm-10">{book.book_ImageUrl}</dd>
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
            <dd className="col-sm-10">{book.user}</dd>
          </dl>
        ) : (
          <p>Detta fält visas endast om boken är utlånad</p>
        )}
      </div>
    </div>
  );
}
export default DetailPage;
