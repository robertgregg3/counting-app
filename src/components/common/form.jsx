import React, { Component } from 'react';
import Joi from "joi-browser";
import Input from "./input";
import Select from './select'

class Form extends Component {
    state = { 
        data: {},
        errors: {}
    };

    validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.data, this.schema, options); //viewing all errors and not stopping after the first
        if (!error) return null;
    
        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message;
        return errors;
      };
    
      validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
      };

      handleSubmit = (e) => {
        e.preventDefault();
    
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;
    
        this.doSubmit();
      };

      handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMsg = this.validateProperty(input);
        if (errorMsg) errors[input.name] = errorMsg;
        else delete errors[input.name];
        // if there is a error message we will store it in our errors object and
        // if for example it is the username field, then we will set the username property in the errors object
        // otherwise delete the error property
    
        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data, errors });
      };
      renderButton(label) {
        return ( 
            <button className="btn btn-primary" disabled={this.validate()}>
                {label}
            </button>
        )
      }

      renderInput(name, label, type = 'text', value) {
        const { data, errors } = this.state;

          return (
            <Input
                name={name}
                label={label}
                error={errors[name]}
                value={value}
                onChange={this.handleChange}
                type={type}
            />
          )
      }

      renderSelect(name, label) {
        const { data, errors } = this.state;

          return (
            <Select
                name={name}
                label={label}
                error={errors[name]}
                value={data[name]}
                onChange={this.handleChange}
                type={'select'}
            />
          )
      }
}
 
export default Form;