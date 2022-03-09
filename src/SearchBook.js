import React, { Component } from "react";
import { EndPoints } from "./components/EndPoints";

export class SearchBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: [],
      search: "",
    };
  }

  refreshList(search) {
    fetch(EndPoints.API_URL + "Books/search?searchString=" + search)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ book: data });
      });
  }
  /*componentDidMount() {
    this.refreshList();
  }*/
  change_search = (e) => {
    this.setState({
      search: e.target.value,
      loading: true,
      message: "",
    });
  };
  render() {
    const { book, search } = this.state;
    console.log(book);
    console.log(search);
    return (
      <div>
        <h3>Sök efter bok på titel</h3>
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
            className="btn btn-outline-primary"
            aria-label="sök"
            onClick={() => this.refreshList(search)}
          >
            Sök
          </button>
        </div>
        <h2>resultat</h2>

        {book.map((bok) => (
          <div>
            <dl className="row">
              <dt className="col-sm-2">Titel:</dt>
              <dd className="col-sm-10"> {bok.book_Title}</dd>
              <dt className="col-sm-2">Författare:</dt>
              <dd className="col-sm-10">{bok.author}</dd>
              <dt className="col-sm-2">Kategori:</dt>
              <dd className="col-sm-10">{bok.category}</dd>
              <dt className="col-sm-2">Antal sidor:</dt>
              <dd className="col-sm-10">{bok.book_Pages}</dd>
              <dt className="col-sm-2">Omslag:</dt>
              <dd className="col-sm-10">{bok.book_ImageUrl}</dd>
            </dl>

            <h4>Utlåning</h4>
            {/*visa bara utlåning om boken är utlånad */}
            {bok.book_Rented === true ? (
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
                <dd className="col-sm-10">{bok.book_TimeRented}</dd>
                <dt className="col-sm-2">Lånad av:</dt>
                <dd className="col-sm-10">{bok.user}</dd>
              </dl>
            ) : (
              <p>Detta fält visas endast om boken är utlånad</p>
            )}
          </div>
        ))}
      </div>
    );
  }
}
