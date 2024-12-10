import React,{useEffect, useState} from 'react'
import { bhk_type_master, property_type_master } from '../api/auth';
import { Stepper } from 'react-form-stepper';
import Step1 from '../components/postPropertyComponents/Step1';
import Step2 from '../components/postPropertyComponents/Step2';
import Step3 from '../components/postPropertyComponents/Step3';
import Step4 from '../components/postPropertyComponents/Step4';
import Step5 from '../components/postPropertyComponents/Step5';
import Step6 from '../components/postPropertyComponents/Step6';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LocationSearchComponent from '../components/postPropertyComponents/LocationSearchComponent';


function PostProperty() {

	const [goSteps, setGoSteps] = useState(0);
	const [currentStep, setCurrentStep] = useState(1);
	const [passData, setPassData] = useState({});

	const incrementStep = () => {
	  setCurrentStep((prevStep) => prevStep + 1);
	};

	const prevStep = () => {
		setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
	  };

	    // Function to handle data update
  const handleDataChange = (newData) => {
    // setPassData({ ...passData, ...newData });
    setPassData(newData);
  };


  return (
    <>
			<Header/>

            {/* <!-- ============================ Submit Property Start ================================== --> */}
			<section class="gray-simple">
				<div class="container">
					
					{/* <!-- row Start --> */}
					<div class="row">						
						<div class="col-lg-12 col-md-12">	
							<div id="login-frm" class="collapse mb-5">
								<div class="row">
									
									<div class="col-lg-5 col-md-4 col-sm-6">
										<div class="form-group">
											<div class="input-with-icons">
												<input type="text" class="form-control" placeholder="Username"/>
											</div>
										</div>
									</div>
									
									<div class="col-lg-5 col-md-4 col-sm-6">
										<div class="form-group">
											<div class="input-with-icons">
												<input type="text" class="form-control" placeholder="*******"/>
											</div>
										</div>
									</div>
									
									<div class="col-lg-2 col-md-4 col-sm-12">
										<div class="form-group">
											<button type="submit" class="btn btn-primary full-width">Submit</button>
										</div>
									</div>
									
									<div class="col-lg-12 col-md-12 col-sm-12">
										<div class="exclop-wrap d-flex align-items-center justify-content-between">
											<div class="exclop">
												<input id="a-1" class="form-check-input" name="a-1" type="checkbox"/>
												<label for="a-1" class="form-check-label">Remember Me</label>
											</div>
											<div class="exclop-last">
												<a href="#" class="fw-medium text-primary">Forget Password?</a>
											</div>
										</div>
									</div>
									
								</div>
							</div>
						</div>
					</div>
					{/* <!-- /row --> */}
					
					<div class="row">
						
						{/* <!-- Submit Form --> */}
						<div class="col-lg-12 col-md-12">
						
						<Stepper
							steps={[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }, { label: 'Step 4' }, { label: 'Step 5' }, { label: 'Step 6' }]}
							activeStep={currentStep-1}
							/>

							<div class="submit-page">
								
								{/* <!-- Basic Information --> */}
								{/* <div class="form-submit">	
									<h3>Basic Information</h3>
									<div class="submit-section">
										<div class="row">
										
                                            <div class="form-group col-md-6">
												<label>Post property as</label>
												<select value={propertyAs} onChange={(e) => setPropertyAs(e.target.value)} id="status" class="form-control">
													
													<option value="1">Landlord</option>
													<option value="2">Builder</option>
												</select>
											</div>

											<div class="form-group col-md-6">
												<label>Apartment/Building Name<span class="tip-topdata" data-tip="Property Title"><i class="fa-solid fa-info"></i></span></label>
												<input type="text" value={name} onChange={(e) => setname(e.target.value)} class="form-control"/>
											</div>
											
                                            <div class="form-group col-md-6">
												<label>Property Type</label>
												<select id="ptypes" class="form-control">
													{propertyTypeMaster?.map((i) => (
														<option value={i}>{i}</option>
													))}
													
												</select>
											</div>

                                            <div class="form-group col-md-6">
												<label>BHK Type</label>
												<select id="bedrooms" class="form-control">
													<option value="">Select</option>
													{bhkTypeMaster?.map((i) => (
															<option value={i}>{i}</option>
														))}
													
												</select>
											</div>

                                            <div class="form-group col-md-6">
												<label>Property Size</label>
												<input type="text" class="form-control"/>
											</div>

                                            <div class="form-group col-md-6">
												<label>Facing</label>
												<select id="bedrooms" class="form-control">
													<option value="">&nbsp;</option>
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
												</select>
											</div>

                                            <div class="form-group col-md-6">
												<label>Property Age</label>
												<select id="bage" class="form-control">
													<option value="">&nbsp;</option>
													<option value="1">0 - 5 Years</option>
													<option value="2">0 - 10Years</option>
													<option value="3">0 - 15 Years</option>
													<option value="4">0 - 20 Years</option>
													<option value="5">20+ Years</option>
												</select>
											</div>

                                            <div class="form-group col-md-6">
												<label>Floor</label>
												<select id="bage" class="form-control">
													<option value="">&nbsp;</option>
													<option value="1">0 - 5 Years</option>
													<option value="2">0 - 10Years</option>
													<option value="3">0 - 15 Years</option>
													<option value="4">0 - 20 Years</option>
													<option value="5">20+ Years</option>
												</select>
											</div>

                                            <div class="form-group col-md-6">
												<label>Apartment Number<span class="tip-topdata" data-tip="Property Title"><i class="fa-solid fa-info"></i></span></label>
												<input type="text" class="form-control"/>
											</div>

											<div class="form-group col-md-6">
												<label>Property available for</label>
												<select id="status" class="form-control">
													<option value="">&nbsp;</option>
													<option value="1">For Rent</option>
													<option value="2">For Sale</option>
												</select>
											</div>
											
										</div>
									</div>
								</div> */}

								{currentStep == 1 && <Step1 passData={passData} incrementStep={incrementStep} handleDataChange={handleDataChange} />}
								{/* {currentStep == 1 && <LocationSearchComponent/>} */}

								
                                {/* <!-- Location --> */}
								{/* <div class="form-submit">	
									<h3>Location</h3>
									<div class="submit-section">
										<div class="row">
										
											<div class="form-group col-md-6">
												<label>Address</label>
												<input type="text" class="form-control"/>
											</div>
											
											<div class="form-group col-md-6">
												<label>City</label>
												<input type="text" class="form-control"/>
											</div>
											
											<div class="form-group col-md-6">
												<label>Street/Area/Landmark</label>
												<input type="text" class="form-control"/>
											</div>
											
											
										</div>
									</div>
								</div> */}

								{currentStep == 2 && <Step2 passData={passData} incrementStep={incrementStep} prevStep={prevStep} handleDataChange={handleDataChange} />}
								{currentStep == 3 && <Step3 passData={passData} incrementStep={incrementStep} prevStep={prevStep} handleDataChange={handleDataChange} />}
								{currentStep == 4 && <Step4 passData={passData} incrementStep={incrementStep} prevStep={prevStep} handleDataChange={handleDataChange}/>}
								{currentStep == 5 && <Step5 passData={passData} incrementStep={incrementStep} prevStep={prevStep} handleDataChange={handleDataChange}/>}
								{currentStep == 6 && <Step6 passData={passData} incrementStep={incrementStep} prevStep={prevStep} handleDataChange={handleDataChange}/>}
								
								
								
								
								{/* <!-- Detailed Information --> */}
								{/* <div class="form-submit">	
									<h3>Detailed Information</h3>
									<div class="submit-section">
										<div class="row">
										
											<div class="form-group col-md-12">
												<label>Description</label>
												<textarea class="form-control h-120"></textarea>
											</div>
											
                                            <div class="form-group col-md-6">
												<label>Property available for</label>
												<select id="status" class="form-control">
													<option value="">&nbsp;</option>
													<option value="1">For Rent</option>
													<option value="2">For Sale</option>
												</select>
											</div>

                                            <div class="form-group col-md-6">
												<label>Currency</label>
												<select id="status" class="form-control">
													<option value="">&nbsp;</option>
													<option value="1">$</option>
													<option value="2">$</option>
												</select>
											</div>
											
											<div class="form-group col-md-6">
												<label>Expected Rent (Per Month)</label>
												<input type="text" class="form-control"/>
											</div>

                                            <div class="form-group col-md-6">
												<label>Expected Deposit</label>
												<input type="text" class="form-control"/>
											</div>

                                            <div class="form-group col-md-6">
												<label>Selling Price</label>
												<input type="text" class="form-control"/>
											</div>

                                            <div class="form-group col-md-6">
												<label>Monthly Maintenance</label>
												<input type="text" class="form-control"/>
											</div>

                                            <div class="form-group col-md-6">
												<label>Available From</label>
												<select id="status" class="form-control">
													<option value="">&nbsp;</option>
													<option value="1">Available</option>
													<option value="2">Not Available</option>
												</select>
											</div>

                                            <div class="form-group col-md-6">
												<label>Furnishing</label>
												<select id="status" class="form-control">
													<option value="">&nbsp;</option>
													<option value="1">Clean Furnishing</option>
													<option value="2">Floor Furnishing</option>
												</select>
											</div>

											<div class="form-group col-md-4">
												<label>Bathroom(s)</label>
												<select id="garage" class="form-control">
													<option value="">&nbsp;</option>
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
												</select>
											</div>
											
											<div class="form-group col-md-4">
												<label>Balcony(s)</label>
												<select id="rooms" class="form-control">
													<option value="">&nbsp;</option>
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
												</select>
											</div>

											<div class="form-group col-md-4">
												<label>Beds(s)</label>
												<select id="rooms" class="form-control">
													<option value="">&nbsp;</option>
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
												</select>
											</div>
											
                                            <div class="form-group col-md-4">
												<label>Non-Veg allowed</label>
												<select id="status" class="form-control">
													<option value="">&nbsp;</option>
													<option value="1">Clean Furnishing</option>
													<option value="2">Floor Furnishing</option>
												</select>
											</div>

                                            <div class="form-group col-md-4">
												<label>Gated Security</label>
												<select id="status" class="form-control">
													<option value="">&nbsp;</option>
													<option value="1">Clean Furnishing</option>
													<option value="2">Floor Furnishing</option>
												</select>
											</div>

                                            <div class="form-group col-md-4">
												<label>Gym</label>
												<select id="status" class="form-control">
													<option value="">&nbsp;</option>
													<option value="1">Clean Furnishing</option>
													<option value="2">Floor Furnishing</option>
												</select>
											</div>

											<div class="form-group col-md-12">
												<label>Other Features (optional)</label>
												<div class="o-features">
													<ul class="no-ul-list third-row">
														<li>
															<input id="a-1" class="form-check-input" name="a-1" type="checkbox"/>
															<label for="a-1" class="form-check-label">Air Condition</label>
														</li>
														<li>
															<input id="a-2" class="form-check-input" name="a-2" type="checkbox"/>
															<label for="a-2" class="form-check-label">Bedding</label>
														</li>
														<li>
															<input id="a-3" class="form-check-input" name="a-3" type="checkbox"/>
															<label for="a-3" class="form-check-label">Heating</label>
														</li>
														<li>
															<input id="a-4" class="form-check-input" name="a-4" type="checkbox"/>
															<label for="a-4" class="form-check-label">Internet</label>
														</li>
														<li>
															<input id="a-5" class="form-check-input" name="a-5" type="checkbox"/>
															<label for="a-5" class="form-check-label">Microwave</label>
														</li>
														<li>
															<input id="a-6" class="form-check-input" name="a-6" type="checkbox"/>
															<label for="a-6" class="form-check-label">Smoking Allow</label>
														</li>
														<li>
															<input id="a-7" class="form-check-input" name="a-7" type="checkbox"/>
															<label for="a-7" class="form-check-label">Terrace</label>
														</li>
														<li>
															<input id="a-8" class="form-check-input" name="a-8" type="checkbox"/>
															<label for="a-8" class="form-check-label">Balcony</label>
														</li>
														<li>
															<input id="a-9" class="form-check-input" name="a-9" type="checkbox"/>
															<label for="a-9" class="form-check-label">Icon</label>
														</li>
														<li>
															<input id="a-10" class="form-check-input" name="a-10" type="checkbox"/>
															<label for="a-10" class="form-check-label">Wi-Fi</label>
														</li>
														<li>
															<input id="a-11" class="form-check-input" name="a-11" type="checkbox"/>
															<label for="a-11" class="form-check-label">Beach</label>
														</li>
														<li>
															<input id="a-12" class="form-check-input" name="a-12" type="checkbox"/>
															<label for="a-12" class="form-check-label">Parking</label>
														</li>
													</ul>
												</div>
											</div>
											
										</div>
									</div>
								</div> */}
								
                                {/* <!-- Gallery --> */}
								{/* <div class="form-submit">	
									<h3>Gallery</h3>
									<div class="submit-section">
										<div class="row">
										
											<div class="form-group col-md-12">
												<label>Upload Gallery</label>
												<form action="https://shreethemes.net/upload-target" class="dropzone dz-clickable primary-dropzone">
													<div class="dz-default dz-message">
														<i class="fa-solid fa-images"></i>
														<span>Drag & Drop To Change Logo</span>
													</div>
												</form>
											</div>
											
										</div>
									</div>
								</div> */}

								{/* <!-- Contact Information --> */}
								{/* <div class="form-submit">	
									<h3>Add Property Viewing Details</h3>
									<div class="submit-section">
										<div class="row">
										
                                        <div class="form-group col-md-6">
												<label>Start Time</label>
												<select id="status" class="form-control">
													<option value="">&nbsp;</option>
													<option value="1">Clean Furnishing</option>
													<option value="2">Floor Furnishing</option>
												</select>
											</div>
                                        <div class="form-group col-md-6">
												<label>End Time</label>
												<select id="status" class="form-control">
													<option value="">&nbsp;</option>
													<option value="1">Clean Furnishing</option>
													<option value="2">Floor Furnishing</option>
												</select>
											</div>

                                            <div class="form-group col-md-12">
												<label>Select Days</label>
												<div class="o-features">
													<ul class="no-ul-list ">
														<li>
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
														</li>
														
														
														
													</ul>
												</div>
											</div>
											
											
										</div>
									</div>
								</div> */}
								
								{/* <div class="form-group col-lg-12 col-md-12">
									<label>GDPR Agreement *</label>
									<ul class="no-ul-list">
										<li>
											<input id="aj-1" class="form-check-input" name="aj-1" type="checkbox"/>
											<label for="aj-1" class="form-check-label">I consent to having this website store my submitted information so they can respond to my inquiry.</label>
										</li>
									</ul>
								</div> */}
								
								{/* <div class="form-group col-lg-12 col-md-12">
									<button onClick={() => {
										if(goSteps < 5){

											setGoSteps(goSteps+1)
										}
										} }class="btn btn-primary fw-medium px-5" type="button">Submit & Preview</button>
								</div> */}
											
							</div>
						</div>
						
					</div>
				</div>
						
			</section>
			<Footer/>

    </>
  )
}

export default PostProperty
