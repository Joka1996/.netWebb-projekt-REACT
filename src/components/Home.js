import React, { Component } from "react";
import { Footer } from "./Footer";

export class Home extends Component {
  render() {
    return (
      <div>
        <h2>Välkommen</h2>
        <p>
          På denna sida kan du se vilka böcker vi har samt skapa ett konto och
          låna.
        </p>
        <h3>För dig som lånat bok</h3>
        <p>
          Om du lånat böcker hämtar du din bok på BibblanGatan 1231 Danmark.{" "}
          <br /> Boken finns i "Utlånade böcker"-lådan.
        </p>
        <Footer />
      </div>
    );
  }
}
