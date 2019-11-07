import React, { Component } from 'react';
import Spinner from '../../helpers/Spinner';
import Header from '../../components/Header';
import SideRightBar from '../../components/SideRightBar';
import GeneralMap from '../maps/GeneralMap';
import { compose } from 'redux';
import { withFirebase, firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

interface IProps {
    artisan: any;
}

class ArtisanProfile extends Component<IProps> {

    state = {
        discoverable: true
    }

    toggleDiscoverable = () => {
        this.setState({discoverable: !this.state.discoverable})
    }   

    render() {
        const { artisan } = this.props;
        
        if(isLoaded(artisan) && isEmpty(artisan)){
            console.log(artisan)
            return <Redirect to="/registerartisan"/>
        }
        return (
        <div>
            <Header title="Artisan Home"/>
            <section>
            <div className="container">
                <div className="row">
                    <div className="col col-md-5">
                        {isLoaded(artisan)?(
                            <div className="card">
                                <GeneralMap  height="400px" width="100%" zoom={17} title="Artisan Profile" name="artisanprofile" lat={artisan.officeGeoLocation.lat} lng={artisan.officeGeoLocation.lng}/> 
                                <div className="card-body">
                                    <h4 className="card-title mb-1">{artisan.companyName}</h4>
                                    <p className="card-text mb-1">{artisan.officeGeoLocation.address}</p>
                                    <span id="rateMe" className="">
                                        <i className="fas fa-star py-2 px-1 rate-popover" data-index="0" data-html="true" data-toggle="popover" data-placement="top" title="Very bad"></i>
                                        <i className="fas fa-star py-2 px-1 rate-popover" data-index="1" data-html="true" data-toggle="popover" data-placement="top" title="Poor"></i>
                                        <i className="fas fa-star py-2 px-1 rate-popover" data-index="2" data-html="true" data-toggle="popover" data-placement="top" title="OK"></i>
                                        <i className="fas fa-star py-2 px-1 rate-popover" data-index="3" data-html="true" data-toggle="popover" data-placement="top" title="Good"></i>
                                        <i className="fas fa-star py-2 px-1 rate-popover" data-index="4" data-html="true" data-toggle="popover" data-placement="top" title="Excellent"></i>
                                    </span>
                                    <h6 className="mt-2"><i className="fa fa-briefcase text-primary" aria-hidden="true"></i> Years of Experience: {artisan.yearsOfExperience}</h6>
                                    
                                    
                                </div>
                            </div>
                        ):(
                            <Spinner/>
                        )}
                    </div>
                    <div className="col col-md-4">
                        <section className="">
                            <div className="card text-white bg-dark mb-4">
                                <div className="card-body">
                                    <h6>Discoverable</h6>
                                    <div className="custom-control custom-switch">
                                        <input onChange={this.toggleDiscoverable} type="checkbox" className="custom-control-input" id="customSwitches" checked={this.state.discoverable}/>
                                        <label className="custom-control-label" htmlFor="customSwitches"><small>Toggle On/Off for Client to see you</small></label>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h6>Clients History</h6>
                                    <hr></hr>
                                </div>
                            </div>
                        </section>
                        <section>
                            <div className="card">
                                <div className="card-body">
                                    <h6>Clients Testimonies</h6>
                                    <hr></hr>
                                </div>
                            </div>
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

const mapStateToProps = (state:any) => ({
    artisan: state.firestore.ordered.artisans && state.firestore.ordered.artisans[0]
})

export default compose(
    withFirebase,
    firestoreConnect((props:any)=>[
        {collection: "artisans", doc: props.firebase.auth().currentUser.uid}
    ]),
    connect(mapStateToProps)
)(ArtisanProfile)
