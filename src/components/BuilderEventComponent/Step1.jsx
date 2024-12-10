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
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const Step1 = ({ stepNumber, currentStep, incrementStep, prevStep, handleDataChange }) => {
  const navigate = useNavigate()
  const MySwal = withReactContent(Swal);
  //UseState for My Field
  const [isLoading, setIsLoading] = useState(false);
  const [eventTopic, seteventTopic] = useState('');
  const [eventDate, seteventDate] = useState('');
  const [duration, setduration] = useState('');  

  const handleClick = async(e) => {
	e.preventDefault()
    
	if (eventTopic == '') {
		toast.error('Please enter event topic');
		return;
	  }
	  if (eventDate == '') {
		toast.error('Please enter event date');
		return;
	  }
	  if (duration == '') {
		toast.error('Please enter event duration');
		return;
	  }
	 
        // console.log(eventDate)
        // return
	    setIsLoading(true);
        handleDataChange({eventTopic, eventDate, duration});
        setTimeout(() =>{
            incrementStep()
        },1000)
	
  };


  return (
    <div class="form-submit">
      {/* <h3>Basic Information</h3> */}
      <div class="submit-section">
        <div class="row">
          <div class="form-group col-md-6">
            <label>Event Topic</label>
            <input value={eventTopic}
              onChange={(e) => seteventTopic(e.target.value)} type="text" class="form-control" />
          </div>
          <div class="form-group col-md-6">
            <label>Date</label>
            <input style={{colorScheme:"dark"}} value={eventDate}
              onChange={(e) => seteventDate(e.target.value)} type="datetime-local" class="form-control" />
          </div>
          <div class="form-group col-md-6">
            <label>Duration</label>
            <input value={duration}
              onChange={(e) => setduration(e.target.value)} type="text" class="form-control" />
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
