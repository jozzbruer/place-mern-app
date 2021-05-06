import React from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import token from '../../../token'
import StylesMap from '../../../StyleMap'
import './Map.css'

const mapContainerStyle = {
    width: '100%',
    height: '100%'    
  }

  const options = {
    styles: StylesMap,
    disableDefaultUI: true,
}

  const libraries = ['places']
function Map(props) {

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: token,
        libraries,
    })
 console.log(props.center)
    return (
    
        <div className={`map ${props.className}`} style={props.style}>
            {!isLoaded ? null : (
                <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={16}
                options={options}
                center={props.center} 
              >
                  <Marker position={{ lat: props.center.lat, lng: props.center.lng }} 
                      icon={{
                        scaledSize: new window.google.maps.Size(60,60),
                        origin: new window.google.maps.Point(0,0),
                        anchor: new window.google.maps.Point(30,30)

                      }}/>
                </GoogleMap>
            )}
        </div> 
    )
}

export default Map
