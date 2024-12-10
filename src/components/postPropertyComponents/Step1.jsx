import React, { useEffect, useState } from "react";
import {
  age_master,
  bhk_type_master,
  facing_master,
  floor_master,
  master_building_type,
  post_properties_step1,
  property_type_master,
} from "../../api/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoaderButton from "../LoaderButton/LoaderButton";


const Step1 = ({ stepNumber, currentStep, incrementStep, prevStep, handleDataChange }) => {
  //useState for Master Data
  const [propertyTypeMaster, setPropertyTypeMaster] = useState([]);
  const [bhkTypeMaster, setBhkTypeMaster] = useState([]);
  const [buldingTypeMaster, setBuildingTypeMaster] = useState([]);
  const [facingMaster, setFacingMaster] = useState([]);
  const [ageMaster, setAgeMaster] = useState([]);
  const [floorMaster, setFloorMaster] = useState([]);

  //UseState for My Field
  const [isLoading, setIsLoading] = useState(false);

  const [propertyAs, setPropertyAs] = useState("1");
  const [name, setname] = useState("");
  const [cityName, setCityName] = useState('');
  const [selectedproperty, setSelectedproperty] = useState('');
  const [selectedbhk, setSelectedbhk] = useState('');
  const [selectedbuildingType, setSelectedbuildingType] = useState('');
  const [propertysize, setpropertysize] = useState('');
  const [selectedfacing, setSelectedfacing] = useState('');
  const [selectedage, setSelectedage] = useState('');
  const [selectedfloor, setSelectedfloor] = useState('');
  const [apartmentno, setApartmentno] = useState('');
  const [description, setDescription] = useState('');  


  useEffect(() => {
    getPropretyTypeMaster();
    getBHKtypeMaster();
    getBuildingType();
    getFacingType();
    getAgeMaster();
    getFloorMaster();
  }, []);

  const getPropretyTypeMaster = async () => {
    const res = await property_type_master();
    if (res.status) {
      let temp = res.data?.map((i) => {
        return i.name;
      });
      setPropertyTypeMaster(temp);
    }
  };
  const getBHKtypeMaster = async () => {
    const res = await bhk_type_master();
    if (res.status) {
      let temp = res.data?.map((i) => {
        return i.name;
      });
      setBhkTypeMaster(temp);
    }
  };
  const getBuildingType = async () => {
    const res = await master_building_type();
    console.log(res)
    if (res.status) {
      let temp = res.data?.map((i) => {
        return {name:i.name, id:i.id};
      });
      setBuildingTypeMaster(temp);
    }
  };
  const getFacingType = async () => {
    const res = await facing_master();
    if (res.status) {
      let temp = res.data?.map((i) => {
        return i.name;
      });
      setFacingMaster(temp);
    }
  };
  const getAgeMaster = async () => {
    const res = await age_master();
    if (res.status) {
      let temp = res.data?.map((i) => {
        return i.name;
      });
      setAgeMaster(temp);
    }
  };
  const getFloorMaster = async () => {
    const res = await floor_master();
    if (res.status) {
      let temp = res.data?.map((i) => {
        return i.name;
      });
      setFloorMaster(temp);
    }
  };


  const handleClick = async(e) => {
	e.preventDefault()
    
	if (cityName == '') {
		toast.error('Please enter city name');
		return;
	  }
	  if (name == '') {
		toast.error('Please enter apartment name');
		return;
	  }
	  if (selectedproperty == '') {
		toast.error('Please select property type');
		return;
	  }
	  if (selectedbhk == '') {
		toast.error('Please select bhk value');
		return;
	  }
	  if (propertysize == '') {
		toast.error('Please enter property size');
		return;
	  }
	  if (selectedfacing == '') {
		toast.error('Please select facing value');
		return;
	  }

	  if (selectedage == '') {
		toast.error('Please select property age value');
		return;
	  }
	  if (selectedfloor == '') {
		toast.error('Please select floor value');
		return;
	  }
	  if (apartmentno == '') {
		toast.error('Please enter apartment number');
		return;
	  }
	  if (description == '') {
		toast.error('Please enter description');
		return;
	  }
	
	setIsLoading(true);

	const id = await localStorage.getItem("user_id")
	let formdata = new FormData();
	formdata.append('user_id', id);
	formdata.append('post_property', propertyAs);
	formdata.append('city', cityName);
	formdata.append('apartment_name', name);
	formdata.append('property_type', selectedproperty);
	formdata.append('bhk_type', selectedbhk),
	// formdata.append('propert_size', propertysize),
	formdata.append('facing', selectedfacing),
	formdata.append('propert_age', selectedage);
	formdata.append('floor', selectedfloor);
	formdata.append('apartment_no', apartmentno);
	formdata.append('description', description);

  if(propertyAs == "2"){
    formdata.append('building_type_id', selectedbuildingType);
    formdata.append('built_up_area', propertysize);
  }else{
    formdata.append('propert_size', propertysize)
  }

  // Display the key/value pairs
// for (var pair of formdata.entries()) {
//   console.log(pair[0]+ ', ' + pair[1]); 
// }
// return

	const res = await post_properties_step1(formdata)
	setIsLoading(false);
	console.log(res)
	if(res.status){
		handleDataChange(res);
		incrementStep()
	}

  };

  return (
    <div class="form-submit">
      <h3>Basic Information</h3>
      <div class="submit-section">
        <div class="row">
          <div class="form-group col-md-6">
            <label>Post property as</label>
            <select
              value={propertyAs}
              onChange={(e) => setPropertyAs(e.target.value)}
              id="status"
              class="form-control"
            >
              {/* <option value="">Select</option> */}
              <option value="1">Landlord</option>
              <option value="2">Builder</option>
            </select>
          </div>

          <div class="form-group col-md-6">
            <label>City</label>
            <input value={cityName}
              onChange={(e) => setCityName(e.target.value)} type="text" class="form-control" />
          </div>

          <div class="form-group col-md-6">
            <label>
              Apartment/Building Name
              <span class="tip-topdata" data-tip="Property Title">
                <i class="fa-solid fa-info"></i>
              </span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              class="form-control"
            />
          </div>

          <div class="form-group col-md-6">
            <label>Property Type</label>
            <select value={selectedproperty}
              onChange={(e) => setSelectedproperty(e.target.value)} id="ptypes" class="form-control">
				<option value="">Select</option>
              {propertyTypeMaster?.map((i) => (
                <option value={i}>{i}</option>
              ))}
            </select>
          </div>

          {propertyAs == "2" && (
            <div class="form-group col-md-6">
            <label>Building Type</label>
            <select value={selectedbuildingType}
              onChange={(e) => setSelectedbuildingType(e.target.value)} id="ptypes" class="form-control">
				      <option value="">Select</option>
              {buldingTypeMaster?.map((i) => (
                <option value={i.id}>{i.name}</option>
              ))}
            </select>
          </div>
          )}
          

          <div class="form-group col-md-6">
            <label>BHK Type</label>
            <select value={selectedbhk}
              onChange={(e) => setSelectedbhk(e.target.value)} id="bedrooms" class="form-control">
              <option value="">Select</option>
              {bhkTypeMaster?.map((i) => (
                <option value={i}>{i}</option>
              ))}
            </select>
          </div>

          {propertyAs == "1" ? 
            <div class="form-group col-md-6">
            <label>Property Size</label>
            <input value={propertysize}
              onChange={(e) => setpropertysize(e.target.value)} type="text" class="form-control" />
          </div> :

          <div class="form-group col-md-6">
          <label>Build Up Area</label>
          <input value={propertysize}
            onChange={(e) => setpropertysize(e.target.value)} type="text" class="form-control" />
          </div>
          }
          

          <div class="form-group col-md-6">
            <label>Facing</label>
            <select  value={selectedfacing}
              onChange={(e) => setSelectedfacing(e.target.value)} id="bedrooms" class="form-control">
              <option value="">Select</option>
              {facingMaster?.map((i) => (
                <option value={i}>{i}</option>
              ))}
            </select>
          </div>

          <div class="form-group col-md-6">
            <label>Property Age</label>
            <select  value={selectedage}
              onChange={(e) => setSelectedage(e.target.value)} id="bage" class="form-control">
              <option value="">Select</option>
              {ageMaster?.map((i) => (
                <option value={i}>{i}</option>
              ))}
            </select>
          </div>

          <div class="form-group col-md-6">
            <label>Floor</label>
            <select  value={selectedfloor}
              onChange={(e) => setSelectedfloor(e.target.value)} id="bage" class="form-control">
              <option value="">Select</option>
              {floorMaster?.map((i) => (
                <option value={i}>{i}</option>
              ))}
            </select>
          </div>

          <div class="form-group col-md-6">
            <label>
              Apartment Number
              <span class="tip-topdata" data-tip="Property Title">
                <i class="fa-solid fa-info"></i>
              </span>
            </label>
            <input  value={apartmentno}
              onChange={(e) => setApartmentno(e.target.value)} type="text" class="form-control" />
          </div>

          <div class="form-group col-md-12">
            <label>Description</label>
            <textarea  value={description}
              onChange={(e) => setDescription(e.target.value)} class="form-control h-120"></textarea>
          </div>
        </div>
        <div class="form-group col-lg-12 col-md-12">
		<LoaderButton title={'Next'} onClick={(e) =>handleClick(e)} isLoading={isLoading}/>
        </div>
      </div>
	  <ToastContainer />
    </div>
  );
};


export default Step1;
