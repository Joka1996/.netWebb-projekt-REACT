import React, { Component, useState, useEffect } from "react";
import { EndPoints } from "./EndPoints";
import { Link } from "react-router-dom";
import { Footer } from "./Footer";

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
      admin: "",
      message: "",
    };
  }
  //kolla local storage och placera den i state.
  storage() {
    const getAdmin = localStorage.getItem("admin");
    const admin = JSON.parse(getAdmin);
    console.log(admin);
    this.setState({ admin: admin });
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
    this.storage();
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
          //console.log(result);
          this.setState({ message: result.category_Name + " är tillagd" });
          this.refreshList();
        },
        (error) => {
          this.setState({ message: "Något gick fel!" });
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
          this.setState({ message: "Uppdaterad!" });
          //uppdatera listan
          this.refreshList();
          //tillfällig lösning på att uppdatera skriver över skapa knappen
          window.location.reload(false);
        },
        (error) => {
          this.setState({ message: "Fel!" });
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
    const {
      categories,
      modalTitle,
      categoryId,
      category_Name,
      admin,
      message,
    } = this.state;
    return (
      <div>
        <main>
          {admin != null ? (
            <button
              type="button"
              className="btn btn-success m-2 float-end"
              data-bs-toggle="modal"
              data-bs-target="#modalCategory"
              onClick={() => this.addClick()}
            >
              Lägg till en ny kategori
            </button>
          ) : null}

          <h2 className="d-flex justify-content-center m-3">Kategorier</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Kategori</th>
                <th>Alternativ</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.categoryId}>
                  <td>{cat.category_Name}</td>
                  <td>
                    <button className="btn btn-info mr-1 btn-sm">
                      <Link
                        className="link-dark"
                        to={`/categorydetail/${cat.categoryId}`}
                      >
                        Detajer
                      </Link>
                    </button>

                    {admin != null ? (
                      <button
                        type="button"
                        className="btn btn-warning mr-1 btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#modalCategory"
                        onClick={() => this.editClick(cat)}
                      >
                        {" "}
                        Uppdatera
                      </button>
                    ) : (
                      <p>Admin</p>
                    )}
                    {admin != null ? (
                      <button
                        type="button"
                        className="btn btn-danger mr-1 btn-sm"
                        onClick={() => this.deleteClick(cat.categoryId)}
                      >
                        {" "}
                        Radera
                      </button>
                    ) : null}

                    {/**skicka med cat (category) så att man kan plocka ut rätt id i funktionen editClick */}
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
                  <p className="modal-title fs-5">{modalTitle}</p>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p className="success">{message}</p>
                  <div className="input-group mb-3">
                    <label className="input-group-text">Kategori</label>
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
                      className="btn btn-success float-start"
                      onClick={() => this.createClick()}
                    >
                      Skapa
                    </button>
                  ) : null}
                  {categoryId !== 0 ? (
                    <button
                      type="button"
                      className="btn btn-warning float-start"
                      onClick={() => this.updateClick(categoryId)}
                    >
                      Uppdatera
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}
