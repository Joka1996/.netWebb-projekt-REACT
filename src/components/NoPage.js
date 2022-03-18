import React, { Component } from "react";
import { Footer } from "./Footer";
export class NoPage extends Component {
  render() {
    return (
      <div>
        <main>
          <h3>Oops ingen sida hittad</h3>
        </main>
        <Footer />
      </div>
    );
  }
}
