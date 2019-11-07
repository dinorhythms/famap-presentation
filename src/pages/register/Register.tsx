import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';

import { Link } from 'react-router-dom';

interface IProps {
  firebase: any;
  history: any;
}

interface IState {
  email: string;
  password: string;
  notification: any;
}
 
class Register extends Component<IProps, IState> {
  
  mounted = false;
  
  state = {
    email: '',
    password: '',
    notification: null
  }

  componentDidMount(){
    this.mounted = true;
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  handleEmailChange = (e: any) => {
    this.setState({email: e.target.value, notification: null})
  }

  handlePasswordChange = (e: any) => {
    this.setState({password: e.target.value, notification: null})
  }

  handleLogin = (e:any) => {

    e.preventDefault();

    const { firebase } = this.props;
    const { email, password } = this.state;

    const credentials = {
      email,
      password,
    }

    firebase.createUser(credentials).catch((error:any)=>{
      this.setState({notification: error.message})
    })
  }

  render() {
    const { notification } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-6 mx-auto">
            <form onSubmit={this.handleLogin} className="text-center border border-light p-5 mt-5 mb-5 bg-white">

              <p className="h4 mb-4">Register</p>

              <input onChange={this.handleEmailChange} type="email" id="defaultLoginFormEmail" className="form-control mb-4" placeholder="E-mail"/>

              <input onChange={this.handlePasswordChange} type="password" id="defaultLoginFormPassword" className="form-control mb-4" placeholder="Password"/>

              {/* <div className="d-flex justify-content-around">
                  <div>
                      <Link to="/">Forgot password?</Link>
                  </div>
              </div> */}

              <button className="btn btn-info btn-block my-4" type="submit">Register</button>
              <div id="recaptcha"></div>
              {notification?(
                <div className="alert alert-danger" role="alert">
                  {notification}
                </div>
              ):null}

              <p>Already a member?
                  <Link to="/login"> Login</Link>
              </p>

              <p>or sign in with:</p>

              <Link to="/" type="button" className="light-blue-text mx-2">
                  <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="/" type="button" className="light-blue-text mx-2">
                  <i className="fab fa-twitter"></i>
              </Link>
              <Link to="/" type="button" className="light-blue-text mx-2">
                  <i className="fab fa-linkedin-in"></i>
              </Link>
              <Link to="/" type="button" className="light-blue-text mx-2">
                  <i className="fab fa-github"></i>
              </Link>

              </form>
          </div>
        </div>
      </div>
    )
  }
}

export default firebaseConnect()(Register)