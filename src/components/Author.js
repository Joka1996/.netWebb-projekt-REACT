import React, { Component } from "react";
import { Category } from "./Category";
import { Link } from "react-router-dom";
import { Footer } from "./Footer";
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
      admin: "",
      message: "",
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
  //kolla local storage och placera den i state.
  storage() {
    const getAdmin = localStorage.getItem("admin");
    const admin = JSON.parse(getAdmin);
    console.log(admin);
    this.setState({ admin: admin });
  }

  //kör
  componentDidMount() {
    this.refreshList();
    //localStorage
    this.storage();
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
          this.setState({ message: result.author_Name + " är tillagd" });

          this.refreshList();
        },
        (error) => {
          console.log(error);
          this.setState({ message: "Något gick fel!" });
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
          //console.log(result);
          this.setState({ message: result.author_Name + " är uppdaterad!" });
          this.refreshList();
        },
        (error) => {
          console.log(error);
          this.setState({ message: "Något gick fel!" });
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
    const { authors, modalTitle, authorId, author_Name, admin, message } =
      this.state;
    return (
      <div>
        <main>
          {admin != null ? (
            <button
              type="button"
              className="btn btn-success m-2 float-end"
              data-bs-toggle="modal"
              data-bs-target="#modalAuthor"
              onClick={() => this.addClick()}
            >
              Lägg till ny författare
            </button>
          ) : null}

          <h2 className="d-flex justify-content-center m-3">Författare</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Författare</th>

                <th>Alternativ</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((aut) => (
                <tr key={aut.authorId}>
                  <td>{aut.author_Name}</td>
                  <td>
                    <button className="btn btn-info mr-1 btn-sm">
                      <Link
                        className="link-dark"
                        to={`/authordetail/${aut.authorId}`}
                      >
                        Detajer
                      </Link>
                    </button>

                    {admin != null ? (
                      <button
                        type="button"
                        className="btn btn-warning mr-1 btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#modalAuthor"
                        onClick={() => this.editClick(aut)}
                      >
                        Uppdatera
                      </button>
                    ) : (
                      <p>Admin</p>
                    )}
                    {admin != null ? (
                      <button
                        type="button"
                        className="btn btn-danger mr-1 btn-sm"
                        onClick={() => this.deleteClick(aut.authorId)}
                      >
                        Radera
                      </button>
                    ) : null}
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
                    <label className="input-group-text"> Författare </label>
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
                      className="btn btn-success float-start"
                      onClick={() => this.createClick()}
                    >
                      Skapa
                    </button>
                  ) : null}
                  {authorId !== 0 ? (
                    <button
                      type="button"
                      className="btn btn-warning float-start"
                      onClick={() => this.updateClick(authorId)}
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
