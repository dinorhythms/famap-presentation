import React, { Component, Fragment } from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { firestoreConnect, withFirestore } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

import geolib from 'geolib';
import { Link } from 'react-router-dom';

interface IProps {
  professions: any;
  firestore: any;
  firebase: any;
  artisans: any;
  userLocation: any;
  neighborhoodArtisans: any;
}

class SearchBox extends Component<IProps> {

  state = {
    artisans: [],
    searching: false,
    doneSearching: false
  }

  onSearchBoxChanged = (e: any) => {

    const { firestore, firebase, userLocation  } = this.props;

    const selectedSkill = e[0]

    if(selectedSkill){

      this.setState({searching: true});

      // GET neighborhoodArtisans
      firestore.collection('artisans')
      .where("officeGeoLocation.neighborhood", "==", userLocation.neighborhood)
      .where("skillCertification", "==", selectedSkill)
      .where('verified', '==', true)
      .where('available', '==', true)
      .where('discorable', '==', true)
      .get().then((snapshot:any) => {

        let neighborhoodArtisans = snapshot.docs.map((doc:any)=>{
          // if(doc.id!==firebase.auth().currentUser.uid){
            let items = doc.data();
            let id = doc.id;
            return items = {id,...items, latitude: items.officeGeoLocation.lat, longitude: items.officeGeoLocation.lng}
          // }
          // return null;
        });

        neighborhoodArtisans = neighborhoodArtisans.filter((artisan: any)=>artisan.id !== firebase.auth().currentUser.uid)
        
        const ordered = geolib.orderByDistance({latitude: userLocation.lat, longitude: userLocation.lng}, neighborhoodArtisans);

        // Rebuild Order
        const orderedNeighborhoodArtisans = ordered.slice(0,10).map((data:any, index)=>{
          const artisan = neighborhoodArtisans[index]
          const distance = geolib.convertUnit('km', data.distance, 2)
          return {...artisan, distance}
        })

        this.setState({artisans: orderedNeighborhoodArtisans, searching: false, doneSearching: true})

      });

    }

  }

  handleConnect = (id: any, distance: any) => {
    console.log()
  }

  render() {

    const { professions, userLocation } = this.props;
    const { artisans, doneSearching } = this.state;

    if(!professions) return "Loading...";

    const options = professions.map((profession: any) => {
      return profession.name
    });
    return (
      <Fragment>
        <section className="mb-3">
          <Typeahead
            options={options}
            bsSize='large'
            placeholder="Search for an Artisian near you..."
            onChange={this.onSearchBoxChanged}
            id="search"
          />
        </section>
        {/* serach result */}
        <section>
          {artisans.length>0?(
            <div className="container">
              <div className="row">
                {artisans.map(( artisan: any, index )=>{
                  return (
                    <div key={index} className="col col-md-6 p-1 mb-3">
                      <div className="card bg-white">
                        <div className="card-body">
                          <div className="d-flex">
                              <div className="mr-2">
                                <img className="card-img-top" src="/assets/images/profile-picture2.png" style={{maxWidth: "50px"}} alt={artisan.companyName}/>
                              </div>
                              <div>
                                <h6 className="mb-0">{artisan.companyName}</h6>
                                <small>{artisan.skillCertification}</small>
                              </div>
                          </div>
                          <div className="text-center mt-3">
                            <p><small> <i className="fa fa-location-arrow" aria-hidden="true"></i> {artisan.officeGeoLocation.address}</small></p>
                            <p><small></small></p>
                          </div>
                          <div className="text-center">
                            <h4 className="card-title text-center text-primary">{artisan.distance} km</h4>
                            <Link to={`/searchconnect/${artisan.id}`} className="btn btn-outline-primary btn-rounded waves-effect">Connect</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ):(
            <div>
              <h4 className="text-center">{doneSearching?"No Artisan at your default location '"+userLocation.neighborhood+"'":""}</h4>
            </div>
          )}
        </section>
      </Fragment>
    )
  }
}

const mapStateToProps = (state: any) => ({
  professions: state.firestore.ordered.professions,
})

export default compose(
  withFirestore,
  firestoreConnect((props: any)=>[
    'professions'
  ]),
  connect(mapStateToProps)
  )(SearchBox)