import React, { Component } from 'react'
import { Link } from 'react-router-dom';

interface IProps {
    location: any;
    locations: any;
    uid: any;
    firestore: any;
    defaultLoc: boolean;
}

class Location extends Component<IProps> {

    handleRemoveLocation = (e:any) => {

        e.preventDefault()
        const { firestore, location, locations, uid } = this.props;
        const count = locations.count-1;
        // const locationsSet = locations.locations.filter((loc:any)=>loc.address === locations.defaultLocation.address)
        const locationsSet = locations.locations.filter((loc:any)=>loc.address !== location.address)
        const newLocation = {...locations, count, locations: locationsSet}
        firestore.update({ collection: "locations", doc: uid}, newLocation);
    }

    setDefaultLocation = (e:any) => {
        
        e.preventDefault()

        const { firestore, location, locations, uid } = this.props;

        const newLocation = {...locations, defaultLocation: location}

        firestore.update({ collection: "locations", doc: uid}, newLocation);
        
    }

    render() {
        const { location, defaultLoc } = this.props; 
        return (
            <div>
                {defaultLoc?(
                    <span className="badge badge-primary w-25" style={{lineHeight:"inherit"}}>Default</span>
                ):null} 
                <div className="card mb-3">
                    <div className="card-body d-flex justify-content-between p-2">
                        <div>
                            <img src="/assets/images/map-icon.jpg" className="img-thumbnail rounded-circle" alt="map"/>
                        </div>
                        <div className="ml-2 w-100">
                            <h6 className="card-text mt-3 mb-0">{location.address}</h6> 
                            {defaultLoc?null:(
                                <div className="text-right">
                                    <Link to="#" onClick={this.setDefaultLocation} className="btn btn-outline-primary waves-effect btn-sm ml-0 mt-2">
                                        <i className="fa fa-plus mr-1" aria-hidden="true"></i> Default
                                    </Link>
                                    <Link to="#" className="btn btn-outline-primary waves-effect btn-sm ml-0 mt-2" onClick={this.handleRemoveLocation}>
                                        <i className="fa fa-minus-circle mr-1" aria-hidden="true"></i> remove
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Location