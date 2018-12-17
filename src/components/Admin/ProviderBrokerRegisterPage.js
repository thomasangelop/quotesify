import React, { Component } from 'react';
import {connect} from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import { TextField } from '@material-ui/core';

class ProviderBrokerRegisterPage extends Component {
  state = {
    user_type: '',
    name: '',
    username: '',
    password: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.user_type && this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    }  else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } 

  
  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form className = "form" onSubmit={this.registerUser}>
            <div>
          </div>
          <div>
          <Button
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleClick}>
            Select User type
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
                >
            <MenuItem value="1" name="React" onClick={this.handleClose}>React</MenuItem>
            </Menu>
          </div>
          <div>
            <InputLabel htmlFor="Name"></InputLabel>
              <TextField
                id="username-input"
                label = "name"
                type="text"
                name="name"
                value={this.state.username}
                onChange={this.handleInputChangeFor('name')}
              />
          </div>
          <div>
            <InputLabel htmlFor="username"></InputLabel>
              <TextField
                id="username-input"
                label = "Username"
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
          </div>
          <div>
            < InputLabel htmlFor = "password"></InputLabel> 
              <TextField
                id="password-input"
                label = "Password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
          </div>
            <input
              className="register"
              type="submit"
              name="submit"
              value="Register"
            />
        </form>
        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
          >
            Login
          </button>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(ProviderBrokerRegisterPage);

