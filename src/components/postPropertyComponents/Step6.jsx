import React, {useState} from 'react'
import LoaderButton from '../LoaderButton/LoaderButton';
import { post_properties_step7 } from '../../api/auth';
import { ToastContainer, toast } from 'react-toastify';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Step6 = ({ stepNumber, currentStep, incrementStep, prevStep, passData, handleDataChange }) => {
	const navigate = useNavigate()
	const MySwal = withReactContent(Swal);
	const [startTime, setStartTime] = useState('');
	const [startTime12, setStartTime12] = useState('');
	const [endTime, setEndTime] = useState('');
	const [endTime12, setEndTime12] = useState('');
	const [days, setDays] = useState([
		{
			id: 1,
			name: "Monday",
			checked: false
		},
		{
			id: 2,
			name: "Tuesday",
			checked: false
		},
		{
			id: 3,
			name: "Wednesday",
			checked: false
		},
		{
			id: 4,
			name: "Thursday",
			checked: false
		},
		{
			id: 5,
			name: "Friday",
			checked: false
		},
		{
			id: 6,
			name: "Saturday",
			checked: false
		},
		{
			id: 7,
			name: "Sunday",
			checked: false
		},
	]);
	const [isLoading, setIsLoading] = useState(false);

	const getCheckedIds = () => {
		const checkedIds = days
		  .filter((checkbox) => checkbox.checked) // Filter the checked items
		  .map((checkbox) => checkbox.name); // Get the ids of checked items
		console.log('Checked IDs:', checkedIds);
		return checkedIds;
	  };
	  

  const handleCheckboxChange = (id) => {
    setDays((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox
      )
    );
  };

  const convertTo12HourFormat = (time, type) => {
	console.log(time)
    const [hours, minutes] = time.split(':');
    const hours12 = (hours % 12) || 12; // Convert hour to 12-hour format, ensuring "0" becomes "12"
    const amPm = hours >= 12 ? 'PM' : 'AM';
	if(type == 1) {
		setStartTime12(`${hours12}:${minutes} ${amPm}`)
	} else{
		setEndTime12(`${hours12}:${minutes} ${amPm}`)
	}
  };

  const handleClick = async() => {

    if(startTime == ""){
      toast.error("Please select start time")
      return
    }

    if(endTime == ""){
      toast.error("Please select end time")
      return
    }

	const ff = getCheckedIds()

    if(ff.length == 0){
      toast.error("Please select days from list of weekdays")
      return
    }


    setIsLoading(true);
	let formdata = new FormData();
    formdata.append('id', passData?.data?.id);
    formdata.append('viewing_times', `${startTime12}-${endTime12}`);
    formdata.append('viewing_days', ff);

    const res = await post_properties_step7(formdata)
    setIsLoading(false);
    console.log(res)
    if(res.status){
		showAlert(res)
    }

  }

  const showAlert = async(res) => {
	MySwal.fire({
		title: "Property added successfully",
		icon: "success",
		cancelButtonColor: "#d33",
		confirmButtonText: "Add More",
		showDenyButton: true,
		denyButtonText: "View Property"
	  }).then((result) => {
		if (result.isConfirmed) {
			// Swal.fire("Saved!", "", "success");
			navigate("/post_property")
		  } else if (result.isDenied) {

			navigate(`/property_details/${res.user_id}/${res.id}`)
			// Swal.fire("Changes are not saved", "", "info");
		  }
	  });
}
  
  return (
     <div class="form-submit">	
									<h3>Add Property Viewing Details</h3>
									<div class="submit-section">
										<div class="row">
										
                                        <div class="form-group col-md-6">
												<label>Start Time</label>
												<input
													type="time"
													id="time"
													value={startTime}
													class="form-control"
													onChange={e => {

														setStartTime(e.target.value)
														convertTo12HourFormat(e.target.value, 1)
													}}
													/>
											</div>
                                        <div class="form-group col-md-6">
												<label>End Time</label>
												<input
													type="time"
													id="time"
													value={endTime}
													class="form-control"
													onChange={e => {
														setEndTime(e.target.value)
														convertTo12HourFormat(e.target.value, 2)
													}}
													/>
											</div>

                                            <div class="form-group col-md-12">
												<label>Select Days</label>
												<div class="o-features">
													<ul class="no-ul-list ">

														{days?.map((checkbox) => (
															<li>
																<input
																	type="checkbox"
																	class="form-check-input"
																	id={`checkbox-${checkbox.id}`}
																	checked={checkbox.checked}
																	onChange={() => handleCheckboxChange(checkbox.id)}
																 	/>
																	{" "}
																<label for="a-1" class="form-check-label">{checkbox.name}</label>
															</li>	
														))}
														{/* <li>
															<input id="a-1" class="form-check-input" name="a-1" type="checkbox"/>
															<label for="a-1" class="form-check-label">Monday</label>
														</li>
														<li>
															<input id="a-2" class="form-check-input" name="a-2" type="checkbox"/>
															<label for="a-2" class="form-check-label">Tuesday</label>
														</li>
														<li>
															<input id="a-3" class="form-check-input" name="a-3" type="checkbox"/>
															<label for="a-3" class="form-check-label">Wednesday</label>
														</li>
														<li>
															<input id="a-4" class="form-check-input" name="a-4" type="checkbox"/>
															<label for="a-4" class="form-check-label">Thursday</label>
														</li>
														<li>
															<input id="a-5" class="form-check-input" name="a-5" type="checkbox"/>
															<label for="a-5" class="form-check-label">Friday</label>
														</li>
														<li>
															<input id="a-6" class="form-check-input" name="a-6" type="checkbox"/>
															<label for="a-6" class="form-check-label">Saturday</label>
														</li>
														<li>
															<input id="a-7" class="form-check-input" name="a-7" type="checkbox"/>
															<label for="a-7" class="form-check-label">Sunday</label>
														</li> */}
														
														
														
													</ul>
												</div>
											</div>
											
											<div class="form-group col-lg-12 col-md-12">
									<LoaderButton title={"Submit"} onClick={(e) => handleClick(e)} isLoading={isLoading}/>
								</div>

										</div>
									</div>
									<ToastContainer/>
								</div> 
  )
}

export default Step6