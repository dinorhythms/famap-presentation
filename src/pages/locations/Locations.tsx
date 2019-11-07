import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import SideRightBar from '../../components/SideRightBar';
import AddLocation from './AddLocation.js';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, withFirebase } from 'react-redux-firebase';
import Location from './Location';

interface IProps {
  firestore: any;
  firebase: any;
  locations: any;
  key: any;
}

class Locations extends Component<IProps> {

  state = {
    openLocationForm: false,
  }

  toggleopenLocationForm = () => {
    const openLocationForm = this.state.openLocationForm;
    this.setState({openLocationForm: !openLocationForm})
  }

  render() {
    const { openLocationForm }= this.state; 
    const { locations, firestore, firebase } = this.props;
    return (
      <div>
          <Header title="My Locations"/>
          <section>
            <div className="container">
                <div className="row">
                    <SideBar/>
                    <div className="col-md-6">
                        <section>
                            <Link to="#" onClick={this.toggleopenLocationForm} className="btn btn-white mb-3 text-left mt-0 ml-0"> 
                                {!openLocationForm?(
                                  <div>
                                    <i className="fa fa-plus" aria-hidden="true"></i> Add
                                  </div>
                                ):(
                                  <div>
                                    <i className="fa fa-times" aria-hidden="true"></i> Close
                                  </div>
                                )}
                                
                            </Link>
                            {openLocationForm?(
                              <AddLocation toggleopenLocationForm={this.toggleopenLocationForm}/>
                            ):null}
                        </section>
                        <section>
                          {locations && locations.defaultLocation?(
                            <Location 
                                  location={locations.defaultLocation} 
                                  firestore={firestore} 
                                  locations={locations}
                                  uid={firebase.auth().currentUser.uid} 
                                  defaultLoc={true}
                              />
                          ):null}
                          {locations && locations.locations.map((location: any, index: any)=>{
                            if(location.address===locations.defaultLocation.address) return null;
                            return (
                              <Location 
                                location={location} 
                                key={index} 
                                firestore={firestore} 
                                locations={locations}
                                uid={firebase.auth().currentUser.uid}
                                defaultLoc={false} 
                              />
                            )
                          })}
                        </section>
                        
                    </div>
                    <SideRightBar/>
                </div>
            </div>
          </section>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  locations: state.firestore.ordered.locations && state.firestore.ordered.locations[0]
})

export default compose(
  withFirebase,
  firestoreConnect((props: any)=>[
    {collection: 'locations', doc: props.firebase.auth().currentUser.uid}
  ]),
  connect(mapStateToProps)
)(Locations) 
