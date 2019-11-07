import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { withFirebase, firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import './sidebar.css';
import GeneralMap from './maps/GeneralMap';
import { connect } from 'react-redux';

interface IProps {
    firebase: any;
    auth: any;
    history: any;
    locations: any;
    google: any;
}

class SideBar extends Component<IProps> {

    handleLogout = (e:any) => {
        e.preventDefault()
        const { firebase } = this.props;
        firebase.logout()
    }

  render() {
    const { locations } = this.props;
    return (
      <React.Fragment>
        <div className="col-md-3">
            <div className="card">

                <div className="view overlay">
                    {locations && locations.defaultLocation?(
                      <div>
                        <GeneralMap height="250px" width="100%" zoom={17} lat={locations.defaultLocation.lat} lng={locations.defaultLocation.lng} name="sidebarmap" title="Side Bar Map"/>
                      </div>
                    ):(
                        <img src="/assets/images/img(67).jpg" className="img-fluid" alt="map placeholder"/>
                    )}
                </div>

                <div className="card-body">

                    <Link to="/dashboard" className="btn btn-white btn-block mb-3 text-left"> <i className="fa fa-home" aria-hidden="true"></i> Dashboard</Link>
                    <Link to="/locations" className="btn btn-white btn-block mb-3 text-left"> <i className="fa fa-location-arrow" aria-hidden="true"></i> Locations</Link>
                    <div className="sidebar-spacer"></div>
                    <Link onClick={this.handleLogout} to="#" className="btn btn-outline-primary waves-effect btn-block mb-3 text-left"> <i className="fa fa-sign-out" aria-hidden="true"></i> Logout</Link>

                </div>

            </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: any) => ({
  locations: state.firestore.ordered.locations && state.firestore.ordered.locations[0]
})

export default compose(
  withFirebase,
  firestoreConnect((props: any)=>[
    {collection: "locations", doc: props.firebase.auth().currentUser.uid}
  ]),
  connect(mapStateToProps)
  )(SideBar)