import React, { Component } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase, withFirestore } from 'react-redux-firebase';
import { Field, reduxForm } from 'redux-form'
import { Link, Redirect } from 'react-router-dom';

interface IProps {
    profile: {
        completedProfile: boolean;
    };
    auth: any;
    handleSubmit: any;
    pristine: any;
    reset: any;
    submitting: any;
    field: any;
    firstName: string;
    firebase: any;
    firestore: any;
    history: any;
}

interface IState {
    datePickerStartDate: string;
    firstName: string;
}

class ProfileUpdate extends Component<IProps, IState> {

    renderFields = (field: any) => {
        const { input, placeholder, type, meta } = field;
        return (
              <div className="mb-3">
                <input {...input} placeholder={placeholder} type={type} className="form-control form-control-lg text-center"/>
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

    onFormSubmit = (values: { firstName: string; lastName: string; maritalStatus: string; gender: string; phoneNumber: string; nationality: string; }) => {
        
        const { firstName, lastName, maritalStatus, gender, phoneNumber, nationality } = values;
        const { firebase, firestore, history } = this.props;
        const user = firebase.auth().currentUser;

        const profile = {
            firstName,
            lastName,
            email: user.email,
            phoneNumber,
            nationality,
            maritalStatus,
            gender,
            completedProfile: true
        }
        user.updateProfile({
            displayName: `${firstName} ${lastName}`
        }).then(function() {
            firestore.update({collection: 'users', doc: user.uid}, profile).then(()=>{
                    user.sendEmailVerification().then(()=>{
                        history.push('/emailverification');
                    })
            })
        }).catch(function(error:any) {
            console.log(error)
        });

    }
       
    render() {

        const { handleSubmit, pristine, submitting, profile } = this.props;
        if(profile.completedProfile) return <Redirect to="/dashboard"/>
        return (
            <div className="container">
                <div className="row">
                    <div className="col-8 mx-auto">
                        <h1 className="mt-3 mb-4">Update Profile</h1>
                        <p>Please complete the form below to finalize your registration</p>
                        <form onSubmit={handleSubmit(this.onFormSubmit)} className="text-center border border-light p-5">
                            <div>
                                <label>First Name</label>
                                <div>
                                <Field
                                    component={this.renderFields}
                                    name="firstName"
                                    type="text"
                                    placeholder="First Name"
                                />
                                </div>
                            </div>
                            <div>
                                <label>Last Name</label>
                                <div>
                                    <Field
                                        name="lastName"
                                        component={this.renderFields}
                                        type="text"
                                        placeholder="Last Name"
                                    />
                                </div>
                            </div>
                            <div>
                                <label>Phone Number</label>
                                <div>
                                    <Field
                                        name="phoneNumber"
                                        component={this.renderFields}
                                        type="text"
                                        placeholder="Phone Number"
                                    />
                                </div>
                            </div>
                            <div>
                                <label>Date of Birth</label>
                                <div>
                                <Field
                                    name="dob"
                                    component={this.renderFields}
                                    type="text"
                                    placeholder="11/08/1999"
                                />
                                </div>
                            </div>
                            <div>
                                <label>Gender</label>
                                <div>
                                    <Field name="gender" component={this.renderSelectField}>
                                        <option />
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </Field>
                                </div>
                            </div>
                            <div>
                                <label>Marital Status</label>
                                <div>
                                    <Field name="maritalStatus" component={this.renderSelectField}>
                                        <option />
                                        <option value="single">Single</option>
                                        <option value="married">Married</option>
                                    </Field>
                                </div>
                            </div>
                            <div>
                                <label>Nationality</label>
                                <div>
                                    <Field name="nationality" component="select" className="browser-default custom-select custom-select-lg mb-3">
                                        <option />
                                        <option value="AFG">Afghanistan</option>
                                        <option value="ALA">Åland Islands</option>
                                        <option value="ALB">Albania</option>
                                        <option value="DZA">Algeria</option>
                                        <option value="ASM">American Samoa</option>
                                        <option value="AND">Andorra</option>
                                        <option value="AGO">Angola</option>
                                        <option value="AIA">Anguilla</option>
                                        <option value="ATA">Antarctica</option>
                                        <option value="ATG">Antigua and Barbuda</option>
                                        <option value="ARG">Argentina</option>
                                        <option value="ARM">Armenia</option>
                                        <option value="ABW">Aruba</option>
                                        <option value="AUS">Australia</option>
                                        <option value="AUT">Austria</option>
                                        <option value="AZE">Azerbaijan</option>
                                        <option value="BHS">Bahamas</option>
                                        <option value="BHR">Bahrain</option>
                                        <option value="BGD">Bangladesh</option>
                                        <option value="BRB">Barbados</option>
                                        <option value="BLR">Belarus</option>
                                        <option value="BEL">Belgium</option>
                                        <option value="BLZ">Belize</option>
                                        <option value="BEN">Benin</option>
                                        <option value="BMU">Bermuda</option>
                                        <option value="BTN">Bhutan</option>
                                        <option value="BOL">Bolivia, Plurinational State of</option>
                                        <option value="BES">Bonaire, Sint Eustatius and Saba</option>
                                        <option value="BIH">Bosnia and Herzegovina</option>
                                        <option value="BWA">Botswana</option>
                                        <option value="BVT">Bouvet Island</option>
                                        <option value="BRA">Brazil</option>
                                        <option value="IOT">British Indian Ocean Territory</option>
                                        <option value="BRN">Brunei Darussalam</option>
                                        <option value="BGR">Bulgaria</option>
                                        <option value="BFA">Burkina Faso</option>
                                        <option value="BDI">Burundi</option>
                                        <option value="KHM">Cambodia</option>
                                        <option value="CMR">Cameroon</option>
                                        <option value="CAN">Canada</option>
                                        <option value="CPV">Cape Verde</option>
                                        <option value="CYM">Cayman Islands</option>
                                        <option value="CAF">Central African Republic</option>
                                        <option value="TCD">Chad</option>
                                        <option value="CHL">Chile</option>
                                        <option value="CHN">China</option>
                                        <option value="CXR">Christmas Island</option>
                                        <option value="CCK">Cocos (Keeling) Islands</option>
                                        <option value="COL">Colombia</option>
                                        <option value="COM">Comoros</option>
                                        <option value="COG">Congo</option>
                                        <option value="COD">Congo, the Democratic Republic of the</option>
                                        <option value="COK">Cook Islands</option>
                                        <option value="CRI">Costa Rica</option>
                                        <option value="CIV">Côte d'Ivoire</option>
                                        <option value="HRV">Croatia</option>
                                        <option value="CUB">Cuba</option>
                                        <option value="CUW">Curaçao</option>
                                        <option value="CYP">Cyprus</option>
                                        <option value="CZE">Czech Republic</option>
                                        <option value="DNK">Denmark</option>
                                        <option value="DJI">Djibouti</option>
                                        <option value="DMA">Dominica</option>
                                        <option value="DOM">Dominican Republic</option>
                                        <option value="ECU">Ecuador</option>
                                        <option value="EGY">Egypt</option>
                                        <option value="SLV">El Salvador</option>
                                        <option value="GNQ">Equatorial Guinea</option>
                                        <option value="ERI">Eritrea</option>
                                        <option value="EST">Estonia</option>
                                        <option value="ETH">Ethiopia</option>
                                        <option value="FLK">Falkland Islands (Malvinas)</option>
                                        <option value="FRO">Faroe Islands</option>
                                        <option value="FJI">Fiji</option>
                                        <option value="FIN">Finland</option>
                                        <option value="FRA">France</option>
                                        <option value="GUF">French Guiana</option>
                                        <option value="PYF">French Polynesia</option>
                                        <option value="ATF">French Southern Territories</option>
                                        <option value="GAB">Gabon</option>
                                        <option value="GMB">Gambia</option>
                                        <option value="GEO">Georgia</option>
                                        <option value="DEU">Germany</option>
                                        <option value="GHA">Ghana</option>
                                        <option value="GIB">Gibraltar</option>
                                        <option value="GRC">Greece</option>
                                        <option value="GRL">Greenland</option>
                                        <option value="GRD">Grenada</option>
                                        <option value="GLP">Guadeloupe</option>
                                        <option value="GUM">Guam</option>
                                        <option value="GTM">Guatemala</option>
                                        <option value="GGY">Guernsey</option>
                                        <option value="GIN">Guinea</option>
                                        <option value="GNB">Guinea-Bissau</option>
                                        <option value="GUY">Guyana</option>
                                        <option value="HTI">Haiti</option>
                                        <option value="HMD">Heard Island and McDonald Islands</option>
                                        <option value="VAT">Holy See (Vatican City State)</option>
                                        <option value="HND">Honduras</option>
                                        <option value="HKG">Hong Kong</option>
                                        <option value="HUN">Hungary</option>
                                        <option value="ISL">Iceland</option>
                                        <option value="IND">India</option>
                                        <option value="IDN">Indonesia</option>
                                        <option value="IRN">Iran, Islamic Republic of</option>
                                        <option value="IRQ">Iraq</option>
                                        <option value="IRL">Ireland</option>
                                        <option value="IMN">Isle of Man</option>
                                        <option value="ISR">Israel</option>
                                        <option value="ITA">Italy</option>
                                        <option value="JAM">Jamaica</option>
                                        <option value="JPN">Japan</option>
                                        <option value="JEY">Jersey</option>
                                        <option value="JOR">Jordan</option>
                                        <option value="KAZ">Kazakhstan</option>
                                        <option value="KEN">Kenya</option>
                                        <option value="KIR">Kiribati</option>
                                        <option value="PRK">Korea, Democratic People's Republic of</option>
                                        <option value="KOR">Korea, Republic of</option>
                                        <option value="KWT">Kuwait</option>
                                        <option value="KGZ">Kyrgyzstan</option>
                                        <option value="LAO">Lao People's Democratic Republic</option>
                                        <option value="LVA">Latvia</option>
                                        <option value="LBN">Lebanon</option>
                                        <option value="LSO">Lesotho</option>
                                        <option value="LBR">Liberia</option>
                                        <option value="LBY">Libya</option>
                                        <option value="LIE">Liechtenstein</option>
                                        <option value="LTU">Lithuania</option>
                                        <option value="LUX">Luxembourg</option>
                                        <option value="MAC">Macao</option>
                                        <option value="MKD">Macedonia, the former Yugoslav Republic of</option>
                                        <option value="MDG">Madagascar</option>
                                        <option value="MWI">Malawi</option>
                                        <option value="MYS">Malaysia</option>
                                        <option value="MDV">Maldives</option>
                                        <option value="MLI">Mali</option>
                                        <option value="MLT">Malta</option>
                                        <option value="MHL">Marshall Islands</option>
                                        <option value="MTQ">Martinique</option>
                                        <option value="MRT">Mauritania</option>
                                        <option value="MUS">Mauritius</option>
                                        <option value="MYT">Mayotte</option>
                                        <option value="MEX">Mexico</option>
                                        <option value="FSM">Micronesia, Federated States of</option>
                                        <option value="MDA">Moldova, Republic of</option>
                                        <option value="MCO">Monaco</option>
                                        <option value="MNG">Mongolia</option>
                                        <option value="MNE">Montenegro</option>
                                        <option value="MSR">Montserrat</option>
                                        <option value="MAR">Morocco</option>
                                        <option value="MOZ">Mozambique</option>
                                        <option value="MMR">Myanmar</option>
                                        <option value="NAM">Namibia</option>
                                        <option value="NRU">Nauru</option>
                                        <option value="NPL">Nepal</option>
                                        <option value="NLD">Netherlands</option>
                                        <option value="NCL">New Caledonia</option>
                                        <option value="NZL">New Zealand</option>
                                        <option value="NIC">Nicaragua</option>
                                        <option value="NER">Niger</option>
                                        <option value="NGA">Nigeria</option>
                                        <option value="NIU">Niue</option>
                                        <option value="NFK">Norfolk Island</option>
                                        <option value="MNP">Northern Mariana Islands</option>
                                        <option value="NOR">Norway</option>
                                        <option value="OMN">Oman</option>
                                        <option value="PAK">Pakistan</option>
                                        <option value="PLW">Palau</option>
                                        <option value="PSE">Palestinian Territory, Occupied</option>
                                        <option value="PAN">Panama</option>
                                        <option value="PNG">Papua New Guinea</option>
                                        <option value="PRY">Paraguay</option>
                                        <option value="PER">Peru</option>
                                        <option value="PHL">Philippines</option>
                                        <option value="PCN">Pitcairn</option>
                                        <option value="POL">Poland</option>
                                        <option value="PRT">Portugal</option>
                                        <option value="PRI">Puerto Rico</option>
                                        <option value="QAT">Qatar</option>
                                        <option value="REU">Réunion</option>
                                        <option value="ROU">Romania</option>
                                        <option value="RUS">Russian Federation</option>
                                        <option value="RWA">Rwanda</option>
                                        <option value="BLM">Saint Barthélemy</option>
                                        <option value="SHN">Saint Helena, Ascension and Tristan da Cunha</option>
                                        <option value="KNA">Saint Kitts and Nevis</option>
                                        <option value="LCA">Saint Lucia</option>
                                        <option value="MAF">Saint Martin (French part)</option>
                                        <option value="SPM">Saint Pierre and Miquelon</option>
                                        <option value="VCT">Saint Vincent and the Grenadines</option>
                                        <option value="WSM">Samoa</option>
                                        <option value="SMR">San Marino</option>
                                        <option value="STP">Sao Tome and Principe</option>
                                        <option value="SAU">Saudi Arabia</option>
                                        <option value="SEN">Senegal</option>
                                        <option value="SRB">Serbia</option>
                                        <option value="SYC">Seychelles</option>
                                        <option value="SLE">Sierra Leone</option>
                                        <option value="SGP">Singapore</option>
                                        <option value="SXM">Sint Maarten (Dutch part)</option>
                                        <option value="SVK">Slovakia</option>
                                        <option value="SVN">Slovenia</option>
                                        <option value="SLB">Solomon Islands</option>
                                        <option value="SOM">Somalia</option>
                                        <option value="ZAF">South Africa</option>
                                        <option value="SGS">South Georgia and the South Sandwich Islands</option>
                                        <option value="SSD">South Sudan</option>
                                        <option value="ESP">Spain</option>
                                        <option value="LKA">Sri Lanka</option>
                                        <option value="SDN">Sudan</option>
                                        <option value="SUR">Suriname</option>
                                        <option value="SJM">Svalbard and Jan Mayen</option>
                                        <option value="SWZ">Swaziland</option>
                                        <option value="SWE">Sweden</option>
                                        <option value="CHE">Switzerland</option>
                                        <option value="SYR">Syrian Arab Republic</option>
                                        <option value="TWN">Taiwan, Province of China</option>
                                        <option value="TJK">Tajikistan</option>
                                        <option value="TZA">Tanzania, United Republic of</option>
                                        <option value="THA">Thailand</option>
                                        <option value="TLS">Timor-Leste</option>
                                        <option value="TGO">Togo</option>
                                        <option value="TKL">Tokelau</option>
                                        <option value="TON">Tonga</option>
                                        <option value="TTO">Trinidad and Tobago</option>
                                        <option value="TUN">Tunisia</option>
                                        <option value="TUR">Turkey</option>
                                        <option value="TKM">Turkmenistan</option>
                                        <option value="TCA">Turks and Caicos Islands</option>
                                        <option value="TUV">Tuvalu</option>
                                        <option value="UGA">Uganda</option>
                                        <option value="UKR">Ukraine</option>
                                        <option value="ARE">United Arab Emirates</option>
                                        <option value="GBR">United Kingdom</option>
                                        <option value="USA">United States</option>
                                        <option value="UMI">United States Minor Outlying Islands</option>
                                        <option value="URY">Uruguay</option>
                                        <option value="UZB">Uzbekistan</option>
                                        <option value="VUT">Vanuatu</option>
                                        <option value="VEN">Venezuela, Bolivarian Republic of</option>
                                        <option value="VNM">Viet Nam</option>
                                        <option value="VGB">Virgin Islands, British</option>
                                        <option value="VIR">Virgin Islands, U.S.</option>
                                        <option value="WLF">Wallis and Futuna</option>
                                        <option value="ESH">Western Sahara</option>
                                        <option value="YEM">Yemen</option>
                                        <option value="ZMB">Zambia</option>
                                        <option value="ZWE">Zimbabwe</option>
                                    </Field>
                                </div>
                            </div>
                            <div className="mb-4 mt-3">
                                <label className="">By submiting this form you accept the <Link to="/termandconditions">terms and conditions</Link> of our service</label>
                            </div>
                            <div>
                                <button className="btn btn-info btn-block" type="submit" disabled={pristine || submitting}>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any)=>({
  profile: state.firebase.profile,
  auth: state.firebase.auth
})

function validate(values:any):any{
    const errors:any = {};
    // if (!values.email) {
    //     errors.email = 'Required'
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //     errors.email = 'Invalid email address'
    // }
    if(!values.firstName){
        errors.firstName = 'First Name is required';
    }
    if(!values.lastName){
        errors.lastName = 'Last Name is required';
    }
    if(!values.phoneNumber){
        errors.phoneNumber = 'Phone Number is required';
    }
    if(!values.dob){
        errors.dob = 'Date of Birth is Required';
    }
    if(!values.gender){
        errors.gender = 'Gender is Required';
    }
    if(!values.maritalStatus){
        errors.maritalStatus = 'Marital Status is Required';
    }
    if(!values.nationality){
        errors.nationality = 'Nationality is Required';
    }
    return errors;
}

export default compose(
  withFirebase,
  withFirestore,
  connect(mapStateToProps),
  reduxForm({
    validate,
    form: 'profileUpdate'
  })
)(ProfileUpdate)
