import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './header.css'
class Header extends Component {
    state = {
        logged : false
    };

    changeLoggedin= () => {
        let flag= !this.state.logged;
        this.setState({logged :flag})
    }
    render() {
        return (
            <div className="navbar navbar-fixed-top navbar-inverse" >
                <div className="container">

                    <NavLink to="/" id="logo" >Personal Data Lake</NavLink>

                    <nav>

                        <ul className="nav navbar-nav navbar-left">
                            <li><NavLink to="/about">About</NavLink></li>
                            <li><NavLink to="/contact">Contact</NavLink></li>

                        </ul>
                        <div className="nav navbar-nav navbar-right">
                            {this.state.logged === false ?
                                <form class="form-inline ">
                                    <div class="form-group mx-sm-3 mb-2 login">
                                        {/* <button type="submit" class="btn btn-success mb-2" onClick={() => {
                                                                        this.props.history.push('/login');
                                                                    }}>Login</button> */}
                                        <NavLink to="/user/login" > Login </NavLink>
                                    </div>
                                    <div class="form-group mx-sm-3 mb-2 login">
                                        {/* <button type="submit" class="btn btn-primary mb-2"onClick={() => {
                                                                        this.props.history.push('/signup');
                                                                    }}>Sign Up</button> */}
                                        <NavLink to="/user/signup" > SignUp </NavLink>
                                    </div>
                                </form>
                                : <div class="mx-sm-3 mb-2 login">
                                    {/* <button type="submit" class="btn btn-primary mb-2"onClick={() => {
                                                                this.props.history.push('/signup');
                                                            }}>Sign Up</button> */}
                                    <NavLink to="/logout" onClick={this.changeLoggedin}> Logout </NavLink>
                                </div>}


                        </div>

                    </nav>

                </div>
            </div>
        )
    }
}

export default Header;