import React, { Component } from "react";
//api url
import { EndPoints } from "./EndPoints";
import { Footer } from "./Footer";
export class User extends Component {
  //constructor
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      modalTitle: "",
      user_Name: "",
      user_Password: "",
      userId: 0,
      admin: "",
      message: "",
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
  //kolla local storage och placera den i state.
  storage() {
    const getAdmin = localStorage.getItem("admin");
    const admin = JSON.parse(getAdmin);
    console.log(admin);
    this.setState({ admin: admin });
  }
  //kör hämta
  componentDidMount() {
    this.refreshList();
    this.storage();
  }

  //hämta value
  changeUser_Name = (e) => {
    this.setState({ user_Name: e.target.value });
  };
  changeUser_Password = (e) => {
    this.setState({ user_Password: e.target.value });
  };
  //modal add
  addClick() {
    this.setState({
      modalTitle: "Lägg till användare",
      userId: 0,
      user_Name: "",
      user_Password: "",
    });
  }
  //modal update-ruta
  editClick(usr) {
    this.setState({
      modalTitle: "Uppdatera användare",
      userId: usr.userId,
      user_Name: usr.user_Name,
      user_Password: usr.user_Password,
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
        user_Password: this.state.user_Password,
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
          console.log(error);
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
        user_Password: this.state.user_Password,
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
    const {
      users,
      modalTitle,
      userId,
      user_Name,
      user_Password,
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
              data-bs-target="#modalUser"
              onClick={() => this.addClick()}
            >
              Lägg till användare
            </button>
          ) : null}

          <h3 className="d-flex justify-content-center m-3">Användare</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Användare</th>
                <th>Alternativ</th>
              </tr>
            </thead>
            <tbody>
              {users.map((usr) => (
                <tr key={usr.userId}>
                  <td>{usr.user_Name}</td>
                  <td>
                    {admin != null ? (
                      <button
                        type="button"
                        className="btn btn-warning mr-1 btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#modalUser"
                        onClick={() => this.editClick(usr)}
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
                        onClick={() => this.deleteClick(usr.userId)}
                      >
                        Radera
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/**modaaaaaal */}
          <div
            className="modal fade"
            id="modalUser"
            tabIndex="-1"
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
                <div
                  className="modal-body"
                  aria-label="Skapa användare-formulär"
                >
                  <p className="success">{message}</p>
                  <div className="input-group mb-3">
                    <label className="input-group-text">Användare:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={user_Name}
                      onChange={this.changeUser_Name}
                    ></input>
                  </div>

                  <div className="input-group mb-3">
                    <label className="input-group-text">Lösenord:</label>
                    <input
                      type="password"
                      className="form-control"
                      value={user_Password}
                      onChange={this.changeUser_Password}
                    ></input>
                  </div>

                  {userId === 0 ? (
                    <button
                      type="button"
                      className="btn btn-success float-start"
                      onClick={() => this.createClick()}
                    >
                      Skapa
                    </button>
                  ) : null}
                  {userId !== 0 ? (
                    <button
                      type="button"
                      className="btn btn-warning float-start"
                      onClick={() => this.updateClick(userId)}
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
