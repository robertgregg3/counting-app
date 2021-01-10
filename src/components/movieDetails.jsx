import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class MovieDetails extends Form {
  state = {};

  schema = {};

  render() {
    return (
      <div className="grid-col-1-3">
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}></form>
        <button
          className="btn btn-primary"
          onClick={() => this.props.history.push("/movies")}>
          Save
        </button>
      </div>
    );
  }
}

export default MovieDetails;
