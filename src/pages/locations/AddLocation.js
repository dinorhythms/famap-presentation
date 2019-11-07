import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GoogleMap, StandaloneSearchBox, Marker } from '@react-google-maps/api';
import { compose } from 'redux';
import { withFirebase, firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';

class AddLocation extends Component {

    constructor (props) {
      super(props)

      this.state = {
        lat: 6.465422,
        lng: 3.406448,
        address: '',
        neighborhood: '',
        area: '',
        state: '',
        country: '',
        defaultLocation: false,
        placeId: ''
      }

    }
  
    onPlaceChanged = () => {

      const details = this.searchBox.getPlaces();
      const lat = details[0].geometry.location.lat();
      const lng = details[0].geometry.location.lng();
      const address =  `${details[0].name}, ${details[0].formatted_address}`;
      const placeId = details[0].place_id;
      let neighborhood='',area='', state='', country = '';

      details[0].address_components.map(details=>{
        if(details.types[0] === "neighborhood" && neighborhood === ''){
          neighborhood = details.long_name;
        }
        if(details.types[0] === "sublocality_level_1" && neighborhood === ''){
          neighborhood = details.long_name;
        }
        if(details.types[0] === "locality" && neighborhood === ''){
          neighborhood = details.long_name;
        }
        if(details.types[0] === "administrative_area_level_2"){
          area = details.long_name;
        }
        if(details.types[0] === "administrative_area_level_1"){
          state = details.long_name;
        }
        if(details.types[0] === "country"){
          country = details.long_name;
        }
        return null;
      })

      if(area === '') area = neighborhood;

      this.setState({lat,lng,address, neighborhood, area, state, country, placeId});
      
    }

    handleLocationSubmit = (e) => {
      e.preventDefault();
      const { lat, lng, address, defaultLocation, neighborhood, area, state, country, placeId } = this.state;
      const { locations, firebase, firestore, toggleopenLocationForm } = this.props;

      if(address==="")return;

      const uid = firebase.auth().currentUser.uid

      const newLocation = {
        address, lat, lng, neighborhood, area, state, country, placeId
      }

      if(locations){

        let setDefaultLocation = null;

        if(defaultLocation){
          setDefaultLocation = newLocation;
        } else {
          setDefaultLocation = locations.defaultLocation;
        }

          // check if it exists
          locations.locations.map(location=>{
            if(newLocation.address===location.address){
              console.log('Locations Exists')
              return null;
            }
            return null;
          })

        //locations exist
        const count = 1 + locations.count;

        const locationCollection = {
            count: count,
            defaultLocation: {
              ...setDefaultLocation
            },
            locations:[
              ...locations.locations,
              {...newLocation}
            ]
        }

        firestore.update({collection: 'locations', doc: locations.id }, locationCollection).then(()=>{
          this.setState({
            lat: 6.465422,
            lng: 3.406448,
            address: '',
            defaultLocation: false
          })
        }).then(()=>toggleopenLocationForm())

      } else {
        //no location den first one add to db
        const locationCollection = {
            count: 1,
            defaultLocation: {
              ...newLocation
            },
            locations:[
              {...newLocation}
            ]
        }

        firestore.set({collection: 'locations', doc: uid}, locationCollection).then(()=>{
          this.setState({
            lat: 6.465422,
            lng: 3.406448,
            address: '',
            defaultLocation: false
          })
        }).then(()=>toggleopenLocationForm())

      }

    }

    handleDefaultLocationChange = () => {

      this.setState({
        defaultLocation: !this.state.defaultLocation
      });
      
    }

    render() {
      const { lat, lng, defaultLocation } = this.state;
      return (
        <div className="card bg-white mb-3">
          <div className="card-body">
              <GoogleMap id="map-box" className="border-primary" mapContainerStyle={{height: "250px",width: "100%"}} zoom={17} center={{lat: lat,lng: lng}}>
                <StandaloneSearchBox
                  onLoad={ref => this.searchBox = ref}
                  onPlacesChanged={this.onPlaceChanged}
                >
                  <input
                    type="text"
                    placeholder="Find your Location"
                    className="form-control pt-4 pb-4"
                    style={{
                      fontSize: `14px`,
                      textOverflow: `ellipses`,
                      position: "absolute",
                    }}
                  />
                </StandaloneSearchBox>
                <Marker
                  position={{
                    lat: lat,
                    lng: lng
                  }}
                />
              </GoogleMap>
            <div className="d-flex">
              <div>
                <Link to="#" onClick={this.handleLocationSubmit} className="btn btn-white text-left mt-3 ml-0"> 
                  <i className="fa fa-plus" aria-hidden="true"></i> Add to Locations
                </Link>
              </div>
              <div className="custom-control custom-checkbox ml-auto pt-4">
                <input type="checkbox" onChange={this.handleDefaultLocationChange} checked={defaultLocation} className="custom-control-input" id="defaultLocation"/>
                <label className="custom-control-label" htmlFor="defaultLocation">Default Location</label>
              </div>
            </div>
          </div>
        </div>
      )
    }
}

const mapStateToProps = ({firebase, firestore}) => ({
  locations: firestore.ordered.locations && firestore.ordered.locations[0]
})

export default compose(
  withFirebase,
  firestoreConnect(props=>[
    {collection: 'locations', doc: props.firebase.auth().currentUser.uid}
  ]),
  connect(mapStateToProps)
)(AddLocation)