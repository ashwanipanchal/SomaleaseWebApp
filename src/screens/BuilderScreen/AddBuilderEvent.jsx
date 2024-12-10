import React,{useEffect, useState} from 'react'
import { Stepper } from 'react-form-stepper';
import Step1 from '../../components/BuilderEventComponent/Step1';
import Step2 from '../../components/BuilderEventComponent/Step2';
import Step3 from '../../components/BuilderEventComponent/Step3';
import Step4 from '../../components/postPropertyComponents/Step4';
import Step5 from '../../components/postPropertyComponents/Step5';
import Step6 from '../../components/postPropertyComponents/Step6';
import Header from '../../components/Header';
import Footer from '../../components/Footer';


function AddBuilderEvent() {

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
			<section class="gray-simple">
				<div class="container">					
					<div class="row">
						
						{/* <!-- Submit Form --> */}
						<div class="col-lg-12 col-md-12">
						
						<Stepper
							steps={[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]}
							activeStep={currentStep-1}
							/>

							<div class="submit-page">
								{currentStep == 1 && <Step1 passData={passData} incrementStep={incrementStep} handleDataChange={handleDataChange} />}
								{currentStep == 2 && <Step2 passData={passData} incrementStep={incrementStep} handleDataChange={handleDataChange} />}
								{currentStep == 3 && <Step3 passData={passData} incrementStep={incrementStep} handleDataChange={handleDataChange} />}
											
							</div>
						</div>
						
					</div>
				</div>
						
			</section>
			<Footer/>

    </>
  )
}

export default AddBuilderEvent
