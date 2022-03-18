import React, { Component } from "react";
import { EndPoints } from "./EndPoints";
import { Footer } from "./Footer";
export class SearchBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: [],
      search: "",
      admin: "",
    };
  }

  refreshList(search) {
    fetch(EndPoints.API_URL + "Books/search?searchString=" + search)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ book: data });
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
    this.storage();
  }
  change_search = (e) => {
    this.setState({
      search: e.target.value,
      loading: true,
      message: "",
    });
  };
  render() {
    const { book, search, admin } = this.state;
    //console.log(book); //test
    //console.log(search);
    return (
      <div className="App container">
        <main>
          <h2>Sök efter bok på titel</h2>
          <div className="input-group">
            <input
              type="search"
              className="form-control rounded"
              placeholder="Sök efter titel.."
              name="search"
              aria-label="Sök efter titel"
              aria-describedby="search-addon"
              value={search}
              onChange={this.change_search}
            />
            <button
              type="button"
              className="btn btn-info"
              aria-label="sök"
              onClick={() => this.refreshList(search)}
            >
              Sök
            </button>
          </div>
          <p>OBS: Sök-funktionen är känslig för stor/liten bokstav</p>
          <h3>Resultat</h3>
          {book.map((bok) => (
            <div>
              <dl className="row dl-striped bg-light">
                <dt className="col-sm-2">Titel:</dt>
                <dd className="col-sm-10"> {bok.book_Title}</dd>
                <dt className="col-sm-2">Författare:</dt>
                <dd className="col-sm-10">{bok.author}</dd>
                <dt className="col-sm-2">Kategori:</dt>
                <dd className="col-sm-10">{bok.category}</dd>
                <dt className="col-sm-2">Antal sidor:</dt>
                <dd className="col-sm-10">{bok.book_Pages}</dd>
                <dt className="col-sm-2">Betyg:</dt>
                <dd className="col-sm-10">{bok.book_Rating}/5</dd>
                <dt className="col-sm-2">Omslag:</dt>
                <dd className="col-sm-10">
                  <img
                    className="img-thumbnail img-responsive "
                    src={bok.book_ImageUrl}
                    alt={bok.Book_ImageUrl}
                  ></img>
                </dd>
              </dl>

              <h3>Utlåning</h3>
              {/*visa bara utlåning om boken är utlånad */}
              {bok.book_Rented === true ? (
                <dl className="row dl-striped bg-light">
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
                  <dd className="col-sm-10">{bok.book_TimeRented}</dd>
                  <dt className="col-sm-2">Lånad av:</dt>
                  {admin != null ? (
                    <dd className="col-sm-10">{bok.user}</dd>
                  ) : (
                    <dd className="col-sm-10">
                      {" "}
                      <b>Endast admin kan se vem som lånat böcker</b>
                    </dd>
                  )}
                </dl>
              ) : (
                <p>Ej utlånad</p>
              )}
              <hr></hr>
            </div>
          ))}
        </main>
        <Footer />
      </div>
    );
  }
}
