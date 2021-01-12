import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/fakeGenreService";
import { getMovie } from "./../services/fakeMovieService";
import { saveMovie } from "./../services/fakeMovieService";

class MovieDetails extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().required().min(0).max(100).label("Stock"),
    dailyRentalRate: Joi.number().required().min(0).max(10).label("Rate"),
  };
  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId === "new") return; // if the id is "new" then there is no need to populate the rest of the form

    const movie = getMovie(movieId); // function to get movies by ID.
    if (!movie) return this.props.history.replace("/not-found"); // if no id exists then send to "not found"

    this.setState({ data: this.mapToViewModel(movie) }); // when you type in a new movie details the state gets updated and massed to mapToViewModel
  }

  //  this method gets the data ready to be sent to the movie DB via the saveMovie() method.
  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = () => {
    saveMovie(this.state.data);
    console.log("submitted", this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("save")}
        </form>
      </div>
    );
  }
}

export default MovieDetails;
