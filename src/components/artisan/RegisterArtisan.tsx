import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import SideRightBar from '../../components/SideRightBar';

import { withFirebase, firestoreConnect, isEmpty, isLoaded } from 'react-redux-firebase';

import { Field, reduxForm } from 'redux-form';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Spinner from '../../helpers/Spinner';

interface IProps {
    professions: any;
    handleSubmit: any;
    pristine: any;
    reset: any;
    submitting: any;
    locations: any;
    firebase: any;
    firestore: any;
    history: any;
    artisan: any;
    profile: any;
}

class RegisterArtisan extends Component<IProps> {

    renderFields = (field: any) => {
        const { input, type, meta } = field;
        return (
              <div className="mb-3">
                <input {...input} type={type} className="form-control text-center form-control-lg" style={{fontSize:"1.0rem"}}/>
                <small id="helpId" className="text-danger">{meta.touched && meta.error?meta.error: ''}</small>
              </div>
          )
    }

    renderSelectField = (field:any) => {
        const { input, meta, children } = field;
        return (
            <div className="mb-3">
                <select {...input} className="browser-default custom-select custom-select-lg">
                {children}
                </select>
                <small id="helpId" className="text-danger">{meta.touched && meta.error?meta.error: ''}</small>
            </div>
        )
    }

    onFormSubmit = (values: any) => {
        
        const { companyName, yearsOfExperience, skillCertification, associationVerificationNumber, officeLocation } = values;
        const { firebase, firestore, history, locations:{locations}, profile } = this.props;
        const uid = firebase.auth().currentUser.uid;

        const artisanOfficeLocation = locations[officeLocation]

        const artisan = {
            companyName, 
            phone: profile.phoneNumber,
            yearsOfExperience, 
            skillCertification, 
            associationVerificationNumber,
            createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
            rating: 0,
            registered: true,
            discorable: true,
            updatedAt: new Date(),
            verified: false,
            verificationDate: null,
            verificationAgent:"",
            available: true,
            officeGeoLocation: artisanOfficeLocation
        }

        firestore.set({collection:"artisans", doc: uid}, artisan).then(()=>{
            history.push('/dashboard');
        }).catch((err: any)=>{
            alert(err)
        })

    }

    render() {
        const { handleSubmit, pristine, submitting, artisan, locations, professions } = this.props;
        if(isLoaded(artisan) && !isEmpty(artisan)){
            return <Redirect to="/dashboard"/>
        }
        return (
            <div>
                <Header title="Artisan Registration"/>

                <section>
                    <div className="container">
                        <div className="row">
                            <SideBar/>
                            <div className="col-md-6">
                                {artisan?(

                                    <section>
                                        {locations && locations.locations?(
                                        <form onSubmit={handleSubmit(this.onFormSubmit)} className="border border-light p-3 bg-white">
                                            <div>
                                                <label>Office Location</label>
                                                <div>
                                                    {locations && locations.locations?(
                                                        <Field name="officeLocation" component={this.renderSelectField}>
                                                            <option />
                                                            {locations.locations.map((location:any, index: any)=>{
                                                                return(
                                                                    <option key={index} value={index}>{location.address.substring(0, 30)}{"..."}</option>
                                                                )
                                                            })}
                                                        </Field>
                                                    ):(
                                                        <Spinner/>
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <label>Company Name</label>
                                                <div>
                                                <Field
                                                    component={this.renderFields}
                                                    name="companyName"
                                                    type="text"
                                                    placeholder="Company Name"
                                                />
                                                </div>
                                            </div>
                                            <div>
                                                <label>Years Of Experience</label>
                                                <div>
                                                <Field
                                                    name="yearsOfExperience"
                                                    component={this.renderFields}
                                                    type="text"
                                                    placeholder="Years Of Experience"
                                                />
                                                </div>
                                            </div>
                                            <div>
                                                <label>Skill Certification / Job</label>
                                                <div>
                                                {professions?(
                                                    <Field name="skillCertification" component={this.renderSelectField}>
                                                        <option />
                                                        {professions.map((profession:any, index: any)=>{
                                                            return(
                                                                <option key={index} value={profession.name}>{profession.name}</option>
                                                            )
                                                        })}
                                                    </Field>
                                                ):(
                                                    <Spinner/>
                                                )}
                                                </div>
                                            </div>
                                            <div>
                                                <label>Association Verification Number</label>
                                                <div>
                                                <Field
                                                    name="associationVerificationNumber"
                                                    component={this.renderFields}
                                                    type="text"
                                                    placeholder="Association Verification Number"
                                                />
                                                </div>
                                            </div>
                                            <div>
                                                <button className="btn btn-info btn-block" type="submit" disabled={pristine || submitting}>
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                        ):(
                                            <Link to="/locations" className="btn btn-white text-left mb-3 ml-0"> 
                                                <i className="fa fa-plus" aria-hidden="true"></i> Add Location First
                                            </Link>
                                        )}
                                    </section>
                                ):(
                                    <Spinner/>
                                )}
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
    locations: state.firestore.ordered.locations && state.firestore.ordered.locations[0],
    artisan: state.firestore.ordered.artisans,
    professions: state.firestore.ordered.professions
})
  
function validate(values:any):any{
    const errors:any = {};
    if(!values.officeLocation){
        errors.officeLocation = 'Office Location is required';
    }
    if(!values.companyName){
        errors.companyName = 'Company Name is required';
    }
    if(!values.yearsOfExperience){
        errors.yearsOfExperience = 'Years Of Experience is Required';
    }
    if(!values.skillCertification){
        errors.skillCertification = 'Skill Certification Status is Required';
    }
    if(!values.associationVerificationNumber){
        errors.associationVerificationNumber = 'Association Verification Number is Required';
    }
    return errors;
}

export default compose(
    withFirebase,
    firestoreConnect((props:any)=>[
        {collection:"artisans", doc: props.firebase.auth().currentUser.uid},
        {collection:"locations", doc: props.firebase.auth().currentUser.uid},
        {collection: 'professions'}
    ]),
    reduxForm({
      validate,
      form: 'artisanRegistrationForm'
    }),
    connect(mapStateToProps),
  )(RegisterArtisan)

