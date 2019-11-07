import React, { Component } from 'react'
import { Link } from 'react-router-dom';

interface IProps {
  artisan: any;
}
class ArtisanBar extends Component<IProps> {

  notRegistered = () => {
    return (
      <div>
        <span className="badge badge-primary">Register</span>
        <div className="card elegant-color text-white mb-3">
          <div className="card-body">
            
              <div className="d-flex d-flex justify-content-between">
                <div>
                  <h4 className="card-title">Artisan</h4>
                  <p className="card-text text-white">Register as an artisan to reach customers around you</p>
                </div>
                <div className="text-right">
                  <Link to="/registerartisan" className="btn btn-light">Register</Link>
                </div>
              </div>

          </div>
        </div>
      </div>
    )
  }

  registered = () => {
  
    return (
      <div>
        <span className="badge badge-danger">Get Verified</span>
        <div className="card elegant-color text-white mb-3">
          <div className="card-body">
            
              <div className="d-flex d-flex justify-content-between">
                <div>
                  <h4 className="card-title">Status: Please visit our nearest office for your Actisan account activation</h4>
                  <p className="card-text text-white">Registration received</p>
                </div>
                <div className="text-right">
                </div>
              </div>

          </div>
        </div>
      </div>
    )
  }

  registeredVerified = () => {
  
    return (
      <div>
        <span className="badge badge-dark">Artisan Quick Bar</span>
        <div className="card elegant-color text-white mb-3">
          <div className="card-body">
            
              <div className="d-flex d-flex justify-content-between">
                <div>
                  <h4 className="card-title">Status: Available</h4>
                  {/* <p className="card-text text-white">Registration received</p> */}
                  <span className="badge badge-pill pink mr-2"><i className="fas fa-wheelchair" aria-hidden="true"></i></span>
                  <span className="badge badge-pill light-blue mr-2"><i className="far fa-heart" aria-hidden="true"></i></span>
                  <span className="badge badge-pill indigo mr-2"><i className="fas fa-bullhorn" aria-hidden="true"></i></span>
                  <span className="badge badge-pill purple mr-2"><i className="far fa-comments" aria-hidden="true"></i></span>
                  <span className="badge badge-pill orange mr-2"><i className="fas fa-coffee" aria-hidden="true"></i></span>
                  <span className="badge badge-pill green mr-2"><i className="fas fa-user" aria-hidden="true"></i></span>
                </div>
                <div className="text-right">
                  <Link to="/artisanprofile" className="btn btn-light"> <i className="fa fa-briefcase" aria-hidden="true"></i> Goto Artisan</Link>
                </div>
              </div>

          </div>
        </div>
      </div>
    )
  }

  render() {

    const { artisan } = this.props;

    if(!artisan) return (
      this.notRegistered()
    )

    if(artisan && artisan.registered && !artisan.verified) return (
      this.registered()
    )

    if(artisan && artisan.registered && artisan.verified) return (
      this.registeredVerified()
    )
    
  }
}

export default ArtisanBar