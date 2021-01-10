import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class MovieDetails extends Form {
  state = { 
      data: { 
        title: "",
        genre: "",
        stock: "",
        rate: "" 
      }, 
      errors: {}
   }

  schema = {
    title: Joi.string().required().label('Title'),
    genre: Joi.string().required().label('Genre'),
    stock: Joi.number().required().min(0).max(100).label('Stock'),
    rate:  Joi.number().required().min(0).max(10).label('Rate'),
  } 

  render() { 
    return ( 
      <div className="grid-col-1-3">
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title', 'text', this.props.match.params.title )}
          {this.renderSelect('genre', 'Genre', 'select')}
          {this.renderInput('stock', 'Number in Stock')}
          {this.renderInput('rate', 'Rate')}
        </form>
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