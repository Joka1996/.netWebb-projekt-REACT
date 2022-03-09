import React, { Component } from "react";
import { Category } from "./Category";
import { Link } from "react-router-dom";

import { EndPoints } from "./EndPoints";
export class Author extends Component {
  //constructor
  constructor(props) {
    super(props);

    this.state = {
      authors: [],
      modalTitle: "",
      author_Name: "",
      author_books: "",
      authorId: 0,
    };
  }

  //Hämta
  refreshList() {
    fetch(EndPoints.API_URL + "Authors")
      .then((response) => response.json())
      .then((data) => {
        //fyll authors-arrayen.
        this.setState({ authors: data });
      });
  }

  //kör
  componentDidMount() {
    this.refreshList();
  }
  changeAuthor_Name = (e) => {
    this.setState({ author_Name: e.target.value });
  };

  //till modal window vid klick på lägg till
  addClick() {
    this.setState({
      modalTitle: "Lägg till författare",
      authorId: 0,
      author_Name: "",
    });
  }

  //skicka till modal-fönstres
  editClick(aut) {
    this.setState({
      modalTitle: "Uppdatera författare",
      authorId: aut.authorId,
      author_Name: aut.author_Name,
    });
  }

  //lägg till
  createClick() {
    fetch(EndPoints.API_URL + "Authors", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author_Name: this.state.author_Name,
      }),
    })
      .then((response) => response.json())
      .then(
        (result) => {
          console.log(result);
          alert(result.author_Name + " är tillagd");
          this.refreshList();
        },
        (error) => {
          alert("fel");
        }
      );
  }
  //uppdatera
  updateClick(id) {
    fetch(EndPoints.API_URL + "Authors/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Response: "response",
      },
      //ersätt med det nya namnet, samma id
      body: JSON.stringify({
        authorId: this.state.authorId,
        author_Name: this.state.author_Name,
      }),
    })
      .then((response) => {
        response.json();
      })
      .then(
        (result) => {
          console.log(result);
          alert("Uppdaterad");
          this.refreshList();
        },
        (error) => {
          alert("fel");
        }
      );
  }
  //ta bort
  deleteClick(id) {
    //kontroll
    if (window.confirm("Är du säker?")) {
      fetch(EndPoints.API_URL + "Authors/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "acpplication/json",
          Response: "response",
        },
      })
        .then((response) => {
          response.json();
        })
        .then(
          (result) => {
            console.log(result);
            this.refreshList();
          },
          (error) => {
            alert("fel");
          }
        );
    }
  }

  /*******************RENDER*********************************************************************/
  //samma layout som för kategorier
  render() {
    const { authors, modalTitle, authorId, author_Name } = this.state;
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary m-2 float-end"
          data-bs-toggle="modal"
          data-bs-target="#modalAuthor"
          onClick={() => this.addClick()}
        >
          Lägg till ny författare
        </button>
        <h3>Författare</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Författare-id</th>
              <th>Författare-namn</th>
              <th>Alternativ</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((aut) => (
              <tr key={aut.authorId}>
                <td>{aut.authorId}</td>
                <td>{aut.author_Name}</td>
                <td>
                  <button className="btn btn-light mr-1">
                    <Link to={`/authordetail/${aut.authorId}`}>Detajer</Link>
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#modalAuthor"
                    onClick={() => this.editClick(aut)}
                  >
                    Uppdatera
                  </button>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => this.deleteClick(aut.authorId)}
                  >
                    Radera
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/**modal window.. igen */}
        <div
          className="modal fade"
          id="modalAuthor"
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
                  <span className="input-group-text"> Författare </span>
                  <input
                    type="text"
                    className="form-control"
                    value={author_Name}
                    onChange={this.changeAuthor_Name}
                  ></input>
                </div>

                {authorId === 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.createClick()}
                  >
                    Skapa
                  </button>
                ) : null}
                {authorId !== 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.updateClick(authorId)}
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
