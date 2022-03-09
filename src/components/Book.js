import React, { Component } from "react";
import { Link } from "react-router-dom";
import { EndPoints } from "./EndPoints";

export class Book extends Component {
  //constructor
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      authors: [],
      users: [],
      books: [],
      modalTitle: "",
      bookId: 0,
      book_Title: "",
      book_Pages: 0,
      book_ImageUrl: "",
      book_Rented: false,
      book_TimeRented: "",
      user: "",
      author: "",
      category: "",
    };
  }
  //hämta böcker, författare, användare och kategorier. placera i select dropdown
  refreshList() {
    //Författare
    fetch(EndPoints.API_URL + "Authors")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ authors: data });
      });
    //Kategorier
    fetch(EndPoints.API_URL + "Categories")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ categories: data });
      });

    //Användare
    fetch(EndPoints.API_URL + "Users")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ users: data });
      });
    //böcker
    fetch(EndPoints.API_URL + "Books")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ books: data });
      });
  }
  //kör hämta
  componentDidMount() {
    this.refreshList();
  }
  //En enskild för varje state
  changeBook_Title = (e) => {
    this.setState({
      book_Title: e.target.value,
    });
  };
  changeBook_Page = (e) => {
    this.setState({
      book_Pages: e.target.value,
    });
  };
  changeBook_ImageUrl = (e) => {
    this.setState({
      book_ImageUrl: e.target.value,
    });
  };

  changeBook_Rented = (e) => {
    this.setState({
      book_Rented: e.target.value,
    });
  };
  changeBook_TimeRented = (e) => {
    this.setState({
      book_TimeRented: e.target.value,
    });
  };
  changeBook_User = (e) => {
    this.setState({
      user: e.target.value,
    });
  };
  changeBook_Author = (e) => {
    this.setState({
      author: e.target.value,
    });
  };
  changeBook_Category = (e) => {
    this.setState({
      category: e.target.value,
    });
  };
  //modal window add
  addClick() {
    this.setState({
      modalTitle: "Lägg till ny bok",
      bookId: 0,
      book_Title: "",
      book_Pages: 0,
      book_ImageUrl: "",
      book_Rented: "",
      book_TimeRented: "",
      user: "",
      author: "",
      category: "",
    });
  }
  //modal update
  editClick(bok) {
    this.setState({
      modalTitle: "Uppdatera bok",
      bookId: bok.bookId,
      book_Title: bok.book_Title,
      book_Pages: bok.book_Pages,
      book_ImageUrl: bok.book_ImageUrl,
      book_Rented: bok.book_Rented,
      book_TimeRented: bok.book_TimeRented,
      user: bok.user,
      author: bok.author,
      category: bok.category,
    });
  }
  //lägg till bok
  createClick() {
    //returnera true eller false
    const convert = this.state.book_Rented;
    function stringToBoolean(convert) {
      if (convert === "true") {
        return true;
      } else {
        return false;
      }
    }
    fetch(EndPoints.API_URL + "Books", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        book_Title: this.state.book_Title,
        book_Pages: this.state.book_Pages,
        book_ImageUrl: this.state.book_ImageUrl,
        book_Rented: stringToBoolean(convert),
        book_TimeRented: this.state.book_TimeRented,
        user: this.state.user,
        author: this.state.author,
        category: this.state.category,
      }),
    })
      .then((response) => response.json())
      .then(
        (result) => {
          console.log(result);
          alert("Tillagd");
          //uppdatera listan
          this.refreshList();
        },
        (error) => {
          alert("fel");
        }
      );
  }
  //ta bort bok
  deleteClick(id) {
    //kontrollera
    if (window.confirm("Är du säker?")) {
      fetch(EndPoints.API_URL + "Books/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Resonse: "response",
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
            alert("Fel");
          }
        );
    }
  }
  //uppdatera bok
  updateClick(id) {
    //returnera true eller false
    const convert = this.state.book_Rented;
    function stringToBoolean(convert) {
      if (convert === "true") {
        return true;
      } else {
        return false;
      }
    }
    fetch(EndPoints.API_URL + "Books/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Response: "response",
      },
      body: JSON.stringify({
        bookId: this.state.bookId,
        book_Title: this.state.book_Title,
        book_Pages: this.state.book_Pages,
        book_ImageUrl: this.state.book_ImageUrl,
        book_Rented: stringToBoolean(convert),
        book_TimeRented: this.state.book_TimeRented,
        user: this.state.user,
        author: this.state.author,
        category: this.state.category,
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
          console.log(error + "fel");
        }
      );
  }
  /*******************RENDER************************* ********************************************/
  render() {
    const {
      books,
      authors,
      categories,
      users,
      modalTitle,
      bookId,
      book_Title,
      book_Pages,
      book_ImageUrl,
      book_Rented,
      book_TimeRented,
      author,
      category,
      user,
    } = this.state;
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary m-2 float-end"
          data-bs-toggle="modal"
          data-bs-target="#modalBook"
          onClick={() => this.addClick()}
        >
          Lägg till bok
        </button>
        <h3>Bok page</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Titel</th>
              <th>Kategori</th>
              <th>Utlånad?</th>
              <th>Detaljer</th>
              <th>Alternativ</th>
            </tr>
          </thead>
          <tbody>
            {books.map((bok) => (
              <tr key={bok.bookId}>
                <td>{bok.book_Title}</td>
                <td>{bok.category}</td>
                {/**om boken är utlånad = icheckad box */}
                {bok.book_Rented === true ? (
                  <td>
                    {" "}
                    <input
                      type="checkbox"
                      checked="checked"
                      disabled
                      aria-disabled="true"
                    ></input>
                  </td>
                ) : (
                  <td>
                    <input
                      type="checkbox"
                      checked=""
                      disabled
                      aria-disabled="true"
                    ></input>
                  </td>
                )}
                <td>
                  <button className="btn btn-light mr-1">
                    <Link to={`/detailpage/${bok.bookId}`}>Detajer</Link>
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#modalBook"
                    aria-label="uppdatera bok"
                    onClick={() => this.editClick(bok)}
                  >
                    Uppdatera
                  </button>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    aria-label="radera bok"
                    onClick={() => this.deleteClick(bok.bookId)}
                  >
                    Radera
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/**modaaal windooowww */}
        <div
          className="modal fade"
          id="modalBook"
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
                  <span className="input-group-text">Titel</span>
                  <input
                    type="text"
                    className="form-control"
                    value={book_Title}
                    onChange={this.changeBook_Title}
                  ></input>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">Författare</span>
                  <select
                    className="form-select"
                    value={author}
                    onChange={this.changeBook_Author}
                  >
                    <option className="d-none">Välj författare</option>
                    {authors.map((aut) => (
                      <option key={aut.authorId}>{aut.author_Name}</option>
                    ))}
                  </select>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">Kategori</span>
                  <select
                    className="form-select"
                    onChange={this.changeBook_Category}
                    value={category}
                  >
                    <option className="d-none">Välj kategori</option>
                    {categories.map((cat) => (
                      <option key={cat.categoryId}>{cat.category_Name}</option>
                    ))}
                  </select>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">Antal sidor</span>
                  <input
                    type="text"
                    className="form-control"
                    value={book_Pages}
                    onChange={this.changeBook_Page}
                  ></input>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">Bild</span>
                  <input
                    type="text"
                    className="form-control"
                    value={book_ImageUrl}
                    onChange={this.changeBook_ImageUrl}
                  ></input>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">Utlånad?</span>
                  <select
                    className="form-control"
                    value={book_Rented}
                    onChange={this.changeBook_Rented}
                  >
                    <option className="d-none">Välj alternativ</option>
                    <option value="true">Ja</option>
                    <option value="false">Nej</option>
                  </select>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">Utlånad till:</span>
                  <select
                    className="form-select"
                    onChange={this.changeBook_User}
                    value={user}
                  >
                    <option className="d-none">Välj användare</option>
                    <option label="">Ej utlånad</option>
                    {users.map((usr) => (
                      <option key={usr.userId}>{usr.user_Name}</option>
                    ))}
                  </select>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">Datum utlånad:</span>
                  <input
                    label=""
                    type="datetime-local"
                    className="form-control"
                    value={book_TimeRented}
                    onChange={this.changeBook_TimeRented}
                  ></input>
                </div>

                {bookId === 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.createClick()}
                  >
                    Skapa
                  </button>
                ) : null}
                {bookId !== 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.updateClick(bookId)}
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
