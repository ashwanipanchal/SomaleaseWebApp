import React,{useState, useEffect, useCallback} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { post_properties_step2 } from '../../api/auth';
import LoaderButton from '../LoaderButton/LoaderButton';
import { GoogleMap, LoadScript, StandaloneSearchBox } from '@react-google-maps/api';

const Step2 = ({ stepNumber, currentStep, incrementStep, prevStep, passData, handleDataChange }) => {
//   setKey("AIzaSyARs4jTZWV3jQ1ejL7MkCDSpIflMyyQSjk");
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [landmark, setLandmark] = useState('');
  const [lat_lon1, setLat_Lon1] = useState();
  const [lat_lon2, setLat_Lon2] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);

const [selectedPlace, setSelectedPlace] = useState(null);

//   const onLoad = useCallback((autocomplete) => {
//     setAutocomplete(autocomplete);
//   }, []);
const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      console.log(place)
      setLocationName(place?.formatted_address)
      setLat_Lon1(place?.geometry?.location?.lat())
      setLat_Lon2(place?.geometry?.location?.lng())
      // setSelectedPlace(place);
      // if (place.geometry && place.geometry.location && map) {
      //   map.panTo(place.geometry.location);
      //   map.setZoom(15);
      // }
    }
  };

      const handleBackClick = () => {
        prevStep();
      };

      const handleClick = async(e) => {
        e.preventDefault()
          
        if (locationName == '') {
          toast.error('Please enter location');
          return;
          }
          if (landmark == '') {
          toast.error('Please enter landmark');
          return;
          }
          
        
        setIsLoading(true);
      
            let formdata = new FormData();
            formdata.append('id', passData?.data?.id);
            formdata.append('locality', locationName);
            formdata.append('latitude', lat_lon1);
            formdata.append('longitude', lat_lon2);
            formdata.append('street_landmark', landmark);
              // Display the key/value pairs
        // for (var pair of formdata.entries()) {
        //   console.log(pair[0]+ ', ' + pair[1]); 
        // }
        // return
        const res = await post_properties_step2(formdata)
        setIsLoading(false);
        console.log(res)
        if(res.status){
          handleDataChange(res);
          incrementStep()
        }
      
        };
        


const onLoad = (ref) => {
  // Set the input reference to the search box
  this.searchBox = ref;
};

const onPlacesChanged = () => {
  const places = this.searchBox.getPlaces();
  if (places.length === 0) {
    return;
  }
  // Get more information about the selected place
  const bounds = new window.google.maps.LatLngBounds();
  places.forEach((place) => {
    if (!place.geometry || !place.geometry.location) {
      console.log("Returned place contains no geometry");
      return;
    }
    if (place.geometry.viewport) {
      // Only geocodes have viewport.
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
  });
  const nextMarkers = places.map((place) => ({
    position: place.geometry.location,
  }));
  const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

  setSelectedPlace({
    center: nextCenter,
    markers: nextMarkers,
  });
};


const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

  return (
    <div class="form-submit"> 
        <h3>Location</h3>
        <div class="submit-section">
            <div class="row">     
              {/* <div class="form-group col-md-6">
                    <label>Locality</label>
                    <input value={landmark} onChange={(e) => setLandmark(e.target.value)}  type="text" class="form-control"/>
                </div>     */}
 <LoadScript
      googleMapsApiKey="AIzaSyARs4jTZWV3jQ1ejL7MkCDSpIflMyyQSjk"
      libraries={['places']}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        <StandaloneSearchBox
          onLoad={onLoad}
          onPlacesChanged={onPlacesChanged}
        >
          <input
            type="text"
            placeholder="Search for places"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
            }}
          />
        </StandaloneSearchBox>
        {selectedPlace && (
          <div>
            <h3>Selected Place:</h3>
            <p>Lat: {selectedPlace.center.lat}</p>
            <p>Lng: {selectedPlace.center.lng}</p>
          </div>
        )}
      </GoogleMap>
    </LoadScript>
    
                <div class="form-group col-md-6">
                    <label>Street/Area/Landmark</label>
                    <input value={landmark} onChange={(e) => setLandmark(e.target.value)}  type="text" class="form-control"/>
                </div>
                
                <div style={{display:'flex', justifyContent:'space-between'}} class="form-group col-lg-12 col-md-12">
                  <button onClick={() => {
                                        handleBackClick()
                    } }class="btn btn-primary fw-medium px-5" type="button">Previous</button>
                    <LoaderButton title={'Next'} onClick={(e) =>handleClick(e)} isLoading={isLoading}/>
                </div>
                  <div className='rr'>
                    {/* <LocationSearchComponent/> */}
                  </div>
                <ToastContainer />
            </div>
        </div>
    </div>
  )
}
const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  };
  
  const spinnerStyle = {
  width: '16px',
  height: '16px',
  border: '2px solid #f3f3f3',
  borderTop: '2px solid #3498db',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  };
export default Step2