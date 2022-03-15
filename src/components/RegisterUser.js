import React, { Component } from "react";
//api url
import { EndPoints } from "./EndPoints";
import { Footer } from "./Footer";
export class RegisterUser extends Component {
  //constructor
  constructor(props) {
    super(props);
    this.state = {
      user_Name: "",
      user_Password: "",
      userId: 0,
      user: "",
    };
  }

  //hämta value
  changeUser_Name = (e) => {
    this.setState({ user_Name: e.target.value });
  };
  changeUser_Password = (e) => {
    this.setState({ user_Password: e.target.value });
  };

  //lägg till användare
  createClick() {
    fetch(EndPoints.API_URL + "Users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Response: "response",
      },
      body: JSON.stringify({
        user_Name: this.state.user_Name,
        user_Password: this.state.user_Password,
      }),
    })
      .then((response) => response.json())
      .then(
        (result) => {
          console.log(result);
          alert(result.user_Name + " är tillagd");
        },
        (error) => {
          alert("fel");
        }
      );
  }
  /*******************RENDER************************* ********************************************/

  render() {
    //this state
    const { user_Name, user_Password, user } = this.state;
    return (
      <div className="App">
        <div>
          <h3>Registrera</h3>
          <div
            className="col-md-8 col-lg-6 col-xl-4 offset-xl-1"
            aria-label="Registrera konto"
          >
            <div className="input-group mb-3">
              <label className="input-group-text" aria-label="Användarnamn">
                Användarnamn:
              </label>
              <input
                type="text"
                value={user_Name}
                onChange={this.changeUser_Name}
                className="form-control"
              ></input>
            </div>
            <div className="input-group mb-3">
              <label className="input-group-text" aria-label="Lösenord">
                Lösenord:
              </label>
              <input
                type="password"
                className="form-control"
                value={user_Password}
                onChange={this.changeUser_Password}
              ></input>
            </div>
            <div className="text-center text-lg-start mt-4 pt-2">
              <button
                className="btn btn-success btn-lg"
                aria-label="Skapa"
                type="button"
                onClick={() => this.createClick()}
              >
                Skapa
              </button>
            </div>
            <div></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
