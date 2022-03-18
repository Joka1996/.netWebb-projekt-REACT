import { EndPoints } from "./EndPoints";
import React, { useState, useEffect, Component } from "react";
import { Link } from "react-router-dom";
import { Footer } from "./Footer";

function LoginUser() {
  //let navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userPass, setUserPass] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState();

  useEffect(() => {
    //kolla om användare är lagrad i localstorage
    const loggedIn = localStorage.getItem("user");
    if (loggedIn) {
      const foundUser = JSON.parse(loggedIn);
      setUser(foundUser);
      console.log(setUser(loggedIn));
    } else {
      loginUser();
    }
  }, []);
  //utloggning
  const handleLogout = () => {
    setUser({});
    setUserName("");
    setUserPass("");
    localStorage.clear();
    window.alert("Utloggad");
    //ladda om sidan
    window.location.reload(false);
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const user = { userName, userPass };
    //detta är kanske inte den bästa lösningen för inlogg då det syns i konsolen...
    fetch(
      EndPoints.API_URL +
        "Users/login?userName=" +
        user.userName +
        "&userPass=" +
        user.userPass,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Response: "response",
        },
        body: JSON.stringify(user),
      }
    ).then((response) => {
      //skriv ut olika svar
      if (response.status === 200) {
        console.log("inloggad");
        setMessage("Inloggad!");
        //spara till localStorage
        setUser(user.userName);
        localStorage.setItem("user", JSON.stringify(user.userName));
        //ladda om sidan så att logga in -> logga ut och att profil-sidan dyker upp.
        window.location.reload(false);
      }
      if (response.status === 404) {
        console.log("fel");
        setMessage("FEL!");
      }
    });
  };
  // Om användaren är inloggad visas denna för att logga ut
  if (user) {
    return (
      <div className="App">
        <main>
          <div className="text-center text-lg-start mt-4 pt-2">
            <h2>Inloggad som: {user}</h2>
            <button className="btn btn-primary btn-lg" onClick={handleLogout}>
              Logga ut
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  return (
    <div className="App">
      <main>
        <div>
          <h2>Inloggning</h2>
          <p>{message}</p>
          <p></p>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={loginUser}>
              <div className="input-group mb-3">
                <label className="input-group-text">Användare:</label>
                <input
                  type="text"
                  name=""
                  id=""
                  className="form-control"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <label className="input-group-text">Lösenord:</label>
                <input
                  type="password"
                  className="form-control"
                  value={userPass}
                  onChange={(e) => setUserPass(e.target.value)}
                ></input>
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <button className="btn btn-primary btn-lg">Logga in</button>
              </div>
            </form>
            <div>
              <hr></hr>
              <p>
                Inget konto?{" "}
                <Link to={"/registerUser"}> Registrera dig här!</Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default LoginUser;
