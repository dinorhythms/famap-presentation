import React, { Component } from 'react';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';

interface IProps {
    height: string;
    width: string;
    lat: number;
    lng: number;
    zoom: number;
    google: any;
    title: any;
    name: any;
}
class GeneralMap extends Component<IProps> {

    render() {
        const { lat, lng, height, width, zoom, title, name } = this.props;
        return (
            <div>
                <Map 
                    google={this.props.google}
                    initialCenter={{
                    lat: lat,
                    lng: lng
                    }}
                    style={{height: height,width: width}}
                    zoom={zoom}
                >
                    <Marker title={title}
                        name={name}
                        position={{lat: lat , lng: lng}} />
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyBK1T5m7v09cMQiqzWU5TSLx7NthD7Uwho')
})(GeneralMap)