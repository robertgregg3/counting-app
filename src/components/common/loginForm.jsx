import React, { Component } from "react";
import Input from "./input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {}
  };

  validate = () => {
    const errors = {}

    const { account } = this.state;

    if(account.username.trim() === '')
      errors.username = 'Username is required';
    if(account.password.trim() === '')
      errors.password = 'password is required';

    return Object.keys(errors).length === 0 ? 'null' : errors
  }


  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    console.log(errors)
    this.setState({ errors: errors || {}  })
    if (errors) return;

    // call the server
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
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
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
