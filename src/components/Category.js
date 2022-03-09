import React, { Component, useState, useEffect } from "react";
import { EndPoints } from "./EndPoints";
import { Link } from "react-router-dom";

export class Category extends Component {
  //constructor
  constructor(props) {
    super(props);

    this.state = {
      //tom array för innehåll
      categories: [],
      //modal windows
      modalTitle: "",
      category_Name: "",
      //int
      categoryId: 0,
    };
  }
  //hämta kategorier,
  refreshList() {
    fetch(EndPoints.API_URL + "Categories")
      .then((response) => response.json())
      .then((data) => {
        //kategoriena placeras i arrayen
        this.setState({ categories: data });
      });
  }
  //kör refreshlist
  componentDidMount() {
    this.refreshList();
  }
  //hämta value
  changeCategory_Name = (e) => {
    this.setState({ category_Name: e.target.value });
  };
  //öppna modal window
  addClick() {
    this.setState({
      modalTitle: "Lägg till kategori",
      categoriesId: 0,
      category_Name: "",
    });
  }
  //uppdatera. SKickar till modal window, titel och fyller i id och kategori på det som ska uppdateras
  editClick(cat) {
    this.setState({
      modalTitle: "Uppdatera kategori",
      categoryId: cat.categoryId,
      category_Name: cat.category_Name,
    });
  }

  //POST ny kategori
  createClick() {
    fetch(EndPoints.API_URL + "Categories", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category_Name: this.state.category_Name,
      }),
    })
      .then((response) => response.json())
      .then(
        (result) => {
          console.log(result);
          //alert för nu, ska nog vara något annat egentligen.
          alert(result.category_Name + " är tillagd");
          this.refreshList();
        },
        (error) => {
          alert(error + " Fel uppstod");
        }
      );
  }
  //PUT i kategori
  updateClick(id) {
    fetch(EndPoints.API_URL + "Categories/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Response: "response",
      },
      //ersätt med
      body: JSON.stringify({
        categoryId: this.state.categoryId,
        category_Name: this.state.category_Name,
      }),
    })
      .then((response) => {
        //ta bort denna log
        console.log("Resopnse:", response);
        response.json();
      })
      .then(
        (result) => {
          console.log(result);
          //alert för nu, ska nog vara något annat egentligen.
          alert("uppdaterad");
          //uppdatera listan
          this.refreshList();
          //tillfällig lösning på att uppdatera skriver över skapa knappen
          window.location.reload(false);
        },
        (error) => {
          alert(error + " Fel uppstod");
        }
      );
  }
  //Radera i kategori
  deleteClick(id) {
    //bekräfta
    if (window.confirm("Är du säker?")) {
      fetch(EndPoints.API_URL + "Categories/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Response: "response",
        },
      })
        .then((response) => {
          console.log("Resopnse:", response);
          response.json();
        })
        .then(
          (result) => {
            console.log(result);
            //alert(result);
            //uppdatera listan
            this.refreshList();
          },
          (error) => {
            alert(error + " Fel uppstod");
          }
        );
    }
  }

  /*******************RENDER************************* ********************************************/
  //skriv ut
  render() {
    //för att använda usestate
    const { categories, modalTitle, categoryId, category_Name } = this.state;
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary m-2 float-end"
          data-bs-toggle="modal"
          data-bs-target="#modalCategory"
          onClick={() => this.addClick()}
        >
          Lägg till en ny kategori
        </button>
        <h3>Kategorier</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Kategori-id</th>
              <th>Kategori-namn</th>
              <th>Alternativ</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.categoryId}>
                <td>{cat.categoryId}</td>
                <td>{cat.category_Name}</td>
                <td>
                  <button className="btn btn-light mr-1">
                    <Link to={`/categorydetail/${cat.categoryId}`}>
                      Detajer
                    </Link>
                  </button>
                </td>
                <td>
                  {/**skicka med cat (category) så att man kan plocka ut rätt id i funktionen editClick */}
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#modalCategory"
                    onClick={() => this.editClick(cat)}
                  >
                    {" "}
                    Uppdatera
                  </button>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => this.deleteClick(cat.categoryId)}
                  >
                    {" "}
                    Radera
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/*bootstrap modle-window*/}
        <div
          className="modal fade"
          id="modalCategory"
          tabIndex="-1"
          aria-hidden="true"
          role="dialog"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text">Kategori</span>
                  <input
                    type="text"
                    className="form-control"
                    value={category_Name}
                    onChange={this.changeCategory_Name}
                  ></input>
                </div>

                {categoryId === 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.createClick()}
                  >
                    Skapa
                  </button>
                ) : null}
                {categoryId !== 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.updateClick(categoryId)}
                  >
                    Uppdatera
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
