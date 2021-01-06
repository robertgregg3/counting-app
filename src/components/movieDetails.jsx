import React from "react";

const MovieDetails = ({ match, history }) => {
  return (
    <React.Fragment>
      <h1>Movie From {match.params.id}</h1>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/movies")}>
        Save
      </button>
    </React.Fragment>
  );
};

export default MovieDetails;
