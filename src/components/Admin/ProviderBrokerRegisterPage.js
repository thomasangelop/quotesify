import React, { Component } from 'react';
import {connect} from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import { TextField } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

class ProviderBrokerRegisterPage extends Component {

  state = {
    authorization_id: 0,
    name: '',
    username: '',
    password: '',
  };

  // getProject dispatches a call to get authorization authorization level names and ids
  getAuthorization = (event) => {
      this.props.dispatch({type: 'GET_AUTHORIZATION'});
    }

  // controls and captures menu selection
  handleClose = (event) => {
        // menu item text
        console.log(event.target.innerText);
        this.setState({
          user_type: event.target.innerText,
        });
        // menu control 
        this.setState({
          anchorEl: null
        });
      };
  
  // registration 
  registerUser = (event) => {
    event.preventDefault();

    if (this.state.user_type && this.state.name && this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          authorization_id: 0,
          name: '',
          username: this.state.username,
          password: this.state.password,
        },
      });
    }  else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } 

  // captures textFeild input and sets it in state
  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
     // controls menu
    const { anchorEl } = this.state; 
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

const mapreduxStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapreduxStateToProps)(ProviderBrokerRegisterPage);

