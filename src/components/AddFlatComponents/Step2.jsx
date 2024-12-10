import React,{useState, useEffect, useContext} from 'react'
import GooglePlacesAutocomplete,  { geocodeByLatLng } from 'react-google-places-autocomplete';
import Autocomplete from "react-google-autocomplete";
import { usePlacesWidget } from "react-google-autocomplete";
import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from "react-geocode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { post_properties_step2 } from '../../api/auth';
import LoaderButton from '../LoaderButton/LoaderButton';
import GoogleMapReact from 'google-map-react';
import { GlobalContext } from '../../contexts/GlobalProvider';
const Step2 = ({ stepNumber, currentStep, incrementStep, prevStep, passData, handleDataChange }) => {
  const { globalData, setGlobalData } = useContext(GlobalContext);
  // console.log(globalData)

  setKey("AIzaSyARs4jTZWV3jQ1ejL7MkCDSpIflMyyQSjk");
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [landmark, setLandmark] = useState('');
  const [lat_lon1, setLat_Lon1] = useState();
  const [lat_lon2, setLat_Lon2] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setLocationName(globalData?.user?.locality)
    setLandmark(globalData?.user?.street_landmark)
    setLat_Lon1(parseFloat(globalData?.Add_Flat_Lat_Lon?.Lat))
    setLat_Lon2(parseFloat(globalData?.Add_Flat_Lat_Lon?.Lon))
  },[])
    const { ref, autocompleteRef } = usePlacesWidget({
        apiKey:"AIzaSyARs4jTZWV3jQ1ejL7MkCDSpIflMyyQSjk",
        onPlaceSelected: (place) => {
          
          setLat_Lon1(place?.geometry?.location?.lat())
          setLat_Lon2(place?.geometry?.location?.lng())
          // console.log(place.geometry.location);
          // alert("hi")
          setLocationName(place?.formatted_address)
          // fromAddress(place)
          //     .then(({ results }) => {
          //       console.log(results)
          //       // setLocationName(results?.[0]?.formatted_address)
          //       const { lat, lng } = results[0].geometry.location;
          //       console.log(lat, lng);
          //     })
          //     .catch(console.error);
        }
      });

      const handleButtonClick = () => {
        incrementStep();
      };
      
      const handleBackClick = () => {
        prevStep();
      };

      const getCurrentLoc = async() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log(position)
              fromLatLng(position.coords.latitude, position.coords.longitude)
              .then(({ results }) => {
                console.log(results)
                setLocationName(results?.[0]?.formatted_address)
                const { lat, lng } = results[0].geometry.location;
                console.log(lat, lng);
              })
              .catch(console.error);


              // geocodeByLatLng({ lat: position.coords.latitude, lng: position.coords.longitude })
              //   .then(results => {
              //     console.log(results)
              //     setLocationName(results[0]?.formatted_address)
              //   })
              //   .catch(error => console.error(error));

              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              });
            },
            (err) => {
              setError('Unable to retrieve your location');
            }
          );
        } else {
          setError('Geolocation is not supported by your browser');
        }
      }

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
            formdata.append('id', globalData?.Updated_Res_Data?.id);
            formdata.append('locality', locationName);
            formdata.append('latitude', lat_lon1);
            formdata.append('longitude', lat_lon2);
            formdata.append('street_landmark', landmark);
              // Display the key/value pairs
        // for (var pair of formdata.entries()) {
        //   console.log(pair[0]+ ', ' + pair[1]); 
        // }
        // return
        const res = await post_properties_step2(formdata)
        setIsLoading(false);
        console.log(res)
        if(res.status){
          // handleDataChange(res);
          setGlobalData({ ...globalData,  Updated_Res_Data: res.data, Add_Flat_ID: res.data.id, });
          incrementStep()
        }
      
        };
        

  return (
    <div class="form-submit">	
        <h3>Location</h3>
        <div class="submit-section">
            <div class="row">
            
                <div class="form-group col-md-6">
                    <label>Locality</label>
                    <input ref={ref} type="text" class="form-control"/>
                    {/* <GooglePlacesAutocomplete
                        selectProps={{
                          locationName,
                          onChange:
                            setLocationName,
                         
                       
                                    }}
                                    apiKey="AIzaSyARs4jTZWV3jQ1ejL7MkCDSpIflMyyQSjk"
                                    /> */}
                                    <label onClick={()=> getCurrentLoc()}>Use current location</label>
                    {/* <Autocomplete
                        apiKey="AIzaSyARs4jTZWV3jQ1ejL7MkCDSpIflMyyQSjk"
                        onPlaceSelected={(place) => {
                            console.log(place);
                        }}
                        /> */}
                </div>
                
                
                
                <div class="form-group col-md-6">
                    <label>Street/Area/Landmark</label>
                    <input value={landmark} onChange={(e) => setLandmark(e.target.value)}  type="text" class="form-control"/>
                </div>
                
                <div style={{display:'flex', justifyContent:'space-between'}} class="form-group col-lg-12 col-md-12">
									<button onClick={() => {
                                        handleBackClick()
										} }class="btn btn-primary fw-medium px-5" type="button">Previous</button>
                    <LoaderButton title={'Next'} onClick={(e) =>handleClick(e)} isLoading={isLoading}/>
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