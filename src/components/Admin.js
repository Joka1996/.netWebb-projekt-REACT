import { EndPoints } from "./EndPoints";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Admin() {
  let navigate = useNavigate();

  const [admin, setAdmin] = useState("");
  const [pass, setPass] = useState("");
  //gör en koll om användaren är inloggad
  useEffect(() => {
    const loggedIn = localStorage.getItem("admin");
    if (loggedIn) {
      const foundAdmin = JSON.parse(loggedIn);
      setAdmin(foundAdmin);
    } else {
      loginAdmin();
    }
  }, []);

  const loginAdmin = async (e) => {
    e.preventDefault();
    const admin = { admin, pass };
    await fetch(EndPoints.API_URL + "Admins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(admin),
    }).then((res) => {
      if (res.status === 200) {
        console.log("inloggad");
        setAdmin(admin.admin_Name);
        localStorage.setItem("admin", JSON.stringify(admin.admin_Name));
      }
      if (res.status === 400) {
        console.log("fel lösen");
      }
      if (res.status === 401) {
        console.log("användare saknas");
      }
    });
  };
  return (
    <div className="App">
      <div>
        <h3>Inloggning</h3>
        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <form>
            <div className="input-group mb-3">
              <span className="input-group-text">Admin:</span>
              <input
                type="text"
                className="form-control"
                value={admin}
                onChange={(e) => setAdmin(e.target.value)}
              ></input>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Lösenord:</span>
              <input
                type="password"
                className="form-control"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              ></input>
            </div>
            <div className="text-center text-lg-start mt-4 pt-2">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={loginAdmin}
              >
                Logga in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Admin;
