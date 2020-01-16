import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ListView from "../../views/ListView/ListView";
import Header from "../../components/Header/Header";
import CharacterView from "../CharacterView/CharacterView";
import './index.css'
class Root extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={ListView} />
          <Route exact path="/add_new" component={CharacterView} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Root;