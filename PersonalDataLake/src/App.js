import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/react-datepicker/dist/react-datepicker.css';
import '../node_modules/antd/dist/antd.css';

import logo from './logo.svg';
import './App.css';
import './footer.css';
import { Container, Row, Col } from 'reactstrap';

import Home from './components/home/userHome';
import fire from './config/Fire';
// import Login from './components/login';
import Header from './header';
import {
  BrowserRouter, Route, Redirect, Switch, Link,
  withRouter
} from 'react-router-dom';
import userdetailAPI from './datastore/userdetail';
import localCache from './datastore/localCache';
import _ from 'lodash';
import cuid from 'cuid';
import request from 'superagent';

import * as api from './api';
import Auth from './auth';


const usercurr = {
  isAuthenticated: false,
  signout() {
    this.isAuthenticated = false
    // setTimeout(cb, 100) // fake async
  },
  print() {
    console.log("In print : " + this.isAuthenticated);
  }
}


class PrivateRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
    console.log("Inside private route ");
    // usercurr.print();

    return (
      <Route {...rest} render={(props) =>
        usercurr.isAuthenticated === true ?
          <Component {...props} /> :
          <Redirect to={
            {
              pathname: '/user/login',
              state: { from: this.props.location }
            }
          } />

      }
      />
    )
  }
}

export class About extends Component {
  render() {
    return <h2>About page: This is a personal data store</h2>
  }
}

export class Contact extends Component {
  render() {
    return <h2>Contact us at xyz@user.com</h2>
  }
}

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
      comfirmpassword:'',
      authfailmsg: ''
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitForm = event => {
    event.preventDefault()
  }


  signup = async (event) => {
    event.preventDefault();
    try {
      if (this.state.password !== this.state.comfirmpassword) {
        alert('Passwords Must Match');
        console.log("failed")
      } else {
        const result = await api.signup(this.state.username, this.state.password);
        Auth.authenticateUser(result.token);
        usercurr.isAuthenticated = true;
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
    event.preventDefault();
    try {
      console.log("Inside login...");
      const result = await api.login(this.state.username, this.state.password);
      console.log("result.token "+result.token);
      Auth.authenticateUser(result.token);
      console.log("Auth.getToken "+Auth.getToken());
      usercurr.isAuthenticated = true;
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
            <div className="form-group">
              <label for="username1">Name </label>
              <input value={this.state.username} onChange={this.handleChange} type="text" name="username" class="form-control" id="username" aria-describedby="emailHelp" placeholder="Your name" />
            </div>

            {
              this.props.match.params.page === 'login' ? '' :
                <div className="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                  <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
            }

            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
              <small id="emailHelp" class="form-text">{this.state.authfailmsg}</small>
            </div>

            {
              this.props.match.params.page === 'login' ? '' :
                <div className="form-group">
                  <label for="comfirmpassword">Confirm password</label>
                  <input value={this.state.comfirmpassword} onChange={this.handleChange} type="email" name="comfirmpassword" class="form-control" id="comfirmpassword" aria-describedby="emailHelp" placeholder="re-enter password" />
                </div>

            }

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


class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <small>
          The <a href="https://facebook.github.io/react/">ReactJS library</a>
          by <a href="https://www.facebook.com/">Facebook</a>
        </small>
        <nav>
          <ul>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/">About</Link></li>


          </ul>
        </nav>
      </footer>
    )
  }
}


class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header auth={usercurr.isAuthenticated} />
          <div className="container contants">
            <Switch>
              <Route path='/user/:page' component={Login} />
              <PrivateRoute exact path='/home/*' component={Home} />
              <Route exact path='/' component={About} />
              <Route exact path='/contact' component={Contact} />
              <Redirect from='*' to='/' />
            </Switch>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}

export default Router;
