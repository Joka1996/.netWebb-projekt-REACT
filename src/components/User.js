import React, { Component } from "react";
//api url
import { EndPoints } from "./EndPoints";

export class User extends Component {
  //constructor
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      modalTitle: "",
      user_Name: "",
      userId: 0,
    };
  }
  //hämta användare
  refreshList() {
    fetch(EndPoints.API_URL + "Users")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ users: data });
      });
  }
  //kör hämta
  componentDidMount() {
    this.refreshList();
  }

  //hämta value
  changeUser_Name = (e) => {
    this.setState({ user_Name: e.target.value });
  };
  //modal add
  addClick() {
    this.setState({
      modalTitle: "Lägg till användare",
      userId: 0,
      user_Name: "",
    });
  }
  //modal update-ruta
  editClick(usr) {
    this.setState({
      modalTitle: "Uppdatera användare",
      userId: usr.userId,
      user_Name: usr.user_Name,
    });
  }
  //lägg till användare
  createClick() {
    fetch(EndPoints.API_URL + "Users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_Name: this.state.user_Name,
      }),
    })
      .then((response) => response.json())
      .then(
        (result) => {
          console.log(result);
          alert(result.user_Name + " är tillagd");
          //ladda om listan
          this.refreshList();
        },
        (error) => {
          alert("fel");
        }
      );
  }
  //uppdatera användare
  updateClick(id) {
    fetch(EndPoints.API_URL + "Users/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Response: "response",
      },
      body: JSON.stringify({
        userId: this.state.userId,
        user_Name: this.state.user_Name,
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
          alert("FEL");
        }
      );
  }

  //ta bort användare
  deleteClick(id) {
    if (window.confirm("Är du säker?")) {
      fetch(EndPoints.API_URL + "Users/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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
            alert("Fel");
          }
        );
    }
  }
  /*******************RENDER************************* ********************************************/

  render() {
    //this state
    const { users, modalTitle, userId, user_Name } = this.state;
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary m-2 float-end"
          data-bs-toggle="modal"
          data-bs-target="#modalUser"
          onClick={() => this.addClick()}
        >
          Lägg till användare
        </button>
        <h3>Användare</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Användar-id</th>
              <th>Användar-namn</th>
              <th>Alternativ</th>
            </tr>
          </thead>
          <tbody>
            {users.map((usr) => (
              <tr key={usr.userId}>
                <td>{usr.userId}</td>
                <td>{usr.user_Name}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#modalUser"
                    onClick={() => this.editClick(usr)}
                  >
                    Uppdatera
                  </button>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => this.deleteClick(usr.userId)}
                  >
                    Radera
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/**modaaaaaal */}
        <div className="modal fade" id="modalUser" tabIndex="-1" role="dialog">
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
                  <span className="input-group-text">Användare</span>
                  <input
                    type="text"
                    className="form-control"
                    value={user_Name}
                    onChange={this.changeUser_Name}
                  ></input>
                </div>
                {userId === 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.createClick()}
                  >
                    Skapa
                  </button>
                ) : null}
                {userId !== 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.updateClick(userId)}
                  >
                    Skapa
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
