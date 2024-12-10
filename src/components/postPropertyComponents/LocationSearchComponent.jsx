import React, { useRef } from 'react'
import { StandaloneSearchBox, LoadScript, useJsApiLoader } from '@react-google-maps/api';

const LocationSearchComponent = () => {
    const inputRef = useRef()
    
    const handlePlaceChange = async() => {
        const [places] = inputRef.current.getPlaces()
        console.log(places)

    }

  return (
    <LoadScript
        googleMapsApiKey='AIzaSyARs4jTZWV3jQ1ejL7MkCDSpIflMyyQSjk'
        libraries={["places"]}
        >
        <StandaloneSearchBox
            onLoad={ref => inputRef.current = ref}
            onPlacesChanged={handlePlaceChange}
            >
            <input type='text' placeholder='hellllll'/>
        </StandaloneSearchBox>
    </LoadScript>
  )
}

export default LocationSearchComponent