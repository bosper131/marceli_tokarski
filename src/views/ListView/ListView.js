import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import List from "../../components/List/List";
import Pagination from "../../components/Pagination/Pagination";
import Input from "../../components/Input/Input";
class ListView extends React.Component {
  state = {
    characters: [],
    totalResult: 0,
    currentPage: 1,
    searchTerm: ""
  };

  componentDidMount() {
    axios.get(`http://localhost:3000/characters?_limit=10`).then(res => {
      this.setState({
        characters: res.data,
        totalResult: parseInt(res.headers["x-total-count"])
      });
    });
  }

  nextPage = pageNumber => {
    axios
      .get(
        `http://localhost:3000/characters?_page=${pageNumber}&_limit=10&q=${this.state.searchTerm}`
      )
      .then(res => {
        this.setState({ characters: res.data, currentPage: pageNumber });
      });
  };
  handleSubmit = e => {
    e.preventDefault();
    axios
      .get(
        `http://localhost:3000/characters?q=${this.state.searchTerm}&_limit=10`
      )
      .then(res => {
        this.setState({
          characters: res.data,
          totalResult: parseInt(res.headers["x-total-count"]),
          currentPage: 1
        });
      });
  };
  handleChange = e => {
    this.setState({
      searchTerm: e.target.value
    });
  };

  render() {
    const numberPages = Math.floor(this.state.totalResult / 10);
    return (
      <div className="container">
        <h1>List View</h1>
        <div className="row">
          <div className="col-sm-6">
            <form className="form-group" onSubmit={this.handleSubmit}>
              <Input
                className="form-control"
                id="searchInput"
                type="text"
                placeholder="Search..."
                classLabel="sr-only"
                name="Search"
                onChange={this.handleChange}
              />
            </form>
          </div>
          <div className="col-sm-6 text-sm-right">
            <NavLink className="btn btn-primary mb-3" to="/add_new">
              Add new
            </NavLink>
          </div>
        </div>
        <table className="table table-bordered table-hover">
          <List characters={this.state.characters} />
        </table>
        {this.state.totalResult > 10 && (
          <Pagination
            pages={numberPages}
            nextPage={this.nextPage}
            currentPage={this.state.currentPage}
          />
        )}
      </div>
    );
  }
}

export default ListView;
