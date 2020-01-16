import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

class App extends React.Component {
  state = {
    isOpen: false
  };

  onToggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-3">
          <Link to="/" className="navbar-brand">
            Sonalake Task
          </Link>

          <button
            type="button"
            onClick={() => this.onToggle()}
            className={classNames("navbar-toggler", {
              collapsed: !this.state.isOpen
            })}
            aria-expanded={this.state.isOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className={classNames("collapse", "navbar-collapse", {
              show: this.state.isOpen
            })}
          >
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link to="/" className="nav-link">
                  List View
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default App;
