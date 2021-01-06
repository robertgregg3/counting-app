import React, { Component } from "react";
import "./App.css";
import Movies from "./components/movies";
import Navbar from "./components/navBar";
import Customers from "./components/pages/customers";
import Rentals from "./components/pages/rentals";
import { Redirect, Route, Switch } from "react-router-dom";
import NotFound from "./components/pages/notFound";
import MovieDetails from "./components/movieDetails";
import LoginForm from "./components/common/loginForm";

class App extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/movies/:id" component={MovieDetails} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Redirect from="/" to="/movies" />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={Movies} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
