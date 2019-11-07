import React, { Component } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase, firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router';
import Spinner from '../../helpers/Spinner';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import SideRightBar from '../../components/SideRightBar';
import SearchBox from '../../components/search/SearchBox';
import ArtisanBar from '../../components/artisan/ArtisanBar';


interface IProps {
  user: any;
  profile: any;
  auth: any;
  artisan: any;
  locations: any;
  google: any;
  firebase: any;
}

class Dashboard extends Component<IProps> {

  render() {

    const { profile, auth, artisan, locations } = this.props;

    if(!profile.isLoaded){return <Spinner/>};
    
    if(profile && !profile.completedProfile) return <Redirect to="/profileupdate"/>
    if(auth && !auth.emailVerified) return <Redirect to="/emailverification"/>
    if(!locations) return <Redirect to="/locations"/>   
    return (
      <div>
        <Header title="Customer Home"/>

        <section>
          <div className="container">
              <div className="row">
                  <SideBar/>
                  <div className="col-md-6">
                      <section>
                        <ArtisanBar artisan={artisan}/>
                      </section>
                      <section>
                        <SearchBox userLocation={locations.defaultLocation}/>
                      </section>
                      <section>
                        
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

const mapStateToProps = (state: any)=>({
  profile: state.firebase.profile,
  auth: state.firebase.auth,
  // artisan: state.firestore.ordered.artisans,
  artisan: state.firestore.ordered.artisan && state.firestore.ordered.artisan[0],
  locations: state.firestore.ordered.locations && state.firestore.ordered.locations[0]
})

export default compose(
  withFirebase,
  firestoreConnect((props:any)=>[
    {collection: "artisans", doc: props.firebase.auth().currentUser.uid, storeAs: 'artisan'},
    {collection: "locations", doc: props.firebase.auth().currentUser.uid}
  ]),
  connect(mapStateToProps)
)(Dashboard)
