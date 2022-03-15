import React, { Component } from "react";

export class Footer extends Component {
  render() {
    return (
      <div className="d-flex flex-column h-100">
        <footer className="mt-auto">
          <hr></hr>
          <ul>
            <li>Joel Karlsson Webbutveckling Mittuniversitet</li>
            <li>Projekt-uppgift för Webbutveckling med .NET</li>
            <li>Skapad med .NET Wep API SQLite och React</li>
          </ul>
        </footer>
      </div>
    );
  }
}
