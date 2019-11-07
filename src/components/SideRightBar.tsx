import React, { Component } from 'react'
import { connect } from 'react-redux';

interface IProps {
    auth: any;
}

class SideRightBar extends Component<IProps> {

  render() {
    const { auth } = this.props;
    return (
      <React.Fragment>
        <div className="col-md-3">
            <div className="card">

                <div className="card-body">

                    <section className="text-center">
                        <img src="/assets/images/profile-picture.jpg" className="img-fluid z-depth-1 rounded-circle" alt="Responsive"/>
                        <i className="fa fa-pencil-square-o mt-3 text-primary" aria-hidden="true"></i>
                        <h5 className="card-title mt-2">{auth.displayName || "Welcome"}</h5>
                        <hr/>
                        <h6 className="blue-text">On Free Plan</h6>
                        <button type="button" className="btn btn-outline-primary waves-effect">Upgrade</button>
                    </section>

                </div>

            </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state:any) => ({
    auth: state.firebase.auth
})

export default connect(mapStateToProps)(SideRightBar)