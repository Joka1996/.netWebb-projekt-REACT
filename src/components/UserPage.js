import React, { Component } from "react";
import { useState, useEffect } from "react";
import { EndPoints } from "./EndPoints";
import { Footer } from "./Footer";
//useParams(hooks) fungerar ej med class, så får bli en funktion
function UserPage() {
  //ska skrivas ut med state
  const [user, setUser] = useState();
  //böcker som array
  const [book, setBooks] = useState([]);

  //kör på funktionen
  useEffect(() => {
    checkStorage();
  }, []);

  const checkStorage = () => {
    const loggedIn = localStorage.getItem("user");
    if (loggedIn) {
      const foundUser = JSON.parse(loggedIn);
      setUser(foundUser);
      //skicka till fetch-funktionen
      refreshList(foundUser);
    }
  };

  //hämta boken
  const refreshList = async (foundUser) => {
    const fetchBook = await fetch(
      EndPoints.API_URL + "Books/bookbyuser?borrowed=" + foundUser
    );
    const book = await fetchBook.json();
    setBooks(book);
    //console.log(book); //test
  };

  return (
    <div className="App">
      <h2>{user}</h2>
      <div className="container">
        <dl className="row bg-light">
          <dt className="col-sm-2">Lånade böcker:</dt>
          {book.map((bok) =>
            bok.length > 0 ? (
              <dd className="col-sm-10" key={bok.book_Title}>
                Ingen bok lånad
              </dd>
            ) : (
              <dd className="col-sm-10" key={bok.book_Title}>
                {bok.book_Title}
              </dd>
            )
          )}
        </dl>
      </div>
      <Footer />
    </div>
  );
}
export default UserPage;
