import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { EndPoints } from "./EndPoints";
import { Footer } from "./Footer";
//useParams(hooks) fungerar ej med class, så får bli en funktion
function CategoryDetail() {
  const { category_id } = useParams();

  //console.log(book_id);
  //kör funktionen
  useEffect(() => {
    refreshList();
  }, []);

  //ska skrivas ut med state
  const [category, setCategory] = useState({});
  //flera böcker sparas i array.
  const [books, setBooks] = useState([]);

  //hämta enskild författare och böcker personen skrivit
  const refreshList = async () => {
    const fetchCategory = await fetch(
      EndPoints.API_URL + "Categories/" + category_id
    );
    const category = await fetchCategory.json();
    setCategory(category);
    //console.log(category.category_Name);

    //böcker
    const fetchBooks = await fetch(
      EndPoints.API_URL +
        "Books/bookbycategory?category=" +
        category.category_Name
    );
    const books = await fetchBooks.json();
    //console.log(books);
    setBooks(books);
  };

  return (
    <div className="App">
      <h3>{category.category_Name}</h3>
      <div className="container">
        <h4> </h4>
        <dl className="row ">
          <dt className="col-sm-2">Böcker:</dt>
          <dd className="col-sm-10">
            <ul className="list-group">
              {books.map((bok) => (
                <li className="list-group-item" key={bok.book_Title}>
                  {bok.book_Title}
                </li>
              ))}
            </ul>
          </dd>
        </dl>
      </div>
      <Footer />
    </div>
  );
}
export default CategoryDetail;
