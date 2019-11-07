import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withFirebase } from 'react-redux-firebase';

import './nav.css';

import logo from './logo.png';

interface IProps {
    firebase: any;
    auth: any;
    history: any;
}

interface IState {
    isAuthenticated: boolean;
}

class Nav extends Component<IProps, IState> {

    state = {
        isAuthenticated: false
    }

    static getDerivedStateFromProps(props: IProps, state: IState){
        const { auth } = props;
        if(auth.uid){
            return {isAuthenticated: true}
        } else {
            return {isAuthenticated: false}
        }
    }

    handleLogout = (e:any) => {
        e.preventDefault()
        const { firebase } = this.props;
        firebase.logout()
    }

  render() {
    const { isAuthenticated } = this.state;
    const { displayName } = this.props.auth;
    return (
        <nav className="mb-1 navbar navbar-expand-lg navbar-light bg-white lighten-1 pt-3 pb-3">
            <div className="container-fluid">
                <Link className="navbar-brand" to="#">
                    <img src={logo} alt="famap logo" height="35px"/>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-555"
                    aria-controls="navbarSupportedContent-555" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {isAuthenticated?(
                    <div className="collapse navbar-collapse" id="navbarSupportedContent-555">
                        <ul className="navbar-nav mx-auto mr-autoo">
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">
                                    <i className="fa fa-home fa-2x blue-grey-text" aria-hidden="true"></i>
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item ml-4">
                                <Link className="nav-link" to="/dashboard">
                                    <i className="fa fa-heart-o fa-2x blue-grey-text" aria-hidden="true"></i>
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item ml-4">
                                <Link className="nav-link" to="/dashboard">
                                    <i className="fa fa-envelope fa-2x blue-grey-text" aria-hidden="true"></i>
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item ml-4">
                                <Link className="nav-link" to="/dashboard">
                                    <i className="fa fa-history fa-2x blue-grey-text" aria-hidden="true"></i>
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item ml-4">
                                <Link className="nav-link" to="/dashboard">
                                    <i className="fa fa-user-circle-o fa-2x blue-grey-text" aria-hidden="true"></i>
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                        </ul> 

                        <ul className="navbar-nav ml-autoo nav-flex-icons">
                            <li className="nav-item">
                               <span className="nav-link text-right pt-1">
                                    <p className="navbar-displayname"><small><strong>{displayName || "Welcome"}</strong></small></p>  
                                    <small className="d-inline-block"> <i className="fa fa-circle text-info" aria-hidden="true"></i> Online</small> 
                               </span>
                            </li>
                            <li className="nav-item avatar dropdown">
                                <Link to="/" className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-55" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg" className="rounded-circle z-depth-0"
                                    alt="avatar" height="35px" />
                                </Link>
                                <div className="dropdown-menu dropdown-menu-right dropdown-secondary"
                                aria-labelledby="navbarDropdownMenuLink-55">
                                <Link onClick={this.handleLogout} className="dropdown-item" to="#">logout</Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                ):(
                    <div className="collapse navbar-collapse" id="navbarSupportedContent-555">
                   
                        <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                                <Link className="nav-link" to="/">Home
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/">About
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                        </ul> 

                        <ul className="navbar-nav ml-auto nav-flex-icons">
                            <li className="nav-item avatar">
                                <Link className="nav-link" to="/login">login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    )
  }
}

const mapStateToProps = ({firebase}:any) =>({
    auth: firebase.auth
})

export default compose(
    withFirebase,
    connect(mapStateToProps) 
)(Nav);
