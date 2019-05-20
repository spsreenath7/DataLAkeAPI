import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import * as api from '../../api';
import Auth from '../../auth';

class Login extends Component {
    constructor(props) {
      super(props);
      this.login = this.login.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.signup = this.signup.bind(this);
      this.state = {
        isAuthenticated: false,
        username: '',
        email: '',
        password: '',
        authfailmsg: ''
      };
    }
  
    handleChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }
  
  
    signup = async (event) => {
      try {
        if (this.state.password !== this.state.comfirmpassword) {
          alert('Passwords Must Match');
          console.log("failed")
        } else {
          const result = await api.signup(this.state.username, this.state.password);
        //   usercurr.isAuthenticated = true;
          this.setState({
            isAuthenticated: true
          });
        }
  
      } catch (e) {
        alert(`Registration Failed ${e}`)
        event.preventDefault();
      }
    };


  
  
    login = async (event) => {
      try {
        console.log("Inside login...");
        const result = await api.login(this.state.username, this.state.password);
        Auth.authenticateUser(result.token);
        console.log("result.token ");
        console.log("after api login..."+ result);
        
        
        // usercurr.isAuthenticated = true;
        this.setState({
          isAuthenticated: true
        })
      } catch (e) {
        alert(`Authentication Failed: ${e}`)
        event.preventDefault();
      }
    };
  
  
    render() {
      if (this.state.isAuthenticated === true) {
        console.log('redirecting to home page ');
        const homePath = `/home/${this.state.userid}/`
        console.log(homePath);
        return (<Redirect to={homePath} />)
      }
  
  
      return (
        <div>
          <div id="loginpg">
            <form >
  
  
              <div >
                <label for="username1">Name </label>
                <input value={this.state.username} onChange={this.handleChange} type="text" name="username" class="form-control" id="username" aria-describedby="emailHelp" placeholder="Your name" />
  
              </div>
  
              {
                this.props.match.params.page === 'login' ? '' :
                  <div >
                    <label for="exampleInputEmail1">Email address</label>
                    <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
  
              }
  
              <div >
                <label for="exampleInputPassword1">Password</label>
                <input value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                <small id="emailHelp" class="form-text">{this.state.authfailmsg}</small>
              </div>
              {
                this.props.match.params.page === 'login' ?
                  <button onClick={this.login} class="btn btn-primary">Login</button> :
                  <button onClick={this.signup} class="btn btn-success">Signup</button>
              }
  
            </form>
          </div>
  
        </div>
  
      );
    }
  }

  export default Login;