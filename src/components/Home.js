import React, { Component } from "react";
import { Footer } from "./Footer";

export class Home extends Component {
  render() {
    return (
      <div>
        <h3>Välkommen</h3>
        <p>
          På denna sida kan du se vilka böcker vi har samt skapa ett konto och
          låna.
        </p>
        <Footer />
      </div>
    );
  }
}
