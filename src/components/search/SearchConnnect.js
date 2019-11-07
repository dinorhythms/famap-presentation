import React, { Component } from 'react'
import SideRightBar from '../SideRightBar';
import Header from '../Header';
import { compose } from 'redux';
import { firestoreConnect, withFirebase } from 'react-redux-firebase';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import {Map, GoogleApiWrapper} from 'google-maps-react';


class SearchConnnect extends Component {

  state = {
    directions: null
  }
  
  componentDidUpdatee() {

    const { google, artisan, location } = this.props;

    if(artisan && location) {

      const directionsService = new google.maps.DirectionsService();
      const directionsDisplay = new google.maps.DirectionsRenderer();

      directionsDisplay.setMap(this._map);

      const origin = { lat: location.defaultLocation.lat, lng: location.defaultLocation.lng };
      const destination = { lat: artisan.officeGeoLocation.lat, lng: artisan.officeGeoLocation.lng };
      
      // calculate Route
      directionsService.route(
        {origin: origin,destination: destination,travelMode: google.maps.TravelMode.DRIVING},
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      )

    }


  }

  fetchDirections = (mapProps, map) => {

    const {google} = mapProps;
    const { artisan, location } = this.props;

    const origin = { lat: location.defaultLocation.lat, lng: location.defaultLocation.lng };
    const destination = { lat: artisan.officeGeoLocation.lat, lng: artisan.officeGeoLocation.lng };
  
    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer();

    directionsDisplay.setMap(map);

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    )
  }
    
  render() {
      const { artisan, location } = this.props;  
      const style = {
        width: '100%',
        height: '400px'
      }
    return (
        <div>
        <Header title="Artisan Connect"/>

        <section>
          <div className="container">
              <div className="row">
                  <div className="col-md-5">
                    <div className="card">
                        {artisan && location?(
                          <Map 
                              ref={(map) => this._map = map}
                              google={this.props.google}
                              initialCenter={{
                                lat: location.defaultLocation.lat,
                                lng: location.defaultLocation.lng
                              }}
                              zoom={17}
                              style={style}
                              onReady={this.fetchDirections}
                            >
                          </Map>
                        ):"Loading..."}
                    </div>
                  </div>
                  <div className="col-md-4">
                    {artisan?(
                        <div>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <h4>{artisan.companyName}</h4>
                                    <p className="card-text">{artisan.officeGeoLocation.address}</p>
                                    <p>{artisan.phoneNumber}</p>
                                </div>
                            </div>
                            <Link to="#" className="btn btn-outline-primary btn-rounded waves-effect ml-0">Confirm</Link>
                            <Link to="/" className="btn btn-outline-primary btn-rounded waves-effect ml-0">Back</Link>
                        </div>
                    ):"Loading..."}
                  </div>
                  <SideRightBar/>
              </div>
          </div>
        </section>
          
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    location: state.firestore.ordered.myLocations && state.firestore.ordered.myLocations[0],
    artisan: state.firestore.ordered.searchArtisan && state.firestore.ordered.searchArtisan[0]
})

export default compose(
    withFirebase,
    firestoreConnect((props)=>[
        {collection: "locations", doc: props.firebase.auth().currentUser.uid, storeAs: "myLocations"},
        {collection: "artisans", doc: props.match.params.id, storeAs: "searchArtisan"}
    ]),
    GoogleApiWrapper({
      apiKey: ('AIzaSyBK1T5m7v09cMQiqzWU5TSLx7NthD7Uwho')
    }),
    connect(mapStateToProps)
)(SearchConnnect)