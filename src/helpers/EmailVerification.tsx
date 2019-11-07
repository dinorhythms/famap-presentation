import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Redirect } from 'react-router';
interface IProps {
  auth: any;
  firebase: any;
}

interface IState {
  messageSent: boolean;
}
 class EmailVerification extends Component<IProps, IState> {
    state = {
      messageSent: false
    }
    handleSendVerificationEmail = () =>{

        const { firebase } = this.props;
        const user = firebase.auth().currentUser;

        user.sendEmailVerification().then(()=>{
          this.setState({messageSent: true})
        })
    }
  componentDidMount(){
    this.setState({messageSent: false})
  }
  render() {

    const { auth } = this.props;
    const { messageSent } = this.state;

    if(auth.emailVerified) return <Redirect to="/dashboard"/>

    return (
      <div className="container">
        <div className="row">
            <div className="col-8 mx-auto text-center mb-3">
                <h2 className="mt-4">Email Verification</h2>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <div className="card">
                    <div className="card-body">

                        <h4 className="card-title">Thank you for joining FAMAP!</h4>
                        <p className="card-text mb-5">Just one more step to go, please confirm that your registered email is correct by clicking the link we sent to your email.</p>
                        
                        <h4 className="card-title mt-5">Didn't get confirmation email?</h4>
                        <div onClick={this.handleSendVerificationEmail} className="btn btn-primary ml-0">Resend</div>
                        {messageSent?(
                          <div className="alert alert-danger" role="alert">
                            Confirmation mail sent to your registered email.
                          </div>
                        ):null}

                    </div>
                </div>


            </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any)=>({
  auth: state.firebase.auth
})

export default compose(
  withFirebase,
  connect(mapStateToProps)
)(EmailVerification)
