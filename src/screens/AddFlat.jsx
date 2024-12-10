import React,{useEffect, useState} from 'react'
import { bhk_type_master, property_type_master } from '../api/auth';
import { Stepper } from 'react-form-stepper';
import Step1 from '../components/AddFlatComponents/Step1';
import Step2 from '../components/AddFlatComponents/Step2';
import Step3 from '../components/AddFlatComponents/Step3';
import Step4 from '../components/AddFlatComponents/Step4';
import Step5 from '../components/AddFlatComponents/Step5';
import Step6 from '../components/AddFlatComponents/Step6';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';


function AddFlat() {
    const {state} = useLocation()
    // console.log(state)
	const [goSteps, setGoSteps] = useState(0);
	const [currentStep, setCurrentStep] = useState(1);
	const [passData, setPassData] = useState({});

    useEffect(() => {
        setPassData(state)
    })
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
							

								{currentStep == 1 && <Step1 passData={passData} incrementStep={incrementStep} handleDataChange={handleDataChange} />}
								{currentStep == 2 && <Step2 passData={passData} incrementStep={incrementStep} prevStep={prevStep} handleDataChange={handleDataChange} />}
								{currentStep == 3 && <Step3 passData={passData} incrementStep={incrementStep} prevStep={prevStep} handleDataChange={handleDataChange} />}
								{currentStep == 4 && <Step4 passData={passData} incrementStep={incrementStep} prevStep={prevStep} handleDataChange={handleDataChange}/>}
								{currentStep == 5 && <Step5 passData={passData} incrementStep={incrementStep} prevStep={prevStep} handleDataChange={handleDataChange}/>}
								{currentStep == 6 && <Step6 passData={passData} incrementStep={incrementStep} prevStep={prevStep} handleDataChange={handleDataChange}/>}
								
								
							
							</div>
						</div>
						
					</div>
				</div>
						
			</section>
			{/* <!-- ============================ Submit Property End ================================== --> */}

            <Footer/>

    </>
  )
}

export default AddFlat
