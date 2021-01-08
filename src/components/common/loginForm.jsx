import React, { Component } from "react";
import Input from "./input";
import Joi from "joi-browser";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("username"),
    password: Joi.string().required().label("password"),
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options); //viewing all errors and not stopping after the first
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    // call the server
    console.log("submitted");
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMsg = this.validateProperty(input);
    if (errorMsg) errors[input.name] = errorMsg;
    else delete errors[input.name];
    // if there is a error message we will store it in our errors object and
    // if for example it is the username field, then we will set the username property in the errors object
    // otherwise delete the error property

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div className="grid-col-1-3">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            autoFocus
            onChange={this.handleChange}
            value={account.username}
            id="username"
            name="username"
            type="text"
            className="form-control"
            error={errors.username}
          />
          <Input
            onChange={this.handleChange}
            value={account.password}
            id="password"
            name="password"
            type="text"
            className="form-control"
            error={errors.password}
          />
          <button className="btn btn-primary" disabled={this.validate()}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
