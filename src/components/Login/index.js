import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import auth from '../../utils/auth';
import classnames from 'classnames';

export default class Login extends Component {

  state = {
    redirectToReferrer: false,
    email: '',
    password: '',
    errors: {},
    loading: false
  }

  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (this.state.errors[name]) {
      let errors = Object.assign({}, this.state.errors); // lo clono
      delete errors[name];
      this.setState({
        [name]: value,
        errors
      });
    } else {
      this.setState({ [name]: value });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let errors = {};
    if (this.state.email === '') {
      errors.email = "email can't be empty"
    }

    if (this.state.password === '') {
      errors.password = "password can't be empty"
    }
    this.setState({ errors })

    let isValid = Object.keys(errors).length === 0;

    if (isValid) {
      let { email, password } = this.state;
      this.setState({ loading: true });

      auth.authenticate(email, password, () => {
        this.setState({ redirectToReferrer: true });
      });
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    }

    return (
      <div>
        <h2>Login</h2>
        <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleSubmit}>
          {
            !!this.state.errors.global &&
            <div className="ui negative message">
              <p>{this.state.errors.global}</p>
            </div>
          }
          <div className={classnames('field', { error: !!this.state.errors.email })}>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name='email'
              value={this.state.email}
              onChange={this.handleChange}
            />
            <span>{this.state.errors.email}</span>
          </div>

          <div className={classnames('field', { error: !!this.state.errors.password })}>
            <label htmlFor="password">Password</label>
            <input type="text" id="password" name='password'
              value={this.state.password}
              onChange={this.handleChange}
            />
            <span>{this.state.errors.password}</span>
          </div>

          <div className="field">
            <button className="ui primary button">Login</button>
          </div>
        </form>
      </div>
    );
  }
}