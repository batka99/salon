import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Map(){
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  return (
    <div className="mb-4" style={{borderStyle:"groove", borderRadius: "20px"}}>

    <iframe style={{width:"100%", height:"400px", borderRadius: "20px"}}  className="gmap_iframe" frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} src="https://maps.google.com/maps?width=600&height=400&hl=en&q=ulaanbaatar&t=&z=14&ie=UTF8&iwloc=B&output=embed" />


    </div>
  );
}




