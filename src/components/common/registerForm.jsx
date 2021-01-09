import React from 'react';
import Joi from "joi-browser";
import Form from "./form";

class RegisterForm extends Form {
    state = { 
        data: {
            username: "",
            password: "",
            name: ""
        },
        errors: {}
     }

     schema = {
        username:    Joi.string().email().required().label('Username'),
        password: Joi.string().min(5).required().label("Password"),
        name:     Joi.string().label('Name')
      };

      doSubmit() {
        // call the server
        console.log("submitted");
      }
    
    render() { 
        return ( 
            <div className="grid-col-1-3">
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                {this.renderInput('username', 'Username')}
                {this.renderInput('password', 'Password', 'password')}
                {this.renderInput('name', 'Name')}
                {this.renderButton('Register')}
                </form>
            </div>
         );
    }
}
 
export default RegisterForm;