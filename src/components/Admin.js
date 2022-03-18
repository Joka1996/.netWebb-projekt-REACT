import { EndPoints } from "./EndPoints";
import React, { useState, useEffect, Component } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Footer } from "./Footer";
function Login() {
  //let navigate = useNavigate();
  const [adminName, setAdminName] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [message, setMessage] = useState("");
  const [admin, setAdmin] = useState();

  useEffect(() => {
    //kolla om admin är lagrad i localstorage
    const loggedIn = localStorage.getItem("admin");
    if (loggedIn) {
      const foundUser = JSON.parse(loggedIn);
      setAdmin(foundUser);
      console.log(setAdmin(loggedIn));
    } else {
      loginAdmin();
    }
  }, []);
  //utloggning
  const handleLogout = () => {
    setAdmin({});
    setAdminName("");
    setAdminPass("");
    localStorage.clear();
    window.alert("Utloggad");
    //ladda om sidan
    window.location.reload(false);
  };

  const loginAdmin = async (e) => {
    e.preventDefault();
    const admin = { adminName, adminPass };
    //detta är kanske inte den bästa lösningen för inlogg då det syns i konsolen...
    fetch(
      EndPoints.API_URL +
        "Admins/login?adminName=" +
        admin.adminName +
        "&adminPass=" +
        admin.adminPass,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Response: "response",
        },
        body: JSON.stringify(admin),
      }
    ).then((response) => {
      //skriv ut olika svar
      if (response.status === 200) {
        console.log("inloggad");
        setMessage("Inloggad!");
        //spara till localStorage
        setAdmin(admin.adminName);
        localStorage.setItem("admin", JSON.stringify(admin.adminName));
      }
      if (response.status === 404) {
        console.log("fel");
        setMessage("FEL!");
      }
    });
  };
  //om admin redan är inloggad
  if (admin) {
    return (
      <div className="App">
        <main>
          <div className="text-center text-lg-start mt-4 pt-2">
            <h2>Inloggad som administratör: {admin}</h2>
            <p>
              {" "}
              Som administratör kan du lägga till nya böcker, kategorier,
              författare och användare. En boks omslag läggs till som URL med
              exempelvis postimages.org
            </p>
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
            <form onSubmit={loginAdmin}>
              <div className="input-group mb-3">
                <label className="input-group-text">Admin:</label>
                <input
                  type="text"
                  name=""
                  id=""
                  className="form-control"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <label className="input-group-text">Lösenord:</label>
                <input
                  type="password"
                  className="form-control"
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                ></input>
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <button className="btn btn-primary btn-lg">Logga in</button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Login;
